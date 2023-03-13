/*!
 * Contact Information fieldset component
 * File: ProfileInput.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import { Controller, useFormContext } from "react-hook-form";
import classNames from "classnames";
import {matchers} from "@/services/validation.services.js";
import {InputMask} from "primereact/inputmask";
import InfoToolTip from "@/components/common/InfoToolTip.jsx";
import {Panel} from "primereact/panel";
import AddressInput from "@/components/fieldsets/AddressInput.jsx";

/**
 * Contact Details Reusable component.
 * @returns personal phone
 */

export default function PersonalContactInput() {
    const { control } = useFormContext();
    return <>
        <Panel
            className={'mb-3'}
            header={
                <> Personal Contact Information <InfoToolTip
                    target="personal-contact-form"
                    content="Personal Contact Details are required for Long Service Award recipients."
                />
                </>
            }
        >
            <div className="container">
                <div className="grid">
                    <div className={'col-12 form-field-container'}>
                        <label htmlFor={'contact.personal_phone'}>Personal Phone Number</label>
                        <Controller
                            name={'contact.personal_phone'}
                            control={control}
                            rules={{
                                required: "Error: Personal phone number is required.",
                                pattern: {
                                    value: matchers.phone,
                                    message: "Invalid phone number. E.g. (555)-555-5555",
                                },
                            }}
                            render={({ field, fieldState: {invalid, error} }) => (
                                <>
                                    <InputMask
                                        id={field.name}
                                        value={field.value || ''}
                                        mask="(999) 999-9999? x99999"
                                        autoClear={false}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        placeholder={'Personal phone number Ex. (999) 999-9999 x99999'}
                                        aria-describedby={'personal_phone-help'}
                                        className={classNames({"p-invalid": error})}
                                    />
                                    { invalid && <p className="error">{error.message}</p> }
                                </>
                            )}
                        />
                    </div>
                </div>
            </div>
        </Panel>
        <AddressInput id={'contact.personal_address'} label={'Personal'} />
    </>;
}
