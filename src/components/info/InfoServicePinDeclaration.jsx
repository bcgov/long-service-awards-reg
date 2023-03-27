/*!
 * Info Panel: Service Pin Declaration
 * File: InfoServicePinDeclaration.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import React from "react";

/**
 * Info Panel: Service Pin Declaration
  * @returns {JSX.Element}
 */

export default function InfoServicePinDeclaration({year}) {
  return <p>
      I declare, to the best of my knowledge and consistent with the service pin recognition eligibility
      guidelines (which I have reviewed) that as of December 31, {year}, I will have reached and/or
      surpassed a milestone year (5, 10, 15, 20, 25, 30, 35, 40, 45, 50 years) and am therefore eligible to
      receive a service pin. By providing my contact information, I am allowing the BC Public Service
      Agency to use this information for the planning and delivery of the corporate pin program. This
      personal information is collected in accordance with section 26(c) of the Freedom of Information
      and Protection of Privacy Act (FOIPPA). Questions about the collection or use of this information
      can be directed to, <a href="mailto:Corporate.Engagement@gov.bc.ca">Corporate.Engagement@gov.bc.ca</a>,
      1st floor- 563 Superior Street, Victoria BC, V8V 0C5 or by calling 1.877.277.0772
  </p>
}
