/*!
 * Self Registration: Profile Data
 * File: ProfileData.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import {useContext} from "react";
import {RegistrationContext} from "@/AppContext";
import {Panel} from "primereact/panel";

/**
 * Recipient Profile Details
 */

export default function ContactData() {

    const { registration } = useContext(RegistrationContext);
    const {contact} = registration || {};
    const { office_phone, office_address } = contact || {}

    return <div className={'container'}>
        <div className={'grid'}>
            <div className={'col-6'}>Office Phone Number</div>
            <div className={'col-6'}>{office_phone}</div>
            <div className={'col-12'}>
                <Panel header={'Office Address'} toggleable>
                    <div className={'container'}>
                        <div className={'grid'}>
                            {
                                office_address && office_address.pobox
                                && <><div className={'col-6'}>P.O. Box</div>
                                    <div className={'col-6'}>{office_address && office_address.pobox}</div></>
                            }
                            <div className={'col-6'}>Street Address</div>
                            <div className={'col-6'}>
                                <div>{office_address && office_address.street1}</div>
                                <div>{office_address && office_address.street2}</div>
                            </div>
                            <div className={'col-6'}>Community or City</div>
                            <div className={'col-6'}>{office_address && office_address.community}</div>
                            <div className={'col-6'}>Province</div>
                            <div className={'col-6'}>{office_address && office_address.province}</div>
                            <div className={'col-6'}>Country</div>
                            <div className={'col-6'}>{office_address && office_address.country}</div>
                            <div className={'col-6'}>Postal Code</div>
                            <div className={'col-6'}>{office_address && office_address.postal_code}</div>
                        </div>
                    </div>
                </Panel>
            </div>
        </div>
    </div>
}
