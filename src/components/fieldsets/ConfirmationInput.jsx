/*!
 * Registration Confirmation fieldset component
 * File: ConfirmationInput.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import { Controller, useFormContext } from "react-hook-form";
import {Checkbox} from "primereact/checkbox";
import {Panel} from "primereact/panel";
import {useContext} from "react";
import {RegistrationContext} from "@/AppContext.js";

/**
 * Registration confirmation input component.
 * @returns {JSX.Element},
 */

export default function ConfirmationInput() {

  // set local states
  const { control } = useFormContext();
  const { confirmed } = useContext(RegistrationContext);

  return <Panel className={'mb-3'} header={'Declaration'}>
    <div className="container">
      <div className="grid">
        <div className="col-12 form-field-container">
            <p>
                I declare, to the best of my knowledge and consistent with the Long Service Awards eligibility
                guidelines (which I have reviewed) that as of December 31, 2022, I will have worked for the BC
                Public Service for 25, 30, 35, 40, 45 or 50 years and I am therefore eligible for a Long
                Service Award. By providing my personal information, I am allowing the BC Public Service
                Agency to use and disclose this information for the planning and delivery of the Long Service
                Award recognition events. This personal information is required to process your application
                for the Long Service Awards and is collected in accordance with section 26(c) of the Freedom
                of Information and Protection of Privacy Act (FOIPPA). Questions about the collection or use
                of this information can be directed to Program Manager,
                <a href="mailto:LongServiceAwards@gov.bc.ca">LongServiceAwards@gov.bc.ca</a>, 1st floor -
                563 Superior Street, Victoria BC, V8V 0C5, or by calling 1.877.277.0772.
            </p>
          <div className="flex align-items-center">
            <Controller
                name="service.confirmed"
                control={control}
                render={({ field, fieldState: {invalid, error} }) => (
                    <>
                      <Checkbox
                          id={field.name}
                          inputId={'registration-confirmation'}
                          checked={field.value || false}
                          disabled={confirmed}
                          aria-describedby={`service-confirmation-help`}
                          value={field.value || false}
                          onChange={(e) => {
                            field.onChange(e.checked);
                          }}
                      />
                      { invalid && <p className="error">{error.message}</p> }
                    </>
                )}
            />
            <label className={'m-1 font-bold'} htmlFor={`registration-confirmation`}>
                I declare the information provided in this registration to be accurate.</label>
          </div>
        </div>

        <div className="col-12 form-field-container">
          <p>Would you like to participate in our survey?</p>
          <div className="flex align-items-center">
            <Controller
                name="service.survey_opt_in"
                control={control}
                render={({ field, fieldState: {invalid, error} }) => (
                    <>
                      <Checkbox
                          id={field.name}
                          inputId={'survey_opt-in'}
                          disabled={confirmed}
                          checked={field.value || false}
                          aria-describedby={`survey_opt-in-help`}
                          value={field.value || false}
                          onChange={(e) => {
                            field.onChange(e.checked);
                          }}
                      />
                      { invalid && <p className="error">{error.message}</p> }
                    </>
                )}
            />
            <label className={'m-1'} htmlFor={'survey_opt-in'}>Yes, I would like to participate in the LSA survey</label>
          </div>
        </div>
      </div>
    </div>
  </Panel>;
}
