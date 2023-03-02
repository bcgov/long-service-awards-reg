import React, { useState } from "react";
import { useNavigate } from "react-router";
import AppButton from "../common/AppButton.jsx";
import AppPanel from "../common/AppPanel.jsx";
import PageHeader from "../common/PageHeader.jsx";
import ServiceCalculator from "./ServiceCalculator.jsx";

/**
 * Inline CalculatorSelector View. Allows individuals to calculate eligibility inline with registration.
 * Carries forward eligibility calculation into application if they choose to apply.
 */

export default function CalculatorInline({submit}) {
  const [eligibility, setEligibility] = useState(false);
  const [years, setYears] = useState("");

  const navigate = useNavigate();
  const startRegistration = () => {
    navigate("/register/profile", { state: { years } });
  };

  const isEligible = (totalYears) => {
    if (totalYears >= 5) {
      setEligibility(true);
      setYears(totalYears);
    } else { setEligibility(false); }
  };

  return (
    <>
      <AppPanel fullwidth header={<PageHeader title="Years of Service" singleLine gradient3 />}>
        <ServiceCalculator formSubmit={isEligible} />
      </AppPanel>

      {eligibility ? (
        <AppPanel
          fullwidth
          header={
            <PageHeader
              title="Congratulations"
              singleLine
              gradient3
            ></PageHeader>
          }
        >
          Based on the input in the calculator above, you may be eligible for
          registration for recognition under the Service Pin program. You can
          continue registration by clicking on “Register” below.{" "}
          <AppButton onClick={startRegistration}>Register</AppButton>
        </AppPanel>
      ) : null}
    </>
  );
}
