/*!
 * Milestone Input fieldset
 * File: MilestoneInput.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import {useContext, useEffect, useState} from "react";
import ServiceCalculator from "../calculator/ServiceCalculator.jsx";
import {Controller, useFormContext} from "react-hook-form";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import classNames from "classnames";
import InfoToolTip from "../common/InfoToolTip";
import { RegistrationContext } from "@/AppContext.js";
import {Button} from "primereact/button";
import {Panel} from "primereact/panel";
import {getMilestones, getQualifyingYears} from "@/services/api.routes.js";

/**
 * Milestones reusable component.
 * @param {object} props
 * @returns {React.JSX.Element} years of service, current milestone, qualifying year, prior milestones
 */

export default function MilestoneInput({ threshold=25 }) {

    // load form data
    const { registration } = useContext(RegistrationContext);
    const { control, setValue, clearErrors, resetField, getValues } = useFormContext();

    // set local states
    const [milestones, setMilestones] = useState();
    const [qualifyingYears, setQualifyingYears] = useState();
    const [calculatorButton, setCalculatorButton] = useState(false);
    const [calculatorDropdown, setCalculatorDropdown] = useState(false);

    // update local ministry selection state
    // - previous service pins only available to select organizations
    useEffect(() => {
        getMilestones().then(setMilestones).catch(console.error);
        getQualifyingYears().then(setQualifyingYears).catch(console.error);
    }, [registration]);

    // Handle years of service change and update fields in state
    // - Note that this resets the awards
    const onYearsOfServiceChange = () => {
        resetField(`service.milestone`, { defaultValue: "" });
        resetField(`service.prior_milestones`, { defaultValue: [] });
        resetField(`service.qualifying_year`, { defaultValue: "" });
        onMilestoneChange();
    };

    // Handle milestone change and update fields in state
    // - Note that this resets the awards
    const onMilestoneChange = () => {
        setValue(`service.awards`, {});
    };

    // toggle service calculator
    const toggleCalculator = (e) => {
        e.preventDefault();
        setCalculatorButton(!calculatorButton);
        setCalculatorDropdown(!calculatorDropdown);
    };

    // update total service years form value
    const setTotalYears = (newValue) => {
        if (newValue !== 0) {
            setValue(`service.service_years`, newValue);
            clearErrors(`service.service_years`);
            onYearsOfServiceChange();
        }
    };

    return <Panel
        className={'mb-3'}
        header={
            <>
                Milestone Details <InfoToolTip
                target="milestones-form"
                content="Enter your years of service and claim milestones in recognition of years served."
            />
            </>
        }
    >
        <div className="container">
            <div className="grid">
                <div className={'col-12 form-field-container'}>
                    <label htmlFor={'service_years'}>
                        Enter your total BCPS years of service <InfoToolTip
                        target="calculator-button"
                        content="Individuals with 25+ years of service are eligible for the
                        Long Service Awards. Use the calculator to help you add up your years of work."
                        position="top"
                    />
                    </label>

                        <Controller
                            name={`service.service_years`}
                            control={control}
                            rules={{required: "Enter your number of BCPS service years."}}
                            render={({ field, fieldState: {invalid, error} }) => (
                                <>
                                    <div className="p-inputgroup">
                                    <InputNumber
                                        min={0}
                                        max={99}
                                        id={field.name}
                                        value={field.value || ''}
                                        onChange={(e) => {
                                            field.onChange(Math.min(e.value, 99));
                                            onYearsOfServiceChange();
                                        }}
                                        aria-describedby={`service_years-help`}
                                        className={classNames({ "p-invalid": error })}
                                        placeholder={`Enter total years of service`}
                                    />
                                    <Button
                                        label={calculatorButton ? "Hide Calculator" : "Show Calculator"}
                                        onClick={toggleCalculator}
                                    />
                                    </div>
                                    { invalid && <p className="error">{error.message}</p> }
                                </>
                            )}
                        />

                </div>
                <div className={'col-12 form-field-container'}>
                    {
                        calculatorDropdown &&
                        <ServiceCalculator formSubmit={(newValue) => setTotalYears(newValue)} />
                    }
                </div>

                <div className={"col-12 form-field-container"}>
                    <label htmlFor={'milestone'}>
                        What milestone are you celebrating? (Select your current or most recent milestone)
                    </label>
                    <Controller
                        name={`service.milestone`}
                        control={control}
                        rules={{required: "Milestone selection is required."}}
                        render={({ field, fieldState: {invalid, error} }) => (
                            <>
                                <Dropdown
                                    disabled={!getValues(`service.service_years`)}
                                    id={field.name}
                                    inputId={field.name}
                                    value={field.value || ''}
                                    onChange={(e) => {
                                        field.onChange(e.value);
                                        onMilestoneChange();
                                    }}
                                    aria-describedby={`milestone-help`}
                                    options={(milestones || []).filter(
                                        opt => opt['name'] <= getValues(`service.service_years`)
                                            && opt['name'] >= threshold
                                    ) || []}
                                    optionLabel="label"
                                    optionValue="name"
                                    placeholder={
                                        getValues(`service.service_years`)
                                            ? `Select the current milestone`
                                            : `First Enter Service Years Above`}
                                />
                                { invalid && <p className="error">{error.message}</p> }
                            </>
                        )}
                    />
                </div>
                <div className="col-12 form-field-container">
                    <label htmlFor={'qualifying_year'}>
                        In what year did you reach this milestone?
                    </label>
                    <Controller
                        name={`service.qualifying_year`}
                        control={control}
                        rules={{required: "Qualifying Year is required."}}
                        render={({ field, fieldState: {invalid, error}  }) => (
                            <>
                                <Dropdown
                                    disabled={!getValues(`service.service_years`)
                                        || !getValues(`service.milestone`)}
                                    id={field.name}
                                    value={field.value || ''}
                                    onChange={(e) => field.onChange(e.value)}
                                    aria-describedby={'qualifying_year-help'}
                                    options={qualifyingYears}
                                    optionLabel="name"
                                    optionValue="name"
                                    tooltip="Select the year that qualified for the current milestone."
                                    tooltipOptions={{ position: "top" }}
                                    placeholder={`During which year was this milestone reached?`}
                                />
                                { invalid && <p className="error">{error.message}</p> }
                            </>
                        )}
                    />
                </div>
            </div>
        </div>
    </Panel>;
}
