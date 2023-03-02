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
  const {step, setCompleted, confirmed, setConfirmed, registration, setRegistration} = useContext(RegistrationContext);
  const {setLoading} = useContext(LoadingContext);

  // get the registration steps template schema
  const steps = formServices.get("registration_steps");

  // check if registration is completed / confirmed
  useEffect(()=>{
    const { service } = registration || {};
    const { confirmed } = service || {};
    console.log(registration)
    setConfirmed(confirmed);
    setCompleted(steps
        .filter(step => step.key !== 'confirmation')
        .every(step => step.validate(registration))
    );
  }, [registration]);

  // create new registration
  const _handleCreateRegistration = async () => {
    try {
      setLoading(true);
      toast.current.show(formServices.lookup("messages", "create"));
      const [error, result] = await createSelfRegistration();
      toast.current.replace(formServices.lookup("messages", error || !result ? "createError" : "createSuccess"));
      if (!error && result) {
        setRegistration(result);
        // navigate to initial registration step
        navigate("/register/milestone");
      }
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
      const [error, result] = await saveSelfRegistration(data);
      toast.current.replace(formServices.lookup("messages", error || !result ? "saveError" : "saveSuccess"));
      if (!error && result) setRegistration(result);
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
    getSelfRegistration().then(data => {
      // create new registration if none exists
      if (!data) _handleCreateRegistration().catch(console.error);
      // check if registration is completed
      setCompleted(steps.every(step => step.validate(registration)));
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
      <Button onClick={()=>{navigate("/register/confirmation")}} icon={'pi pi-lock'} label={'Go To Confirmation Step'}/>
    </div>
  }

  return <>
    <PageHeader title="Award Registration" subtitle={step && step.description || ''}/>
    <FormProgress />
    {
        confirmed && step && step.key !== "confirmation" && <InfoRegistrationStatus/>
    }
    <BlockUI blocked={confirmed} template={BlockUITemplate}>
      <Outlet context={[_handleSaveRegistration]}/>
    </BlockUI>
  </>
}