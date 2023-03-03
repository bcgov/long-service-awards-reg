/*!
 * Self Registration View
 * File: Profile.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import { useContext, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import {LoadingContext, RegistrationContext, ToastContext} from "@/AppContext.js";
import PageHeader from "@/components/common/PageHeader.jsx";
import FormProgress from "@/components/common/FormProgress.jsx";
import formServices from "@/services/settings.services.js";
import {createSelfRegistration, getSelfRegistration, saveSelfRegistration} from "@/services/api.routes.js";
import InfoRegistrationStatus from "@/components/info/InfoRegistrationStatus.jsx";
import {BlockUI} from "primereact/blockui";
import {Button} from "primereact/button";

/**
 * Panel Header for common component management in registration flow
 */

export default function SelfRegistration() {
  const toast = useContext(ToastContext);
  const navigate = useNavigate();
  const {
    step, setCompleted, confirmed, setConfirmed, registration, setRegistration
  } = useContext(RegistrationContext);
  const {loading, setLoading} = useContext(LoadingContext);

  // get the registration steps template schema
  const steps = formServices.get("registration_steps");

  // set form status
  const _setStatus = (data) => {
    // set form status
    const { service } = data || {};
    const { confirmed } = service || {};
    // form confirmation status
    setConfirmed(confirmed);
    // form completion status: validate every step except confirmation
    setCompleted(steps
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
      _setStatus(result)
      // navigate to initial registration step
      // navigate("/register/milestone");
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
    getSelfRegistration().then((data) => {
      // create new registration if none exists
      if (!data && !loading) _handleCreateRegistration().catch(console.error)
    }).catch(err => {
      console.error(err)
      toast.current.replace(formServices.lookup("messages", "createError"));
    })
  }, []);

  //redirects to confirmation page if registration is confirmed
  useEffect(() => {
    if (confirmed) navigate("/register/confirmation");
  }, []);

  // overlay template for blocked form panels
  const BlockUITemplate = () => {
    return <div>
      <Button
          onClick={()=>{navigate("/register/confirmation")}}
          icon={'pi pi-lock'}
          label={'View Submitted Registration'}/>
    </div>
  }

  return <>
    <PageHeader title="Award Registration" subtitle={step && step.description || ''}/>
    <FormProgress />
    {
        confirmed && step && step.key !== "confirmation" && <InfoRegistrationStatus/>
    }
    <BlockUI blocked={confirmed && step && step.key !== "confirmation"} template={BlockUITemplate}>
      <Outlet context={[_handleSaveRegistration]}/>
    </BlockUI>
  </>
}