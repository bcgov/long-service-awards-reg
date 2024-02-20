/*!
 * Self Registration: Confirmation Step View
 * File: Confirmation.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import FormStep from "@/components/common/FormStep";
import formServices from "@/services/settings.services.js";
import React, { useContext } from "react";
import { LoadingContext, RegistrationContext } from "@/AppContext.js";
import ConfirmationInput from "@/components/fieldsets/ConfirmationInput";
import { BlockUI } from "primereact/blockui";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import MilestoneData from "@/views/lsa/data/MilestoneData";
import { Panel } from "primereact/panel";
import FormData from "@/components/common/FormData.jsx";
import ProfileData from "@/views/lsa/data/ProfileData.jsx";
import ContactData from "@/views/lsa/data/ContactData";
import AwardData from "@/views/lsa/data/AwardData.jsx";
import SupervisorData from "@/views/lsa/data/SupervisorData";
import InfoLSADeclaration from "@/components/info/InfoLSADeclaration.jsx";

/**
 * Recipient Profile form.
 * Basic Profile Page requests user info required to continue with application.
 */

export default function LSAConfirmation() {
  const { loading } = useContext(LoadingContext);
  const { completed } = useContext(RegistrationContext);
  const navigate = useNavigate();
  const { registration } = useContext(RegistrationContext);
  const { service } = registration || {};
  const { previous_registration, cycle } = service || {};

  // get form step schema / default values
  const previous = formServices.copy("lsa", "supervisor");
  const current = formServices.copy("lsa", "confirmation");
  const steps = formServices.get("lsa");

  // block confirmation fieldset if form is incomplete
  return (
    <FormStep steps={steps} previous={previous} current={current}>
      {completed && (
        <Panel className={"mb-3"} header={"Confirm Registration Details"}>
          <FormData form={"lsa"} id={"milestone"}>
            <MilestoneData />
          </FormData>
          <FormData form={"lsa"} id={"profile"}>
            <ProfileData />
          </FormData>
          <FormData form={"lsa"} id={"contact"}>
            <ContactData />
          </FormData>
          {previous_registration ? (
            <Panel className={"mb-3"} header={"Award"}>
              Award Previously Selected
            </Panel>
          ) : (
            <FormData form={"lsa"} id={"awards"}>
              <AwardData />
            </FormData>
          )}
          <FormData form={"lsa"} id={"supervisor"}>
            <SupervisorData />
          </FormData>
        </Panel>
      )}
      <BlockUI
        blocked={!completed && !loading}
        template={
          <Button
            onClick={() => {
              navigate("/lsa/milestone");
            }}
            label={"Click to Complete Your Registration"}
          />
        }
      >
        <ConfirmationInput>
          <InfoLSADeclaration year={cycle} />
        </ConfirmationInput>
      </BlockUI>
    </FormStep>
  );
}
