/*!
 * Info Panel: PECSF Donations
 * File: InfoPecsf.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import AppPanel from "@/components/common/AppPanel.jsx";
import React from "react";

/**
 * Info Panel: PECSF Donations
  * @returns {JSX.Element}
 */

export default function InfoPecsf() {
  return <AppPanel header="About PECSF Donations" toggleable collapsed={true}>
      <div className="information-only-panel">
          <p>In lieu of receiving a Long Service Award, you may opt to make a charitable donation via
              Provincial Employees Community Services Fund (PECSF). <span className="font-weight-bold">
              Please Note: charitable tax receipts are not issued for LSA donations.</span></p>

          <p>You may choose one of two donation options:</p>
          <ol>
              <li>to donate to the <span className="font-weight-bold">PECSF Regional Pool Fund</span>
                  Supported pool of charities in your region, OR,
              </li>
              <li>to donate to a registered charitable organization (maximum of two) of your choice.</li>
          </ol>
      </div>
  </AppPanel>
}
