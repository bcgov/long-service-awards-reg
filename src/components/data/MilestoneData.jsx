/*!
 * Self Registration: Milestone Selection Data
 * File: Milestone.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import {useContext} from "react";
import {RegistrationContext} from "@/AppContext.js";

/**
 * Milestone Selection.
 * Allows user to use built in calculator to determine years of service and potential milestones.
 */

export default function MilestoneData() {

  const { registration } = useContext(RegistrationContext);
  const {service, retirement, retirement_date, previous_award} = registration || {};
  const {milestone, qualifying_year, service_years, ceremony_opt_out, previous_registration} = service || {};
  const retirementDate = retirement_date ? new Date(retirement_date) : null;

  return <div className={'container'}>
      <div className={'grid'}>
          <div className={'col-6'}>Current Years of Service</div>
          <div className={'col-6'}>{service_years}</div>
          <div className={'col-6'}>Current Milestone</div>
          <div className={'col-6'}>{milestone}</div>
          <div className={'col-6'}>Milestone Qualifying Year</div>
          <div className={'col-6'}>{qualifying_year}</div>
          <div className={'col-6'}>Do you want to receive your award only and not attend the ceremony?</div>
          <div className={'col-6'}>{ceremony_opt_out ? 'Yes' : 'No'}</div>
          <div className={'col-6'}>
              Did you register previously (in last two years)
              and were unable to attend your ceremony?
          </div>
          <div className={'col-6'}>{previous_registration ? 'Yes' : 'No'}</div>
          {
              previous_registration && <><div className={'col-6'}>If yes, have you received your award?</div>
                  <div className={'col-6'}>{previous_award ? 'Yes' : 'No'}</div></>
          }
          <div className={'col-6'}>Retiring This Year</div>
          <div className={'col-6'}>{retirement ? 'Yes' : 'No'}</div>
          {
              retirement && <><div className={'col-6'}>Retirement Date</div>
                  <div className={'col-6'}>{retirementDate ? retirementDate.toLocaleDateString() : 'Unknown'}</div></>
          }
      </div>
  </div>
}
