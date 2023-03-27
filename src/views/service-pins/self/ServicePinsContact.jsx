/*!
 * Service Pin Self Registration: Contact Details Step View
 * File: Contact.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import formServices from "@/services/settings.services.js";
import FormStep from "@/components/common/FormStep.jsx";
import OfficeContactInput from "@/components/fieldsets/OfficeContactInput.jsx";

/**
 * Additional contact details for recipient registration.
 * @returns
 */

export default function ServicePinsContact() {

    // get form step schema / default values
    const previous = formServices.copy('service-pins', 'profile');
    const current = formServices.copy('service-pins', 'contact');
    const next = formServices.copy('service-pins', 'supervisor');
    const steps =  formServices.get('service-pins');

    return <FormStep steps={steps} previous={previous} current={current} next={next}>
        <OfficeContactInput />
    </FormStep>;

}
