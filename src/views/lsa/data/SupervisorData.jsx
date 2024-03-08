/*!
 * Self Registration: Supervisor Data
 * File: SupervisorData.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import { useContext } from "react";
import { RegistrationContext } from "@/AppContext";
import { Panel } from "primereact/panel";
import { Fieldset } from "primereact/fieldset";

/**
 * Recipient Profile Details
 */

export default function SupervisorData() {
  const { registration } = useContext(RegistrationContext);
  const { supervisor } = registration || {};
  const { organization } = registration || {};
  const { first_name, last_name, office_email, office_address } =
    supervisor || {};

  return (
    <div className={"container"}>
      <div className={"grid"}>
        <div className={"col-6"}>First Name</div>
        <div className={"col-6"}>{first_name}</div>
        <div className={"col-6"}>Last Name</div>
        <div className={"col-6"}>{last_name}</div>
        <div className={"col-6"}>Government Email Address</div>
        <div className={"col-6"}>{office_email}</div>
        {!organization.bulk && (
          <div className={"col-12"}>
            <Fieldset legend={"Office Address"} toggleable>
              <div className={"container"}>
                <div className={"grid"}>
                  {office_address && office_address.pobox && (
                    <>
                      <div className={"col-6"}>P.O. Box</div>
                      <div className={"col-6"}>
                        {office_address && office_address.pobox}
                      </div>
                    </>
                  )}
                  <div className={"col-6"}>Street Address</div>
                  <div className={"col-6"}>
                    <div>{office_address && office_address.street1}</div>
                    <div>{office_address && office_address.street2}</div>
                  </div>
                  <div className={"col-6"}>Community or City</div>
                  <div className={"col-6"}>
                    {office_address && office_address.community}
                  </div>
                  <div className={"col-6"}>Province</div>
                  <div className={"col-6"}>
                    {office_address && office_address.province}
                  </div>
                  <div className={"col-6"}>Country</div>
                  <div className={"col-6"}>
                    {office_address && office_address.country}
                  </div>
                  <div className={"col-6"}>Postal Code</div>
                  <div className={"col-6"}>
                    {office_address && office_address.postal_code}
                  </div>
                </div>
              </div>
            </Fieldset>
          </div>
        )}
      </div>
    </div>
  );
}
