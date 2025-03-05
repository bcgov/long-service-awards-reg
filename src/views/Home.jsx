/*!
 * Home view component
 * File: Home.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import React, { useContext } from "react";
import PageHeader from "../components/common/PageHeader";
import { RegistrationContext } from "../AppContext.js";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Panel } from "primereact/panel";
import InfoEligibility from "@/components/info/InfoEligibility.jsx";

/**
 * Front Page.
 */

export default function Home() {
  const navigate = useNavigate();
  const { confirmed, registration } = useContext(RegistrationContext);

  // check registration status
  const { service } = registration || {};
  const { milestone, delegated } = service || {};
  const isLSA = milestone >= 25;
  const isServicePin = milestone >= 5 && milestone < 25;

  return (
    <div className="container">
      <PageHeader
        title="Welcome"
        subtitle="Long Service Awards And Service Pin Registration"
      ></PageHeader>
      <InfoEligibility />
      <Panel
        className={"mb-3"}
        header="Celebrating Your Service: Long Service Awards"
      >
        <p className="m-2">
          The Long Service Awards celebrate the dedication and commitment of
          employees with 25, 30, 35, 40, 45 and 50 year careers in the BC Public
          Service. Long Service Award ceremonies are prestigious and memorable
          events held in Victoria this fall.
        </p>
        <div className="card">
          <div className="flex justify-content-center flex-wrap card-container">
            <div className="flex align-items-center justify-content-center w-full m-2">
              <Button
                disabled={confirmed && isServicePin}
                onClick={() => {
                  navigate("/lsa/milestone");
                }}
              >
                {(registration && isLSA) || (confirmed && isLSA)
                  ? "View Your Long Service Award Registration"
                  : "Start Your Long Service Award Registration"}
              </Button>
            </div>
          </div>
        </div>
      </Panel>
      <Panel header="Service Pin Registration">
        <p>
          If you’ve reached a career milestone of at least 5, 10, 15 or 20 years
          with the BC Public Service, register now to receive a commemorative
          service pin.
        </p>
        <p>
          Note that Long Service Award recipients automatically receive a
          corresponding service pin and do not need to register separately.
        </p>
        <p>
          You can either register for your own pin or on behalf of someone you
          know. Please ensure you complete the correct form.
        </p>
        <div className="card">
          <div className="grid">
            <div className="col-6 p-3">
              <Button
                disabled={delegated || isLSA}
                className={"p-button-info w-full flex justify-content-center"}
                onClick={() => navigate("/service-pins/self")}
              >
                {isLSA || delegated
                  ? "You are Registered for a Long Service Award"
                  : confirmed
                  ? "View Your Service Pin Registration"
                  : "Register for Your Service Pin"}
              </Button>
            </div>
            <div className="col-6 p-3">
              <Button
                className={"p-button-info w-full flex justify-content-center"}
                onClick={() => navigate("/service-pins/delegated")}
              >
                Register Your Employees for Service Pins (Supervisors)
              </Button>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}
