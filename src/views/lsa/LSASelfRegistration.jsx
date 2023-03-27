/*!
 * Self Registration View
 * File: Profile.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import { useContext, useEffect } from "react";
import { useNavigate, Outlet, redirect } from "react-router-dom";
import {LoadingContext, RegistrationContext, ToastContext} from "@/AppContext.js";
import PageHeader from "@/components/common/PageHeader.jsx";
import formServices from "@/services/settings.services.js";
import {createSelfRegistration, getSelfRegistration, saveSelfRegistration} from "@/services/api.routes.js";
import {BlockUI} from "primereact/blockui";
import {Button} from "primereact/button";

/**
 * Panel Header for common component management in registration flow
 */

export default function LSASelfRegistration() {
  const toast = useContext(ToastContext);
  const navigate = useNavigate();
  const {
    step, setCompleted, confirmed, setConfirmed, setRegistration, registration
  } = useContext(RegistrationContext);
  const {loading, setLoading} = useContext(LoadingContext);

  // get the registration steps template schema
  const steps = formServices.get("lsa");

  // set form status
  const _setStatus = (data) => {
    // set form status
    const { service } = data || {};
    const { confirmed, previous_registration } = service || {};
    // form confirmation status
    setConfirmed(confirmed);
    // form completion status: validate every step except confirmation
    // - filter out award step if previous registration was selected
    // - filter out confirmation step since it has a separate validation process
    setCompleted(steps
        .filter(step => !previous_registration || (previous_registration && step.key !== 'awards'))
        .filter(step => step.key !== 'confirmation')
        .every(step => step.validate(data))
    );
  }

  // create new registration
  const _handleCreateRegistration = async () => {
    try {
      setLoading(true);
      toast.current.show(formServices.lookup("messages", "create"));
      const [error, result] = await createSelfRegistration();
      toast.current.replace(formServices.lookup("messages", error || !result ? "createError" : "createSuccess"));
      if (!error && result) setRegistration(result);
      // navigate to initial registration step after creation
      redirect("/lsa/milestone");
      // }
    } catch (error) {
      toast.current.replace(formServices.lookup("messages", "saveError"));
    } finally {
      setLoading(false);
    }
  }

  // save registration data
  const _handleSaveRegistration = async (data) => {
    try {
      setLoading(true);
      const {service} = data || {};
      const {confirmed} = service || {};
      const [error, result] = await saveSelfRegistration(data);
      toast.current.replace(formServices.lookup("messages", error || !result ? "saveError" : "saveSuccess"));
      if (!error && result) {
        setRegistration(result);
        _setStatus(result)
        // show confirmation message if registration completed
        if (confirmed)
          toast.current.replace(formServices.lookup("messages", "confirmRegistration"));
      }
      return result;
    } catch (error) {
      toast.current.replace(formServices.lookup("messages", "saveError"));
    } finally {
      setLoading(false);
    }
  };

  // Initialize registration form
  useEffect(() => {
    // check for existing registration
    getSelfRegistration().then( async (data) => {
      // create new registration if none exists
      if (!data && !loading) await _handleCreateRegistration().catch(console.error)
    }).catch(err => {
      console.error(err)
      toast.current.replace(formServices.lookup("messages", "createError"));
    });
  }, []);

  // set registration status
  useEffect(() => {
    _setStatus(registration)
    if (confirmed) navigate("/lsa/confirmation");
    // if no step is provided, navigate to start of form
    if(!step) navigate("/lsa/milestone");
  }, [registration]);

  // overlay template for blocked form panels
  const BlockUITemplate = () => {
    return <div>
      <Button
          onClick={()=>{navigate("/lsa/confirmation")}}
          icon={'pi pi-lock'}
          label={'View Submitted Registration'}
      />
    </div>
  }

  return <>
          <PageHeader title="Award Registration" subtitle={step && step.description || ''}/>
          <BlockUI blocked={confirmed && step && step.key !== "confirmation"} template={BlockUITemplate}>
            <Outlet context={[_handleSaveRegistration]}/>
          </BlockUI>
        </>
}