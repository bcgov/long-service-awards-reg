/*!
 * Self Registration: Profile Step View
 * File: Profile.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import ProfileInput from "@/components/fieldsets/ProfileInput.jsx";
import FormStep from "@/components/common/FormStep.jsx";
import formServices from "@/services/settings.services.js";
import RetroactiveMilestoneInput from "@/components/fieldsets/RetroactiveMilestoneInput";

/**
 * Recipient Profile form.
 * Basic Profile Page requests user info required to continue with application.
 */

export default function ServicePinsProfile() {

  // get form step schema / default values
  const previous = formServices.copy('delegated-service-pins', 'milestone');
  const current = formServices.copy('service-pins', 'profile');
  const next = formServices.copy('service-pins', 'contact');
  const steps =  formServices.get('service-pins');

  return <FormStep steps={steps} previous={previous} current={current} next={next}>
    <ProfileInput />
    <RetroactiveMilestoneInput />
  </FormStep>;
}
