/*!
 * Info Panel: How to Calculate Your Years of Service (React)
 * File: CalculatorSelector.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import AppPanel from "@/components/common/AppPanel.jsx";
import React from "react";

/**
 * Info Panel: Supervisor Eligibility
  * @returns {JSX.Element}
 */

export default function InfoCalculateService() {
  return <AppPanel header="How to Calculate Your Years of Service" toggleable collapsed={true}>
      <div className="information-only-panel">
          <p>
              When calculating your eligibility, count the calendar years
              you’ve been in service, don’t worry about the exact months and
              days. If you have worked any portion of a calendar year, it
              counts as one full year of long service recognition time.
          </p>
          <p>
              This tool will help you check your total years of service. You
              can use this calculator to enter your work history and apply
              for your recognition awards in one easy process.
          </p>
      </div>
  </AppPanel>
}
