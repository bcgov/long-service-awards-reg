/*!
 * Self Registration: Contact Details Step View
 * File: Contact.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import AddressInput from "../../components/fieldsets/AddressInput";
import formServices from "@/services/settings.services.js";
import PersonalContactInput from "@/components/fieldsets/PersonalContactInput";
import FormStep from "@/components/common/FormStep.jsx";

/**
 * Additional contact details for recipient registration.
 * @returns
 */

export default function Contact() {

    // get form step schema / default values
    const previous = formServices.copy('registration_steps', 'profile');
    const current = formServices.copy('registration_steps', 'contact');
    const next = formServices.copy('registration_steps', 'awards');

    return <FormStep previous={previous} current={current} next={next}>
        <PersonalContactInput />
        <AddressInput id={'contact.personal_address'} label={'Personal'} />
        <AddressInput id={'contact.office_address'} label={'Office'} />
    </FormStep>;

}
