/*!
 * Service Pin Self Registration: Confirmation Step View
 * File: Confirmation.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import FormStep from "@/components/common/FormStep.jsx";
import formServices from "@/services/settings.services.js";
import React, {useContext} from "react";
import {LoadingContext, RegistrationContext} from "@/AppContext";
import ConfirmationInput from "@/components/fieldsets/ConfirmationInput.jsx";
import {BlockUI} from "primereact/blockui";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";
import MilestoneData from "@/components/data/MilestoneData.jsx";
import {Panel} from "primereact/panel";
import FormData from "@/components/data/FormData.jsx";
import ProfileData from "@/components/data/ProfileData.jsx";
import ContactData from "@/components/data/ContactData.jsx";
import SupervisorData from "@/components/data/SupervisorData.jsx";
import InfoServicePinDeclaration from "@/components/info/InfoServicePinDeclaration";

/**
 * Recipient Profile form.
 * Basic Profile Page requests user info required to continue with application.
 */

export default function ServicePinsConfirmation() {

  const { loading } = useContext(LoadingContext);
  const { completed } = useContext(RegistrationContext);
  const navigate = useNavigate();
  const { registration } = useContext(RegistrationContext);
  const {service} = registration || {};
  const { cycle } = service || {};

  // get form step schema / default values
  const previous = formServices.copy('registration_steps', 'supervisor');
  const current = formServices.copy('registration_steps', 'confirmation');

  // block confirmation fieldset if form is incomplete
  return <FormStep previous={previous} current={current}>
    {
      completed && <Panel className={'mb-3'} header={'Confirm Registration Details'}>
        <FormData id={'milestone'}><MilestoneData/></FormData>
        <FormData id={'profile'}><ProfileData/></FormData>
        <FormData id={'contact'}><ContactData/></FormData>
        <FormData id={'supervisor'}><SupervisorData/></FormData>
      </Panel>
    }
    <BlockUI blocked={!completed && !loading} template={
      <Button
          onClick={()=>{navigate('/register/milestone')}}
          label={'Click to Complete Your Registration'}
      />}>
      <ConfirmationInput>
        <InfoServicePinDeclaration year={cycle} />
      </ConfirmationInput>
    </BlockUI>
  </FormStep>;
}
