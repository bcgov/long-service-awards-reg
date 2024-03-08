/*!
 * Info: Regional Fund Supported Pool - PECSF Donations
 * Fraser Valley Region
 * File: FraserValley.jsx
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

export default function FraserValley() {
  return (
    <>
      <div className="container">
        <ul className="list-group list-group-flush  ">
          <li className="list-group-item">
            <div className="row">
              <div className="col-11">
                <div className="row text-primary">
                  <div className="col-10 h5">
                    <b>AutismBC Learning, Connection and Support Programs</b>
                  </div>
                </div>
                <div className="row text-dark">
                  <div className="col">
                    AutismBC programs seek to empower, support, and connect
                    people on the autism spectrum and their families through
                    education, training, resources, and support groups that
                    promote health and inclusion for individuals with autism,
                    and related conditions, in the Fraser Valley region.
                  </div>
                </div>

                <div className="row justify-content-between pt-2 text-secondary">
                  <div className="col-12">
                    <b>Charity:</b> AUTISM SOCIETY OF BRITISH COLUMBIA
                  </div>
                </div>

                <div className="row justify-content-between pt-2 text-secondary">
                  <div className="col-sm">107810046RR0001</div>
                  <div className="col-3">Allocation: 51.42%</div>
                </div>
              </div>
            </div>
          </li>

          <li className="list-group-item">
            <div className="row">
              <div className="col-11">
                <div className="row text-primary">
                  <div className="col-10 h5">
                    <b>Spinal Cord Injury Local Peer Support Program</b>
                  </div>
                </div>
                <div className="row text-dark">
                  <div className="col">
                    Spinal Cord Injury BC’s Peer Support Program gives people in
                    the Fraser Valley region with a spinal cord injury, and
                    their family and friends, the opportunity to connect with
                    others in similar situations, to try activities they never
                    imagined possible and to continue learning about living well
                    with an injury.
                  </div>
                </div>

                <div className="row justify-content-between pt-2 text-secondary">
                  <div className="col-12">
                    <b>Charity:</b> CANADIAN PARAPLEGIC ASSOCIATION (B.C.)
                  </div>
                </div>

                <div className="row justify-content-between pt-2 text-secondary">
                  <div className="col-sm">118835024RR0001</div>
                  <div className="col-3">Allocation: 24.29%</div>
                </div>
              </div>
            </div>
          </li>

          <li className="list-group-item">
            <div className="row">
              <div className="col-11">
                <div className="row text-primary">
                  <div className="col-10 h5">
                    <b>Financial Literacy for all Fraser Valley Youth</b>
                  </div>
                </div>
                <div className="row text-dark">
                  <div className="col">
                    Through partnerships with educators and volunteers from
                    local businesses, JABC offers interactive, hands-on learning
                    experiences in financial literacy, entrepreneurship, and
                    work readiness to students in Grades 4 to 12 in communities
                    across the Fraser Valley region.
                  </div>
                </div>

                <div className="row justify-content-between pt-2 text-secondary">
                  <div className="col-12">
                    <b>Charity:</b> JUNIOR ACHIEVEMENT OF BRITISH COLUMBIA
                  </div>
                </div>

                <div className="row justify-content-between pt-2 text-secondary">
                  <div className="col-sm">118976166RR0001</div>
                  <div className="col-3">Allocation: 24.29%</div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
