/*!
 * Self Registration: Milestone Selection Data
 * File: Milestone.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import {useContext} from "react";
import {RegistrationContext} from "@/AppContext";

/**
 * Service-Pins: Milestone Selection.
 *
 */

export default function MilestoneData() {

  const { registration } = useContext(RegistrationContext);
  const {service} = registration || {};
  const {milestone, qualifying_year, service_years } = service || {};

  return <div className={'container'}>
      <div className={'grid'}>
          <div className={'col-6'}>Current Years of Service</div>
          <div className={'col-6'}>{service_years}</div>
          <div className={'col-6'}>Current Milestone</div>
          <div className={'col-6'}>{milestone}</div>
          <div className={'col-6'}>Milestone Qualifying Year</div>
          <div className={'col-6'}>{qualifying_year}</div>
      </div>
  </div>
}
