/*!
 * Self Registration: Contact Details Step View
 * File: Contact.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import formServices from "@/services/settings.services.js";
import PersonalContactInput from "@/components/fieldsets/PersonalContactInput";
import FormStep from "@/components/common/FormStep.jsx";
import {useContext} from "react";
import {RegistrationContext} from "@/AppContext.js";
import OfficeContactInput from "@/components/fieldsets/OfficeContactInput.jsx";

/**
 * Additional contact details for recipient registration.
 * @returns
 */

export default function LSAContact() {

    // get hooks and contexts
    const {registration} = useContext(RegistrationContext);
    const {service} = registration || {};
    const {previous_registration} = service || {};

    // get form step schema / default values
    const previous = formServices.copy('lsa', 'profile');
    const current = formServices.copy('lsa', 'contact');
    const next = previous_registration
        ? formServices.copy('lsa', 'supervisor')
        : formServices.copy('lsa', 'awards');
    const steps = formServices.get('lsa');

    return <FormStep steps={steps} previous={previous} current={current} next={next}>
        <PersonalContactInput />
        <OfficeContactInput />
    </FormStep>;

}
