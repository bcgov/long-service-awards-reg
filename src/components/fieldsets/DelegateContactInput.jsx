/*!
 * Delegate Service Pins Contact Info fieldset component
 * File: DelegateContactInput.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import { Controller, useFormContext } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import classNames from "classnames";
import {matchers} from "@/services/validation.services.js";
import InfoToolTip from "@/components/common/InfoToolTip.jsx";
import {Panel} from "primereact/panel";
import AddressInput from "@/components/fieldsets/AddressInput.jsx";
import PageHeader from "@/components/common/PageHeader.jsx";

/**
 * Supervisor Contact Details
 * @returns first_name, last_name, office email */

export default function DelegateContactInput() {

    const { control } = useFormContext();

    return <>
        <Panel
            toggleable
            collapsed={true}
            className={'mb-3'}
            header={<>
                Supervisor Contact Information <InfoToolTip
                target="supervisor-details-profile"
                content="Please enter your contact information."
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
                                        placeholder={`First name`}
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
                                        placeholder={`Last name`}
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
                                    message: "Invalid email address. (e.g., example@gov.bc.ca)",
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
            <AddressInput id={'supervisor.office_address'} label={'Supervisor Office'} pobox={true} />
        </Panel>
    </>;
}
