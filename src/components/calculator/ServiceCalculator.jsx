/*!
 * Years of Service CalculatorSelector (React)
 * File: ServiceCalculatorHelp.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import {useContext, Fragment} from "react";
import { useForm, Controller, useFieldArray, useWatch } from "react-hook-form";
import {CalculatorContext} from "@/AppContext";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import InfoToolTip from "../common/InfoToolTip.jsx";
import HelpTool from "@/components/help/HelpTool.jsx";
import {Toolbar} from "primereact/toolbar";
import AppPanel from "@/components/common/AppPanel.jsx";
import {Button} from "primereact/button";
import "@/styles/ServiceCalculator.css";


/**
 * Calculates total years of service from form control
 * */

const TotalYears = ({ control }) => {
    const value = useWatch({ name: "serviceCalculator", control});
    const yearSet = [];
    value.forEach((element) => {
        const startYear = element["startYear"]
            ? element["startYear"].getFullYear()
            : 0;
        const endYear = element["endYear"]
            ? element["endYear"].getFullYear()
            : startYear;
        for (let i = startYear; i <= endYear; i++) {
            i !== 0 ? yearSet.push(i) : null;
        }
    });
    const totalYears = [...new Set(yearSet)].length || 0;
    return <>{totalYears}</>;
};

/**
 * Service CalculatorSelector component calculates years of service from given year fieldsets.
 * @returns
 */

export default function ServiceCalculator({formSubmit, threshold=5}) {
    // service data context
    const { setService, setEligible } = useContext(CalculatorContext);

    // service calculator form controls
    const { control, handleSubmit, reset, setValue, getValues } = useForm({
        defaultValues: { serviceCalculator: [{ startYear: "", endYear: "", years: "" }] },
    });
    const { fields, append, remove } = useFieldArray({control, name: "serviceCalculator",});

    // calculator submission handler
    const onSubmit = (data) => {
        const yearSet = [];
        data.serviceCalculator.forEach((element) => {
            const startYear = element["startYear"] ? element["startYear"].getFullYear() : 0;
            const endYear = element["endYear"] ? element["endYear"].getFullYear() : startYear;
            for (let i = startYear; i <= endYear; i++) yearSet.push(i);
        });
        const totalYears = [...new Set(yearSet)].length;
        // set eligibility based on threshold milestone
        setEligible(totalYears >= threshold);
        // set service state
        setService({...{service_years: totalYears}});
        // execute callback
        formSubmit(totalYears);
    };

    /**
     * Calculate and store service year range
     * */

    const YearCalculator = (index) => {
        const start = getValues(`serviceCalculator.${index}.startYear`);
        const end = getValues(`serviceCalculator.${index}.endYear`);
        const startYear = start ? start.getFullYear() : new Date().getFullYear();
        const endYear = end ? end.getFullYear() : start.getFullYear() || new Date().getFullYear();
        let lineItemYearsTotal = endYear - startYear <= -1 ? 0 : endYear - startYear + 1;
        setValue(`serviceCalculator.${index}.years`, lineItemYearsTotal);
    };

    const startContent = (
        <Fragment>
            <Button
                className={'m-1 p-button-success'}
                label={'Update Field'}
                severity={"success"}
                icon="pi pi-check"
                onClick={handleSubmit(onSubmit)}
            />
            <Button
                className={'m-1'}
                label={'Add Row'}
                severity={"secondary"}
                icon="pi pi-plus-circle"
                onClick={(e) => {
                    e.preventDefault();
                    append({ startYear: "", endYear: "", years: "" });
                }}
            />
            <Button
                className={'m-1'}
                label={'Reset'}
                severity={"warning"}
                icon="pi pi-undo"
                onClick={(e) => {
                    e.preventDefault();
                    reset({
                        serviceCalculator: [{ startYear: "", endYear: "", years: "" }],
                    });
                }}
            />
            <HelpTool index={'serviceCalculator'} />
        </Fragment>
    );

    const endContent = (
        <Fragment>
            <div className="total-years-counter">
                <span>
                  <InfoToolTip
                      target="total-years-counter"
                      content="Total Years count may differ from years of service
                      per row, as duplicated years are only counted once."
                      position={"top"}
                  />
                  Total Years: <TotalYears key="total-count" {...{ control }} />
                </span>
            </div>
        </Fragment>
    );

    return (
        <AppPanel header={"Service Calculator"}>
            <ul>
                {
                    fields.map((item, index) => {
                        return (
                            <li key={item.id}>
                                <div className="service-calculator-fields grid">
                                    <div className="col-3">
                                        <label htmlFor="startYear">Start Year</label>
                                        <span className="p-float-label">
                    <Controller
                        name={`serviceCalculator.${index}.startYear`}
                        control={control}
                        render={({ field }) => (
                            <Calendar
                                minDate={new Date(1930, 0, 0, 0, 0, 0, 0)}
                                maxDate={new Date()}
                                readOnlyInput
                                id={field.name}
                                value={field.value}
                                onChange={(e) => {
                                    field.onChange(e.value);
                                    YearCalculator(index);
                                }}
                                view="year"
                                dateFormat="yy"
                                mask="9999"
                                showIcon
                            />
                        )}
                    />
                  </span>
                                    </div>
                                    <div className="col-3">
                                        <label htmlFor="endYear">End Year</label>
                                        <span className="p-float-label">
                    <Controller
                        name={`serviceCalculator.${index}.endYear`}
                        control={control}
                        render={({ field }) => (
                            <Calendar
                                minDate={new Date(1930, 0, 0, 0, 0, 0, 0)}
                                maxDate={new Date()}
                                readOnlyInput
                                id={field.name}
                                value={field.value}
                                onChange={(e) => {
                                    field.onChange(e.value);
                                    YearCalculator(index);
                                }}
                                view="year"
                                dateFormat="yy"
                                mask="9999"
                                showIcon
                            />
                        )}
                    />
                  </span>
                                    </div>
                                    <div className="col-4">
                                        <label htmlFor="yearCalculation">Years of Service:</label>
                                        <span className="p-float-label">
                    <Controller
                        name={`serviceCalculator.${index}.years`}
                        control={control}
                        render={({ field }) => (
                            <InputText
                                readOnly
                                id={field.name}
                                value={field.value}
                                placeholder="0"
                            />
                        )}
                    />
                  </span>
                                    </div>
                                    <div className="col-2 pt-5">
                                        {
                                            index !== 0 && <Button
                                                label={'Delete Row'}
                                                severity={"secondary"}
                                                icon="pi pi-minus-circle"
                                                onClick={() => remove(index)}
                                            />
                                        }
                                    </div>
                                </div>
                            </li>
                        );
                    })}
            </ul>
            <Toolbar left={startContent} right={endContent} />
        </AppPanel>
    );
}
