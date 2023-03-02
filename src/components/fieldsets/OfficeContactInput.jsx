/*!
 * Extended Contact Details form input component
 * File: OfficeContactInput.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import React, {useContext} from "react";
import { Controller, useFormContext } from "react-hook-form";
import classNames from "classnames";
import getFormErrorMessage from "@/components/common/ErrorMessage.jsx";
import { OptionsContext } from "@/AppContext.js";
import formServices from "@/services/settings.services.js";
import {matchers} from "@/services/validation.services.js";
import {InputMask} from "primereact/inputmask";


/**
 * Contact Details Reusable component.
 * @param {object} props
 * @param {string} props.panelName string describing what panel these contact details belong to ex: Supervisor, Personal
 * @param {int} props.itemNumber index of item within sublist; when used multiple times in a form, contact details
 * will be registered as a separate item on form
 * @param {object} props.errors inherited errors object
 * @returns first_name, last_name, office email, office phone, employee number,
 * organization, branch, personal phone, personal email
 */

export default function OfficeContactInput({
                                                 panelName,
                                                 itemNumber,
                                                 errors,
                                             }) {
    const { control } = useFormContext();
    const { options } = useContext(OptionsContext);

    // get list of organizations
    const organizations = options ? options.organizations : [];

    //FormStep input name formatting
    let panelGroupName = panelName ? `${panelName.replace(/\s/g, "")}` : "default";
    if (panelName === "personal") panelGroupName = "contact";
    if (panelName && itemNumber) panelGroupName += ` ${itemNumber}`;
    const panelTitle = panelName === "personal" ? "" : formServices.capitalize(panelName) || "";
    const panelPlaceholder = panelName === "personal" ? "Your" : formServices.capitalize(panelName) || "";
    const formItemName = itemNumber ? `${panelName}.${itemNumber - 1}.` : `${panelGroupName}.`;
    const errorBodyName = panelName === "personal" ? "contact" : panelName;

    // Note: To fix error handling to make sure naming convention works
    return <div className="contact-form-extended-details">


        <div className="contact-form-field-container">
            <label
                htmlFor={`${formItemName}office_phone`}
                className={classNames("block", {
                    "p-error": errors.office_phone,
                })}
            >
                {`${panelTitle} Government Phone Number`}
            </label>
            <Controller
                name={`${formItemName}office_phone`}
                control={control}
                rules={{
                    required: "Error: Government phone number is required.",
                    pattern: {
                        value: matchers.phone,
                        message: "Invalid phone number. E.g. (555)-555-5555",
                    },
                }}
                render={({ field, fieldState }) => (
                    <InputMask
                        id={`${field.name}`}
                        value={field.value || ''}
                        mask="(999) 999-9999? x99999"
                        autoClear={false}
                        onChange={(e) => field.onChange(e.target.value)}
                        placeholder={`${panelPlaceholder} government phone number Ex. (999) 999-9999 x99999`}
                        aria-describedby={`${panelGroupName}-government-phone-help`}
                        className={classNames("form-field block", {
                            "p-invalid": fieldState.error,
                        })}
                    />
                )}
            />
            {
                getFormErrorMessage(
                    `${formItemName}office_phone`,
                    errors,
                    errorBodyName,
                    itemNumber - 1,
                    "office_phone")
            }
        </div>

    </div>;
}
