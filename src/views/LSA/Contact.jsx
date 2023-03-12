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
import {useContext} from "react";
import {RegistrationContext} from "@/AppContext.js";
import OfficeContactInput from "@/components/fieldsets/OfficeContactInput.jsx";

/**
 * Additional contact details for recipient registration.
 * @returns
 */

export default function Contact() {

    // get hooks and contexts
    const {registration} = useContext(RegistrationContext);
    const {service} = registration || {};
    const {previous_registration} = service || {};

    // get form step schema / default values
    const previous = formServices.copy('registration_steps', 'profile');
    const current = formServices.copy('registration_steps', 'contact');
    const next = previous_registration
        ? formServices.copy('registration_steps', 'supervisor')
        : formServices.copy('registration_steps', 'awards');

    return <FormStep previous={previous} current={current} next={next}>
        <PersonalContactInput />
        <AddressInput id={'contact.personal_address'} label={'Personal'} />
        <OfficeContactInput />
        <AddressInput id={'contact.office_address'} label={'Office'} pobox={true} />
    </FormStep>;

}
