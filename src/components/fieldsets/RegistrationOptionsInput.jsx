/*!
 * Previous Awards Input fieldset
 * File: RegistrationOptionsInput.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import { useFormContext, useWatch } from "react-hook-form";
import { Panel } from "primereact/panel";
import { SelectButton } from "primereact/selectbutton";
import { Checkbox } from "primereact/checkbox";

/**
 * Registration options component.
 * @returns {JSX.Element}
 */

export default function RegistrationOptionsInput() {
  // set local states
  const { control, setValue } = useFormContext();
  const previousRegistration = useWatch({
    control,
    name: "service.previous_registration",
  });
  const previousAward = useWatch({ control, name: "service.previous_award" });

  return (
    <Panel className={"mb-3"} header={<>Registration Options</>}>
      <div className="container">
        <p>
          Have you previously registered for this milestone (in the last 2
          years) and were unable to attend your ceremony?
        </p>
        <div className="grid">
          <div className="col-12 form-field-container">
            <div className="flex align-items-center">
              <Checkbox
                checked={previousRegistration ? true : false}
                aria-describedby={`previous_registration-help`}
                value={previousRegistration ? "Yes" : "No"}
                onChange={(e) => {
                  setValue("service.previous_registration", e.checked);
                  setValue("service.previous_award", false);
                  // set award selection to empty when previous registration selected
                  if (e.checked) setValue(`service.awards`, {});
                }}
              />
              <label className={"m-1"} htmlFor={`previous_registration`}>
                Yes, I have registered for this milestone before
              </label>
            </div>
          </div>
          {previousRegistration && (
            <>
              <div className="col-12 form-field-container">
                <p className="mt-0">Have you received your award?</p>
                <div className="flex align-items-center">
                  <Checkbox
                    checked={previousAward ? true : false}
                    className={"radio-toggle"}
                    value={previousAward ? "Yes" : "No"}
                    aria-describedby={`award-help`}
                    onChange={(e) => {
                      setValue("service.previous_award", e.checked);
                    }}
                  />
                  <label className={"m-1"}>Yes, I have received my award</label>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Panel>
  );
}
