/*!
 * Info Panel: Milestone (React)
 * File: InfoMilestone.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import {Panel} from "primereact/panel";

/**
 * Info Panel: Milestone
  * @returns {JSX.Element}
 */

export default function InfoMilestone() {
  return <Panel className={'mb-3'} header="Milestone Information" collapsed toggleable>
      <div className="information-only-panel">
          <p>
              Eligibility for service recognition programs is calculated
              differently than pensionable time.
          </p>
          <ul>
              <li>
                  Calculate your years of service by counting the calendar
                  years you’ve been working for an eligible organization,
                  including the year you started and the current year.{" "}
              </li>
              <li>
                  Time worked as a seasonal, co-op, part-time or auxiliary
                  employee counts.
              </li>
              <li>
                  Your service time is calculated based on cumulative service
                  time, rather than continuous.{" "}
              </li>
              <li>
                  That means any time worked prior to a break in service
                  counts towards your service time. Periods of leave with pay
                  (STIIP, maternity/parental leave, educational leave,
                  deferred salary leave, LTD up to a maximum of two years)
                  count towards years of service, but unpaid leave does not.
              </li>
          </ul>
          <p>
              Contact Careers & MyHR if you need to confirm your individual
              service dates.
          </p>
      </div>
  </Panel>
}
