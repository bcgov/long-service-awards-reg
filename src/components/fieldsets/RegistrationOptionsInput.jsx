/*!
 * Previous Awards Input fieldset
 * File: PreviousAwards.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import {useFormContext, useWatch} from "react-hook-form";
import {Panel} from "primereact/panel";
import {SelectButton} from "primereact/selectbutton";

/**
 * Registration options component.
 * @returns {React.JSX.Element}
 */

export default function RegistrationOptionsInput() {

    // set local states
    const { control, setValue } = useFormContext();

    const previousRegistration = useWatch({
        control,
        name: "previous_registration",
    });
    const previousAward = useWatch({
        control,
        name: "previous_award",
    });
    const ceremonyOptOut = useWatch({
        control,
        name: "service.ceremony_opt_out",
    });

    return <Panel className={'mb-3'} header={<>Registration Options</>}>
        <div className="container">
            <div className="grid">
                <div className="col-12 form-field-container">
                    <div className="flex align-items-center">
                        <SelectButton
                            className={'radio-toggle'}
                            value={previousRegistration ? 'Yes' : 'No'}
                            onChange={(e) => {
                                setValue('previous_registration', e.value === 'Yes')
                                setValue('previous_award', false)
                            }}
                            options={['Yes', 'No']}
                        />
                        <label className={'ml-3'}>
                            Did you register previously (in last two years) and were unable to attend your ceremony?
                        </label>
                    </div>
                </div>
                {
                    previousRegistration && <div className="col-12 form-field-container">
                        <div className="flex align-items-center">
                            <SelectButton
                                className={'radio-toggle'}
                                value={previousAward ? 'Yes' : 'No'}
                                onChange={(e) => {
                                    setValue('previous_award', e.value === 'Yes')
                                }}
                                options={['Yes', 'No']}
                            />
                            <label className={'ml-3'}>
                                If yes, have you received your award?
                            </label>
                        </div>
                    </div>
                }
                <div className="col-12 form-field-container">
                    <div className="flex align-items-center">
                        <SelectButton
                            className={'radio-toggle'}
                            value={ceremonyOptOut ? 'Yes' : 'No'}
                            onChange={(e) => {
                                setValue('service.ceremony_opt_out', e.value === 'Yes')
                            }}
                            options={['Yes', 'No']}
                        />
                        <label className={'ml-3'}>
                            New Registrants: Do you want to receive your award only and not attend the ceremony?
                        </label>
                    </div>
                    <p>
                        Selecting the award only option means you ‘will not’ receive an invitation to your 2023
                        ceremony and you will receive your award following your organization’s ceremony
                        night in the fall.
                    </p>
                </div>
            </div>
        </div>
    </Panel>;
}
