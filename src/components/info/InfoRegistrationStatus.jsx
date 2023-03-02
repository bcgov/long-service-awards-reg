/*!
 * Info Panel: Registration Status
 * File: InfoRegistrationStatus.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import React from "react";
import {Button} from "primereact/button";
import {Panel} from "primereact/panel";

/**
 * Info Panel: PECSF Donations
  * @returns {JSX.Element}
 */

export default function InfoRegistrationStatus() {
  return <Panel header={<span style={{ color: "green" }}>Registration Submitted</span>}>
          <div className="confirmation-redirection-panel">
              <div>
                  You have already submitted your registration for this year.
                  Please review your application details here:
              </div>
              <div>
                  <Button onClick={() => { navigate("/register/confirmation") }}>
                      Confirmation Page
                  </Button>
              </div>
              <div>
                  If you believe you are seeing this message in error, please
                  contact support at <a href="mailto: LongServiceAwards@gov.bc.ca">
                  LongServiceAwards@gov.bc.ca
              </a>.
              </div>
          </div>
      </Panel>
}
