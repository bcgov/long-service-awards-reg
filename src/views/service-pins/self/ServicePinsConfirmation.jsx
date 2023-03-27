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
import {Panel} from "primereact/panel";
import FormData from "@/components/common/FormData.jsx";
import MilestoneData from "@/views/service-pins/data/MilestoneData.jsx";
import ProfileData from "@/views/service-pins/data/ProfileData.jsx";
import ContactData from "@/views/service-pins/data/ContactData.jsx";
import SupervisorData from "@/views/service-pins/data/SupervisorData.jsx";
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
  const previous = formServices.copy('service-pins', 'supervisor');
  const current = formServices.copy('service-pins', 'confirmation');
  const steps =  formServices.get('service-pins');

  // block confirmation fieldset if form is incomplete
  return <FormStep steps={steps} previous={previous} current={current}>
    {
      completed && <Panel className={'mb-3'} header={'Confirm Registration Details'}>
        <FormData form={'service-pins'} id={'milestone'}><MilestoneData/></FormData>
        <FormData form={'service-pins'} id={'profile'}><ProfileData/></FormData>
        <FormData form={'service-pins'} id={'contact'}><ContactData/></FormData>
        <FormData form={'service-pins'} id={'supervisor'}><SupervisorData/></FormData>
      </Panel>
    }
    <BlockUI blocked={!completed && !loading} template={
      <Button
          onClick={()=>{navigate('/lsa/milestone')}}
          label={'Click to Complete Your Registration'}
      />}>
      <ConfirmationInput>
        <InfoServicePinDeclaration year={cycle} />
      </ConfirmationInput>
    </BlockUI>
  </FormStep>;
}
