/*!
 * Service CalculatorSelector: Self Registration (React)
 * File: ServiceCalculatorHelp.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import { useContext, useRef } from "react";
import { useNavigate } from "react-router";
import AppButton from "@/components/common/AppButton.jsx";
import AppPanel from "@/components/common/AppPanel.jsx";
import PageHeader from "@/components/common/PageHeader.jsx";
import ServiceCalculator from "@/components/calculator/ServiceCalculator.jsx";
import "@/styles/CalculatorPersonal.css";
import {CalculatorContext} from "@/AppContext.js";
import InfoEligibility from "@/components/info/InfoEligibility.jsx";
import InfoCalculateService from "@/components/info/InfoCalculateService.jsx";

/**
 * Self CalculatorSelector Page. Allows individuals to calculate eligibility.
 * Carries forward eligibility calculation into application if they choose to apply.
 */

export default function CalculatorSelf() {

  // service data context
  const { eligible } = useContext(CalculatorContext);
  const threshold = 5;
  const messageRef = useRef(null);

  const navigate = useNavigate();
  const startRegistration = () => { navigate("/register/profile") };

  const isEligible = () => {
      if (eligible) {
          messageRef.current.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
              inline: "start"
          });
      }
  };

  return (
    <>
      <InfoEligibility />
      <InfoCalculateService />
      <AppPanel fullwidth header={<PageHeader title="Years of Service" singleLine gradient3 />}>
        <ServiceCalculator formSubmit={isEligible} threshold={threshold} />
      </AppPanel>
        <div ref={messageRef}>
            {
                eligible &&
                  <AppPanel fullwidth header={<PageHeader title="Congratulations" singleLine gradient3 />}>
                  Based on the input in the calculator above, you may be eligible for
                  registration for recognition under the Service Pin program. You can
                  continue registration by clicking on “Register” below.{" "}
                  <AppButton onClick={startRegistration}>Register</AppButton>
                </AppPanel>
            }
        </div>
    </>
  );
}
