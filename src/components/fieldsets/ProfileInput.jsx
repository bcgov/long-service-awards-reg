/*!
 * Profile Information fieldset component
 * File: ProfileInput.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import classNames from "classnames";
import { OptionsContext } from "@/AppContext.js";
import { matchers, validators } from "@/services/validation.services.js";
import { Dropdown } from "primereact/dropdown";
import InfoToolTip from "@/components/common/InfoToolTip.jsx";
import { Panel } from "primereact/panel";

/**
 * Recipient Profile Information
 * @returns first_name, last_name, office email, office phone, employee number,
 * organization, branch, personal phone, personal email
 */

export default function ProfileInput({ type }) {
  const { control } = useFormContext();
  const { options } = useContext(OptionsContext);
  
  const [passedUniqueConstraint, setPassedUniqueConstraint] = useState(false);

  const [currentCycle, setCurrentCycle ] = useState(null);
  useEffect( () => {
    
      setCurrentCycle(2023);
 
  }, []);

  // get list of organizations
  const { organizations = [] } = options || {};

  return (
    <Panel
      className={"mb-3"}
      header={
        <>
          Profile Information{" "}
          <InfoToolTip
            target="basic-details-form"
            content="Enter your identification profile on this page. This information will be
                    used to populate the options available to you for this registration."
          />
        </>
      }
    >
      <div className="container">
        <div className="grid">
          <div className={"col-12 form-field-container"}>
            <label htmlFor={"contact.first_name"}>First Name</label>
            <Controller
              name={"contact.first_name"}
              control={control}
              rules={{ required: "First name is required." }}
              render={({ field, fieldState: { invalid, error } }) => (
                <>
                  <InputText
                    id={field.name}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value)}
                    className={classNames({ "p-invalid": error })}
                    aria-describedby={`first_name-help`}
                    placeholder={`Your first name`}
                  />
                  {invalid && <p className="error">{error.message}</p>}
                </>
              )}
            />
          </div>
          <div className="col-12 form-field-container">
            <label htmlFor={"contact.last_name"}>Your Last Name</label>
            <Controller
              name={"contact.last_name"}
              control={control}
              rules={{ required: "Last name is required." }}
              render={({ field, fieldState: { invalid, error } }) => (
                <>
                  <InputText
                    id={field.name}
                    value={field.value || ""}
                    className={classNames({ "p-invalid": error })}
                    aria-describedby={`last_name-help`}
                    onChange={(e) => field.onChange(e.target.value)}
                    placeholder={`Your last name`}
                  />
                  {invalid && <p className="error">{error.message}</p>}
                </>
              )}
            />
          </div>
          <div className="col-12 form-field-container">
            <label htmlFor={`contact.office_email`}>
              Government Email Address (If retired, enter your preferred email
              address)
            </label>
            <Controller
              name={"contact.office_email"}
              control={control}
              rules={{
                required: "Government email is required.",
                pattern: {
                  value: matchers.govEmail,
                  message: "Invalid email address (e.g., example@gov.bc.ca)",
                },
              }}
              render={({ field, fieldState: { invalid, error } }) => (
                <>
                  <InputText
                    id={field.name}
                    value={field.value || ""}
                    className={classNames({ "p-invalid": error })}
                    aria-describedby={`government-email-help`}
                    onChange={(e) => field.onChange(e.target.value.trim())}
                    placeholder={`Your government email address`}
                  />
                  {invalid && <p className="error">{error.message}</p>}
                </>
              )}
            />
          </div>
          {type === "lsa" && (
            <div className={"col-12 form-field-container"}>
              <label htmlFor={"contact.personal_email"}>
                Alternate Email Address
              </label>
              <Controller
                name={"contact.personal_email"}
                control={control}
                rules={{
                  required: "Personal email address is required.",
                  pattern: {
                    value: matchers.email,
                    message: "Invalid email address. (e.g., example@gov.bc.ca)",
                  },
                }}
                render={({ field, fieldState: { invalid, error } }) => (
                  <>
                    <InputText
                      id={`${field.name}`}
                      value={field.value || ""}
                      type="text"
                      onChange={(e) => field.onChange(e.target.value.trim())}
                      aria-describedby={"personal_email-help"}
                      placeholder={"Your personal email address"}
                      className={classNames({ "p-invalid": error })}
                    />
                    {invalid && <p className="error">{error.message}</p>}
                  </>
                )}
              />
            </div>
          )}
          <div className="col-12 form-field-container">
            <label htmlFor={`employee_number`}>
              Employee Number (six digits)
            </label>
            <Controller
              name={`employee_number`}
              control={control}
              rules={{
                required: "Employee number is required.",
                pattern: {
                  value: matchers.employeeNumber,
                  message: "Invalid employee number. (e.g., 123456)",
                },
                validate: {
                  duplicate: async (...values) => {

                    const [ input, rowData ] = values;
                    
                    const { services, status } = rowData || {};
                    const hasServices = (services || []).some(
                      (service) => service.cycle === currentCycle
                    );
                   
                    if ( hasServices ) {
                      
                      console.log(`We have services so assuming it's an existing entry, so we're not validating`);
                      return true;
                    }

                    
                    if ( passedUniqueConstraint ) {
                      console.log("Already passed unique constraint, so continuing.")
                      return true;
                    }
                    
                    // Check if recipient employee number is unique in cycle (LSA-478)
                    const duplicate = await validators.recipientUniqueInCycle(input);
                    
                    // continue button validates form again, and this triggers a validation error because number has been registered already
                    console.log("(Profile) Validate duplicate returned " +duplicate);
                    //return !duplicate || "Employee number has already been registered for this cycle."
                    setPassedUniqueConstraint(!duplicate);
                    return passedUniqueConstraint || "Employee number has already been registered for this cycle.";
                  }
                }
              }}
              render={({ field, fieldState: { invalid, error } }) => (
                <>
                  <InputText
                    id={field.name}
                    value={field.value || ""}
                    maxLength={6}
                    minLength={6}
                    placeholder="012345"
                    onChange={(e) => {
                      // require integers for employee number
                      const filteredValue = e.target.value.replace(
                        /[^0-9]/g,
                        ""
                      );
                      field.onChange(filteredValue);
                    }}
                    aria-describedby={`employee_number-help`}
                    className={classNames({ "p-invalid": error })}
                  />
                  {invalid && <p className="error">{error.message}</p>}
                </>
              )}
            />
          </div>
          <div className="col-12 form-field-container">
            <label htmlFor={`organization.id`}>Ministry/Organization</label>
            <Controller
              name={`organization.id`}
              control={control}
              rules={{ required: "Ministry or Organization is required." }}
              render={({ field, fieldState: { invalid, error } }) => (
                <>
                  <Dropdown
                    id={field.name}
                    value={field.value || ""}
                    filter
                    onChange={(e) => field.onChange(e.target.value)}
                    aria-describedby={`organization-help`}
                    options={organizations}
                    optionLabel="name"
                    optionValue="id"
                    className={classNames({ "p-invalid": error })}
                    placeholder={`Select your ministry or organization`}
                  />
                  {invalid && <p className="error">{error.message}</p>}
                </>
              )}
            />
          </div>
          <div className="col-12 form-field-container">
            <label htmlFor={`division`}>Division</label>
            <Controller
              name={"division"}
              control={control}
              rules={{ required: "Division is required." }}
              render={({ field, fieldState: { invalid, error } }) => (
                <>
                  <InputText
                    id={field.name}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value)}
                    aria-describedby={`division-help`}
                    className={classNames({ "p-invalid": error })}
                    placeholder={`Your division`}
                  />
                  <small>No acronyms, please spell the name in full.</small>
                  {invalid && <p className="error">{error.message}</p>}
                </>
              )}
            />
          </div>
          <div className="col-12 form-field-container">
            <label htmlFor={"branch"}>Branch</label>
            <Controller
              name={"branch"}
              control={control}
              rules={{ required: "Branch is required." }}
              render={({ field, fieldState: { invalid, error } }) => (
                <>
                  <InputText
                    id={field.name}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value)}
                    aria-describedby={`branch-help`}
                    className={classNames({ "p-invalid": error })}
                    placeholder={`Your branch`}
                  />
                  <small>No acronyms, please spell the name in full.</small>
                  {invalid && <p className="error">{error.message}</p>}
                </>
              )}
            />
          </div>
        </div>
      </div>
    </Panel>
  );
}
