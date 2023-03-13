/*!
 * Info Panel: Supervisor Registrations: Instructions (React)
 * File: InfoSupervisorRegistrations.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import {Panel} from "primereact/panel";

/**
 * Info Panel: Eligibility
  * @returns {JSX.Element}
 */

export default function InfoSupervisorRegistrations() {
  return <Panel className={'mb-3'} header="Supervisor Registrations: Instructions" toggleable collapsed={true}>
      <div className="information-only-panel">
          <h4>Supervisors and Other Delegates:</h4>
          <p>Enter supervisor information in the contact field below.</p>
          <p>
              Add employees under this supervisor that you wish to calculate
              and submit registration requests for. Only submit employees that
              report to the supervisor submitted. Please start a new
              registration if you have employees that work under different
              supervisors.
          </p>
          <h4>Calculating Service and Registering Employees:</h4>
          <p>
              A calculator for eligibility is provided for each employee you
              add. Alternatively, if you already know an employees total years
              of service, please enter this in the final Total Years field for
              the employee.
          </p>
          <p>
              Employees entered in this form will be instantly registered for
              eligible Service Pins. Additionally, if an employee has 25+
              years of service, they will be sent a link to complete their
              registration for the Long Service Awards Event and Award
              Selection.
          </p>
      </div>
  </Panel>
}
