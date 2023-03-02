/*!
 * Supervisor Contact Details fieldset component
 * File: SupervisorContactInput.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import { Controller, useFormContext } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import classNames from "classnames";
import {matchers} from "@/services/validation.services.js";
import InfoToolTip from "@/components/common/InfoToolTip.jsx";
import {Panel} from "primereact/panel";

/**
 * Supervisor Contact Details
 * @returns first_name, last_name, office email */

export default function SupervisorContactInput() {
    const { control } = useFormContext();

    // Note: To fix error handling to make sure naming convention works
    return <Panel className={'mb-3'}
        header={<>
                    Supervisor Contact Information <InfoToolTip
                    target="supervisor-details-profile"
                    content="Please enter the contact information of your current supervisor."
                    />
            </>}>
        <div className="container">
            <div className="grid">
                <div className={'col-12 form-field-container'}>
                    <label htmlFor={'supervisor.first_name'}>First Name</label>
                    <Controller
                        name={'supervisor.first_name'}
                        control={control}
                        rules={{ required: "First name is required." }}
                        render={({ field, fieldState: {invalid, error} }) => (
                            <>
                                <InputText
                                    id={field.name}
                                    value={field.value || ''}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    className={classNames({"p-invalid": error})}
                                    aria-describedby={`first_name-help`}
                                    placeholder={`Supervisor first name`}
                                />
                                { invalid && <p className="error">{error.message}</p> }
                            </>
                        )}
                    />

                </div>
                <div className="col-12 form-field-container">
                    <label htmlFor={'supervisor.last_name'}>Last Name</label>
                    <Controller
                        name={'supervisor.last_name'}
                        control={control}
                        rules={{ required: "Last name is required." }}
                        render={({ field, fieldState: {invalid, error} }) => (
                            <>
                                <InputText
                                    id={field.name}
                                    value={field.value || ''}
                                    className={classNames({"p-invalid": error})}
                                    aria-describedby={`last_name-help`}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    placeholder={`Supervisor last name`}
                                />
                                { invalid && <p className="error">{error.message}</p> }
                            </>
                        )}
                    />
                </div>
                <div className="col-12 form-field-container">
                    <label htmlFor={`supervisor.office_email`}>Government Email</label>
                    <Controller
                        name={'supervisor.office_email'}
                        control={control}
                        rules={{
                            required: "Error: Government email is required.",
                            pattern: {
                                value: matchers.govEmail,
                                message: "Invalid email address. E.g. example@gov.bc.ca",
                            },
                        }}
                        render={({ field, fieldState: {invalid, error} }) => (
                            <>
                                <InputText
                                    id={field.name}
                                    value={field.value || ''}
                                    className={classNames({"p-invalid": error})}
                                    aria-describedby={`government-email-help`}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    placeholder={`Your government email address`}
                                />
                                { invalid && <p className="error">{error.message}</p> }</>
                        )}
                    />
                </div>
            </div>
        </div>
    </Panel>;
}
