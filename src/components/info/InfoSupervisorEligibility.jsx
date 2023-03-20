/*!
 * Info Panel: Supervisor Eligibility (React)
 * File: CalculatorSelector.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import {Panel} from "primereact/panel";

/**
 * Info Panel: Supervisor Eligibility
  * @returns {JSX.Element}
 */

export default function InfoSupervisorEligibility() {
  return <Panel className={'mb-3'} header="Supervisors: Employee Eligibility and Registration" toggleable collapsed={true}>
      <div className="information-only-panel">
          <p>
              Supervisors may use this tool to calculate their employee’s
              eligibility for awards.
          </p>
          <p>
              This tool will allow you to enter your employees’ information
              and register them for their recognition awards.
          </p>
          <p>
              Employees will be registered for Service Pins automatically, and
              if eligible for a Long Service Award will be sent a link to
              complete their registration for the Long Service Awards Event
              and Award Selection.
          </p>
      </div>
  </Panel>
}
