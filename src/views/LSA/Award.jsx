/*!
 * Self Registration: Award Selection Step View
 * File: Award.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import FormStep from "@/components/common/FormStep";
import formServices from "@/services/settings.services.js";
import AwardInput from "@/components/fieldsets/AwardInput.jsx";

/**
 * Award Selection Page.
 * Allows a user to select the award based on the available awards for their selected milestone.
 * Resets based on milestone selection.
 */

export default function Award() {

    // get form step schema / default values
    const previous = formServices.copy('registration_steps', 'contact');
    const current = formServices.copy('registration_steps', 'awards');
    const next = formServices.copy('registration_steps', 'supervisor');

    return <FormStep previous={previous} current={current} next={next}>
        <AwardInput />
    </FormStep>;
}
