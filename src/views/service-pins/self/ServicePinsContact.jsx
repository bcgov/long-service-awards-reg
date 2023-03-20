/*!
 * Service Pin Self Registration: Contact Details Step View
 * File: Contact.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import formServices from "@/services/settings.services.js";
import PersonalContactInput from "@/components/fieldsets/PersonalContactInput.jsx";
import FormStep from "@/components/common/FormStep.jsx";
import OfficeContactInput from "@/components/fieldsets/OfficeContactInput.jsx";

/**
 * Additional contact details for recipient registration.
 * @returns
 */

export default function ServicePinsContact() {

    // get form step schema / default values
    const previous = formServices.copy('registration_steps', 'profile');
    const current = formServices.copy('registration_steps', 'contact');
    const next = formServices.copy('registration_steps', 'supervisor');

    return <FormStep previous={previous} current={current} next={next}>
        <PersonalContactInput />
        <OfficeContactInput />
    </FormStep>;

}
