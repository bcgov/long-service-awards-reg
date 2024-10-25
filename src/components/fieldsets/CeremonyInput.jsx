/*!
 * Ceremony Attendance Input fieldset
 * File: CeremonyInput.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import {useFormContext, useWatch} from "react-hook-form";
import {Panel} from "primereact/panel";
import { Message } from 'primereact/message';
import { RadioButton } from 'primereact/radiobutton';

/**
 * Ceremony Attendance component.
 * @returns {JSX.Element}
 */

export default function CeremonyInput() {

    // set local states
    const { control, setValue } = useFormContext();

    const ceremonyOptOut = useWatch({
        control,
        name: "service.ceremony_opt_out",
    });

    return <Panel className={'mb-3'} header={<>Ceremony Opt-Out</>}>
        <div className="container">
            <div className="grid">
                <div className="col-12 form-field-container">
                    <p>

                        Do you want to opt-out of ceremony attendance, and receive your award only?
                    </p>
                    <div className="flex wrap">
                        
                        <RadioButton
                            checked={ceremonyOptOut}
                            inputId="ceremonyOptOutYes"
                            name="ceremonyOptOut"
                            value="Yes"
                            onChange={(e) => {
                                setValue('service.ceremony_opt_out', e.value === "Yes")
                            }}
                        />
                        <label className={'ml-3'} htmlFor="ceremonyOptOutYes">
                            Yes, I would like to <span className={'font-bold'}>opt-out</span> of the ceremony
                        </label>
                    </div>
                    
                    <div className="flex wrap">
                        
                        <RadioButton
                            checked={!ceremonyOptOut}
                            inputId="ceremonyOptOutNo"
                            name="ceremonyOptOut"
                            value="No"
                            onChange={(e) => {
                                setValue('service.ceremony_opt_out', e.value === "Yes")
                            }}
                        />
                        <label className={'ml-3'} htmlFor="ceremonyOptOutNo">
                            No, I would like to attend the ceremony
                        </label>
                    </div>
                    <p>
                        
                        Selecting the <span className={'font-bold'}>opt-out</span> option means you will not receive an invitation to a
                        ceremony and you will receive your award following your organization’s ceremony
                        night in the fall.
                        
                    </p>
                    { false && ceremonyOptOut && <p><Message text="You have opted to not attend the ceremony as well." severity="info" /></p> }
                </div>
            </div>
        </div>
    </Panel>;
}
