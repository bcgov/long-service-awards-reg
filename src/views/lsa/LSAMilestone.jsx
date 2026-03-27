/*!
 * Self Registration: Milestone Selection View
 * File: Milestone.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import { useFormContext, useWatch } from "react-hook-form";
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

function LSAMilestoneContent() {
  const { control } = useFormContext();
  const milestone = useWatch({
    control,
    name: "service.milestone",
    defaultValue: 0,
  });
  const showFollowUp = Number(milestone) >= 25;

  return (
    <>
      <InfoMilestone />
      <MilestoneInput type={"lsa"} threshold={25} />
      {showFollowUp && (
        <>
          <RegistrationOptionsInput />
          <BCGEUInput />
          <RetirementInput />
        </>
      )}
    </>
  );
}

export default function LSAMilestone() {
  // get form step schema / default values
  const current = formServices.copy("lsa", "milestone");
  const next = formServices.copy("lsa", "profile");
  const steps = formServices.get("lsa");

  return (
    <FormStep steps={steps} current={current} next={next}>
      <LSAMilestoneContent />
    </FormStep>
  );
}
