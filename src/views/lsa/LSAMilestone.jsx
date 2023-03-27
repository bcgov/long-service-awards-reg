/*!
 * Self Registration: Milestone Selection View
 * File: Milestone.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import MilestoneInput from "@/components/fieldsets/MilestoneInput.jsx";
import InfoMilestone from "@/components/info/InfoMilestone";
import RetirementInput from "@/components/fieldsets/RetirementInput";
import BCGEUInput from "@/components/fieldsets/BCGEUInput";
import formServices from "@/services/settings.services.js";
import FormStep from "@/components/common/FormStep.jsx";
import RegistrationOptionsInput from "@/components/fieldsets/RegistrationOptionsInput.jsx";

/**
 * Milestone Selection.
 * Allows user to use built in calculator to determine years of service and potential milestones.
 */

export default function LSAMilestone() {

    // get form step schema / default values
    const current = formServices.copy('lsa', 'milestone');
    const next = formServices.copy('lsa', 'profile');
    const steps = formServices.get('lsa');

    return <FormStep steps={steps} current={current} next={next}>
        <InfoMilestone />
        <MilestoneInput type={'lsa'} />
        <RegistrationOptionsInput />
        <BCGEUInput />
        <RetirementInput />
    </FormStep>;
}
