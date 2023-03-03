/*!
 * Info Panel: Eligibility (React)
 * File: InfoEligibility.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import React from "react";
import {Panel} from "primereact/panel";

/**
 * Info Panel: Eligibility
  * @returns {JSX.Element}
 */

export default function InfoEligibility() {
  return <Panel header="Eligibility" toggleable collapsed={true}>
      <div className="information-only-panel">
          <h4>Long Service Awards</h4>
          <p>
              You can register for the Long Service Awards if you’ve worked
              for 25+ years in a BC Public Service organization under the BC
              Public Service Act.
          </p>
          <p>
              Attend a Long Service Awards ceremony every five years after
              you’ve reached 25 years of service. If you have fewer than 25
              years of service, you may be eligible for a Service Pin.
          </p>
          <h4>Service Pins</h4>
          <p>
              You can register for a Service Pin if you’ve worked for 5+
              years in a BC Public Service organization under the BC Public
              Service Act.
          </p>
          <p>
              Register for another Service Pin every five years after you've
              reached 5 years of service.
          </p>
          <h4>Long Service Recognition</h4>
          <p>
              Long service recognition time is calculated differently than
              seniority and pensionable time. Long service time is your
              total, cumulative years working at an eligible BC Public
              Service organization.
          </p>
          <p>
              Time spent working as a contractor does not count towards
              years of service because contractors are not hired under the
              BC Public Service Act.
          </p>
          <p>
              If you’ve had a break in service, that time may still count
              toward your years of service. Breaks in service include
              periods of paid leave and part-time, auxiliary, or seasonal
              work. Unpaid leaves of absence do not count.
          </p>
      </div>
  </Panel>
}
