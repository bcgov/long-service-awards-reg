/*!
 * Delegated Service Pin Registration: Employee Data fieldset component
 * File: EmployeeInput.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import { Controller, useFormContext, useWatch } from "react-hook-form";
import classNames from "classnames";
import { matchers, validators } from "@/services/validation.services.js";
import InfoToolTip from "@/components/common/InfoToolTip.jsx";
import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import ServiceCalculator from "@/components/common/ServiceCalculator.jsx";
import { MultiSelect } from "primereact/multiselect";
import {
  getMilestones,
  getQualifyingYears,
  getOrganizations,
} from "@/services/api.routes.js";
import { Fieldset } from "primereact/fieldset";
import InfoDelegatedServiceEligibility from "@/components/info/InfoDelegatedServiceEligibility";

/**
 * Employee Details Reusable component.
 * @returns employees input form
 */

export default function EmployeeInput({ index, remove }) {
  // set local states
  const { control, resetField, getValues, setValue, clearErrors } =
    useFormContext();

  // init local states
  const [retroactiveEligible, setRetroactiveEligible] = useState([]);
  const [retroactiveMilestones, setRetroactiveMilestones] = useState([]);
  const [milestones, setMilestones] = useState();
  const [qualifyingYears, setQualifyingYears] = useState();
  const [organizations, setOrganizations] = useState();
  const [showCalculator, setShowCalculator] = useState(false);

  const selectedOrg = useWatch({ name: `employees.${index}.organization` });
  const selectedMilestone = useWatch({
    name: `employees.${index}.service.milestone`,
  });

  // update milestone/qualifying year options for dropdowns
  useEffect(() => {
    getMilestones().then(setMilestones).catch(console.error);
    getQualifyingYears()
      .then((qualifyingYears) => {
        const currentYear = qualifyingYears.filter(
          (years) => years.current == true
        )[0]?.name;
        const selectableYears = qualifyingYears.filter(
          (years) => years.name > currentYear - 5
        );
        setQualifyingYears(selectableYears);
      })
      .catch(console.error);
    getOrganizations().then(setOrganizations).catch(console.error);
  }, []);

  // Compute milestone year / Handle years of service change and update fields in state
  // - Note that this resets the awards
  const calculateMilestone = () => {
    resetField(`employees.${index}.service.milestone`, { defaultValue: "" });
    resetField(`employees.${index}.service.prior_milestones`, {
      defaultValue: [],
    });
    resetField(`employees.${index}.service.qualifying_year`, {
      defaultValue: "",
    });
    // get milestone bounds
    const serviceYears = getValues(`employees.${index}.service.service_years`);
    const min = Math.min(...(milestones || []).map((m) => m.name));
    const max = 25;
    // find the closest milestone within bounds
    const estimate = (milestones || [])
      .map((m) => m.name)
      .reduce((prev, curr) =>
        Math.abs(curr - serviceYears) < Math.abs(prev - serviceYears) &&
        serviceYears >= curr
          ? curr
          : prev
      );
    // set estimated current milestone (service years must be at least >= minimum milestone)
    setValue(
      `employees.${index}.service.milestone`,
      serviceYears >= min ? estimate : ""
    );
  };

  // toggle service calculator
  const toggleCalculator = (e) => {
    e.preventDefault();
    setShowCalculator(!showCalculator);
  };

  // update total service years form value
  const setTotalYears = (newValue) => {
    if (newValue !== 0) {
      setValue(`employees.${index}.service.service_years`, newValue);
      clearErrors(`employees.${index}.service.service_years`);
      calculateMilestone();
    }
  };

  // is employee eligible for retroactive milestones?
  // - unclaimed service pins only available to select organizations
  useEffect(() => {
    setRetroactiveEligible(
      (organizations || []).some(
        (org) =>
          selectedOrg &&
          selectedOrg.hasOwnProperty("id") &&
          org.id === selectedOrg.id &&
          org.previous_service_pins
      )
    );
  }, [selectedOrg]);

  // update retroactive milestones
  // - unclaimed service pins only available to select organizations
  useEffect(() => {
    setRetroactiveMilestones(
      (milestones || []).filter(
        (milestone) =>
          retroactiveEligible &&
          selectedMilestone &&
          parseInt(milestone.name) < selectedMilestone
      )
    );
  }, [selectedMilestone, retroactiveEligible]);

  return (
    <Fieldset className={"m-3"} legend={<>Employee {index + 1}</>}>
      <div className="container">
        <div className="grid">
          <div className={"col-12 form-field-container"}>
            <label htmlFor={`employees.${index}.contact.first_name`}>
              First Name
            </label>
            <Controller
              name={`employees.${index}.contact.first_name`}
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
                    placeholder={`Employee\'s first name`}
                  />
                  {invalid && <p className="error">{error.message}</p>}
                </>
              )}
            />
          </div>
          <div className="col-12 form-field-container">
            <label htmlFor={`employees.${index}.contact.last_name`}>
              Last Name
            </label>
            <Controller
              name={`employees.${index}.contact.last_name`}
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
                    placeholder={`Employee\'s last name`}
                  />
                  {invalid && <p className="error">{error.message}</p>}
                </>
              )}
            />
          </div>
          <div className="col-12 form-field-container">
            <label htmlFor={`employees.${index}.contact.office_email`}>
              Government Email Address (If retired, enter employee's preferred
              email address)
            </label>
            <Controller
              name={`employees.${index}.contact.office_email`}
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
                    onChange={(e) => field.onChange(e.target.value)}
                    placeholder={`Employee\'s government email address`}
                  />
                  {invalid && <p className="error">{error.message}</p>}
                </>
              )}
            />
          </div>
          <div className="col-12 form-field-container">
            <label htmlFor={`employees.${index}.employee_number`}>
              Employee Number (six digits)
            </label>
            <Controller
              name={`employees.${index}.employee_number`}
              control={control}
              rules={{
                required: "Employee number is required.",
                pattern: {
                  value: matchers.employeeNumber,
                  message: "Invalid employee number. (e.g., 123456)",
                },
                validate: {
                  duplicate: async (value) => {
                    // Check if recipient employee number is unique in cycle (LSA-478)
                    const exists = await validators.recipientExistsInCycle(
                      value
                    );
                    console.log(
                      "(Employee) Validate exists returned " + exists
                    );
                    return (
                      !exists ||
                      "Employee number has already been registered for this cycle."
                    );
                  },
                },
              }}
              render={({ field, fieldState: { invalid, error } }) => (
                <>
                  <InputText
                    id={field.name}
                    value={field.value || ""}
                    maxLength={6}
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
            <label htmlFor={`employees.${index}.organization.id`}>
              Ministry/Organization
            </label>
            <Controller
              name={`employees.${index}.organization.id`}
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
                    placeholder={`Select employee\'s ministry or organization`}
                  />
                  {invalid && <p className="error">{error.message}</p>}
                </>
              )}
            />
          </div>
          <div className={"col-12 form-field-container"}>
            <label htmlFor={`employees.${index}.service.service_years`}>
              Enter employee's total BCPS years of service{" "}
              <InfoToolTip
                target="calculator-button"
                content="Individuals with 25+ years of service are eligible for a
                        Long Service Award. Use the calculator to help you add up employee's years of work."
                position="top"
              />
            </label>

            <Controller
              name={`employees.${index}.service.service_years`}
              control={control}
              rules={{
                required: "Enter employee's number of BCPS service years.",
              }}
              render={({ field, fieldState: { invalid, error } }) => (
                <>
                  <div className="p-inputgroup">
                    <InputNumber
                      min={0}
                      max={99}
                      id={field.name}
                      value={field.value || ""}
                      onChange={(e) => {
                        field.onChange(Math.min(e.value, 99));
                        calculateMilestone();
                      }}
                      aria-describedby={`service_years-help`}
                      className={classNames({ "p-invalid": error })}
                      placeholder={`Enter total years of service`}
                    />
                    <Button
                      label={
                        showCalculator ? "Hide Calculator" : "Show Calculator"
                      }
                      onClick={toggleCalculator}
                    />
                  </div>
                  {invalid && <p className="error">{error.message}</p>}
                </>
              )}
            />
          </div>
          {showCalculator && (
            <div className={"col-12 form-field-container"}>
              <ServiceCalculator
                formSubmit={(newValue) => setTotalYears(newValue)}
              />
            </div>
          )}
          <div className={"col-12 form-field-container"}>
            <InfoDelegatedServiceEligibility
              milestone={getValues(`employees.${index}.service.milestone`)}
            />
          </div>
          <div className="col-12 form-field-container">
            <label htmlFor={`employees.${index}.service.qualifying_year`}>
              In what year did the employee reach this milestone?
            </label>
            <Controller
              name={`employees.${index}.service.qualifying_year`}
              control={control}
              rules={{ required: "Qualifying Year is required." }}
              render={({ field, fieldState: { invalid, error } }) => (
                <>
                  <Dropdown
                    disabled={
                      !getValues(`employees.${index}.service.service_years`) ||
                      !getValues(`employees.${index}.service.milestone`)
                    }
                    id={field.name}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.value)}
                    aria-describedby={"qualifying_year-help"}
                    options={qualifyingYears}
                    optionLabel="name"
                    optionValue="name"
                    tooltip="Select the year that qualified for the current milestone."
                    tooltipOptions={{ position: "top" }}
                    placeholder={`During which year was this milestone reached?`}
                  />
                  {invalid && <p className="error">{error.message}</p>}
                </>
              )}
            />
          </div>
          <div className="col-12 form-field-container">
            <label htmlFor={`employees.${index}.prior_milestones`}>
              Prior Unclaimed Milestone(s)
            </label>
            <Controller
              name={`employees.${index}.prior_milestones`}
              control={control}
              render={({ field, fieldState: { invalid, error } }) => (
                <>
                  <MultiSelect
                    disabled={!retroactiveEligible}
                    id={field.name}
                    display="chip"
                    value={field.value || ""}
                    onChange={(e) => {
                      field.onChange(e.value);
                    }}
                    aria-describedby={"prior-milestones-help"}
                    options={retroactiveMilestones}
                    optionLabel="label"
                    optionValue="name"
                    className={classNames({ "p-invalid": error })}
                    placeholder={
                      retroactiveMilestones
                        ? "Select employee's prior milestones."
                        : "Organization not eligible for unclaimed service pins"
                    }
                  />
                  {invalid && <p className="error">{error.message}</p>}
                </>
              )}
            />
          </div>
        </div>
      </div>
      {index > 0 && (
        <Button
          className={"m-2 w-full p-button-danger"}
          label={"Remove Employee Registration"}
          severity={"info"}
          icon="pi pi-user-minus"
          onClick={(e) => {
            e.preventDefault();
            remove(index);
          }}
        />
      )}
    </Fieldset>
  );
}
