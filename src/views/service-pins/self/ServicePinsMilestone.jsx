/*!
 * Self Registration: Milestone Selection View
 * File: Milestone.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import MilestoneInput from "@/components/fieldsets/MilestoneInput.jsx";
import InfoMilestone from "@/components/info/InfoMilestone.jsx";
import formServices from "@/services/settings.services.js";
import FormStep from "@/components/common/FormStep.jsx";


/**
 * Milestone Selection.
 * Allows user to use built in calculator to determine years of service and potential milestones.
 */

export default function ServicePinsMilestone() {

    // get form step schema / default values
    const current = formServices.copy('service-pins', 'milestone');
    const next = formServices.copy('service-pins', 'profile');
    const steps =  formServices.get('service-pins');

    return <FormStep steps={steps} current={current} next={next}>
        <InfoMilestone />
        <MilestoneInput type={'service-pins'} />
    </FormStep>;
}
