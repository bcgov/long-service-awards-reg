/*!
 * Info: Regional Fund Supported Pool - PECSF Donations
 * Cariboo Region
 * File: Cariboo.jsx
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import React from "react";
import "./RegionalPools.css";

/**
 * Info: Regional Fund Supported Pool - PECSF Donations
 * Capital Region
 *  * entire component innherHTML imported from Modals @ https://pecsf.gov.bc.ca/donate-now/create
 * @returns {JSX.Element}
 */

export default function Cariboo() {
  return (
    <>
      <div className="container">
        <ul className="list-group list-group-flush  ">
          <li className="list-group-item">
            <div className="row">
              <div className="col-11">
                <div className="row text-primary">
                  <div className="col-10 h5">
                    <b>Medical Travel Program</b>
                  </div>
                </div>
                <div className="row text-dark">
                  <div className="col">
                    Hope Air provides free commercial or private flights and
                    accommodation for patients in financial need who must access
                    medical care far from home, and their parents or guardians,
                    if applicable. This includes private flights with pilots who
                    volunteer their time and aircraft to fly patients in the
                    Cariboo to appointments.
                  </div>
                </div>

                <div className="row justify-content-between pt-2 text-secondary">
                  <div className="col-12">
                    <b>Charity:</b> HOPE AIR
                  </div>
                </div>

                <div className="row justify-content-between pt-2 text-secondary">
                  <div className="col-sm">119042299RR0001</div>
                  <div className="col-3">Allocation: 50.00%</div>
                </div>
              </div>
            </div>
          </li>

          <li className="list-group-item">
            <div className="row">
              <div className="col-11">
                <div className="row text-primary">
                  <div className="col-10 h5">
                    <b>Financial Literacy for Cariboo Youth</b>
                  </div>
                </div>
                <div className="row text-dark">
                  <div className="col">
                    Through partnerships with educators and volunteers from
                    local businesses, JABC offers interactive, hands-on learning
                    experiences in financial literacy, entrepreneurship, and
                    work readiness to students in Grades 4 to 12 in communities
                    across the Cariboo region.
                  </div>
                </div>

                <div className="row justify-content-between pt-2 text-secondary">
                  <div className="col-12">
                    <b>Charity:</b> JUNIOR ACHIEVEMENT OF BRITISH COLUMBIA
                  </div>
                </div>

                <div className="row justify-content-between pt-2 text-secondary">
                  <div className="col-sm">118976166RR0001</div>
                  <div className="col-3">Allocation: 50.00%</div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
