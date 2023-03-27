/*!
 * Self Registration: Award Selection Step View
 * File: Award.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import FormStep from "@/components/common/FormStep";
import formServices from "@/services/settings.services.js";
import AwardInput from "@/components/fieldsets/AwardInput.jsx";
import React, {useContext} from "react";
import {RegistrationContext} from "@/AppContext.js";
import InfoPreviousRegistrationStatus from "@/components/info/InfoPreviousRegistrationStatus.jsx";

/**
 * Award Selection Page.
 * Allows a user to select the award based on the available awards for their selected milestone.
 * Resets based on milestone selection.
 */

export default function LSAAward() {

    // get hooks and contexts
    const {registration} = useContext(RegistrationContext);
    const {service} = registration || {};
    const {previous_registration} = service || {};

    // get form step schema / default values
    const previous = formServices.copy('lsa', 'contact');
    const current = formServices.copy('lsa', 'awards');
    const next = formServices.copy('lsa', 'supervisor');
    const steps = formServices.get('lsa');

    return previous_registration
        ? <InfoPreviousRegistrationStatus />
        : <FormStep steps={steps} previous={previous} current={current} next={next}>
                <AwardInput />
            </FormStep>
}
