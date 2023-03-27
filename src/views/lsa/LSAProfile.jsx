/*!
 * Self Registration: Profile Step View
 * File: Profile.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import ProfileInput from "@/components/fieldsets/ProfileInput.jsx";
import FormStep from "@/components/common/FormStep";
import formServices from "@/services/settings.services.js";

/**
 * Recipient Profile form.
 * Basic Profile Page requests user info required to continue with application.
 */

export default function LSAProfile() {

  // get form step schema / default values
  const previous = formServices.copy('lsa', 'milestone');
  const current = formServices.copy('lsa', 'profile');
  const next = formServices.copy('lsa', 'contact');
  const steps = formServices.get('lsa');

  return <FormStep steps={steps} previous={previous} current={current} next={next}>
    <ProfileInput />
  </FormStep>;
}
