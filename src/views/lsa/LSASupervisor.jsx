/*!
 * Self Registration: Supervisor Information Step View
 * File: Contact.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import formServices from "@/services/settings.services.js";
import FormStep from "@/components/common/FormStep.jsx";
import SupervisorContactInput from "@/components/fieldsets/SupervisorContactInput.jsx";
import {useContext} from "react";
import {RegistrationContext} from "@/AppContext.js";

/**
 * Additional contact details for recipient registration.
 * @returns
 */

export default function LSASupervisor() {

  // get hooks and contexts
  const {registration} = useContext(RegistrationContext);
  const {service} = registration || {};
  const {previous_registration} = service || {};

  // get form step schema / default values
  const previous = previous_registration
      ? formServices.copy('lsa', 'contact')
      : formServices.copy('lsa', 'awards');
  const current = formServices.copy('lsa', 'supervisor');
  const next = formServices.copy('lsa', 'confirmation');
  const steps = formServices.get('lsa');

  return <FormStep steps={steps} previous={previous} current={current} next={next}>

    <p>Your supervisor's contact information will assist us in preparing and
      shipping your award and service pin.</p>
    <p><b>Please note that for Victoria offices, a P.O. box number is required.</b></p>

    <SupervisorContactInput />

  </FormStep>;

}