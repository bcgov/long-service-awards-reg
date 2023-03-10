/*!
 * Self Registration: Confirmation Step View
 * File: Confirmation.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import FormStep from "@/components/common/FormStep";
import formServices from "@/services/settings.services.js";
import React, {useContext} from "react";
import {LoadingContext, RegistrationContext} from "@/AppContext.js";
import ConfirmationInput from "@/components/fieldsets/ConfirmationInput";
import {BlockUI} from "primereact/blockui";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";
import {Message} from "primereact/message";
import MilestoneData from "@/components/display/MilestoneData";
import {Panel} from "primereact/panel";
import FormData from "@/components/display/FormData.jsx";
import ProfileData from "@/components/display/ProfileData.jsx";
import ContactData from "@/components/display/ContactData";
import AwardData from "@/components/display/AwardData.jsx";
import SupervisorData from "@/components/display/SupervisorData";

/**
 * Recipient Profile form.
 * Basic Profile Page requests user info required to continue with application.
 */

export default function Confirmation() {

  const { loading } = useContext(LoadingContext);
  const { completed } = useContext(RegistrationContext);
  const navigate = useNavigate();

  // get form step schema / default values
  const previous = formServices.copy('registration_steps', 'supervisor');
  const current = formServices.copy('registration_steps', 'confirmation');

  // block confirmation fieldset if form is incomplete
  return <FormStep previous={previous} current={current}>
    <Panel className={'mb-3'} header={'Confirm Registration Details'}>
      <FormData id={'milestone'}><MilestoneData /></FormData>
      <FormData id={'profile'}><ProfileData /></FormData>
      <FormData id={'contact'}><ContactData /></FormData>
      <FormData id={'awards'}><AwardData /></FormData>
      <FormData id={'supervisor'}><SupervisorData /></FormData>
    </Panel>
    {
        !completed && <Message className={'mb-3 w-full'} severity="warn" text="Registration is incomplete"/>
    }
    <BlockUI blocked={!completed && !loading} template={
      <Button
          onClick={()=>{navigate('/register/milestone')}}
          label={'Click to Complete Your Registration'}
      />}>
      <ConfirmationInput />
    </BlockUI>
  </FormStep>;
}
