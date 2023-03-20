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

export default function ConfirmationInput({children}) {

  // set local states
  const { control } = useFormContext();
  const { confirmed, registration } = useContext(RegistrationContext);

  return <Panel className={'mb-3'} header={'Declaration'}>
    <div className="container">
      <div className="grid">
        <div className="col-12 form-field-container">
            {children}
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
