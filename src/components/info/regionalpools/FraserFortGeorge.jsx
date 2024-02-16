/*!
 * Info: Regional Fund Supported Pool - PECSF Donations
 * Fraser-Fort George Region
 * File: FraserFortGeorge.jsx
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

export default function FraserFortGeorge() {
  return (
    <>
      <div className="container">
        <ul className="list-group list-group-flush  ">
          <li className="list-group-item">
            <div className="row">
              <div className="col-11">
                <div className="row text-primary">
                  <div className="col-10 h5">
                    <b>Learning, Connection and Support Programs</b>
                  </div>
                </div>
                <div className="row text-dark">
                  <div className="col">
                    AutismBC programs seek to empower, support, and connect
                    people on the autism spectrum and their families through
                    education, training, resources, and support groups that
                    promote health and inclusion for individuals with autism,
                    and related conditions, in the Fraser Fort George region.
                  </div>
                </div>

                <div className="row justify-content-between pt-2 text-secondary">
                  <div className="col-12">
                    <b>Charity:</b> AUTISM SOCIETY OF BRITISH COLUMBIA
                  </div>
                </div>

                <div className="row justify-content-between pt-2 text-secondary">
                  <div className="col-sm">107810046RR0001</div>
                  <div className="col-3">Allocation: 40.00%</div>
                </div>
              </div>
            </div>
          </li>

          <li className="list-group-item">
            <div className="row">
              <div className="col-11">
                <div className="row text-primary">
                  <div className="col-10 h5">
                    <b>Spinal Cord Injury Regional Peer Support Program</b>
                  </div>
                </div>
                <div className="row text-dark">
                  <div className="col">
                    Spinal Cord Injury BC’s Peer Support Program gives people in
                    the Fraser Fort George region with a spinal cord injury, and
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
                  <div className="col-3">Allocation: 60.00%</div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
