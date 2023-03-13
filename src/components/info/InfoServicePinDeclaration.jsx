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
      I declare, to the best of my knowledge and consistent with the Service Pin eligibility
      guidelines (which I have reviewed) that as of December 31, {year}, I will have worked for the BC
      Public Service for 5, 10, 15, 20, 25, 35, 40, 45 or 50 years and I am therefore eligible for a Long
      Service Award. By providing my personal information, I am allowing the BC Public Service
      Agency to use and disclose this information for the planning and delivery of the Long Service
      Award recognition events. This personal information is required to process your application
      for the Long Service Awards and is collected in accordance with section 26(c) of the Freedom
      of Information and Protection of Privacy Act (FOIPPA). Questions about the collection or use
      of this information can be directed to Program Manager,
      <a href="mailto:LongServiceAwards@gov.bc.ca">LongServiceAwards@gov.bc.ca</a>, 1st floor -
      563 Superior Street, Victoria BC, V8V 0C5, or by calling 1.877.277.0772.
  </p>
}
