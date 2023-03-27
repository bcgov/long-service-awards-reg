/*!
 * Info Panel: Service Years Eligibility
 * File: InfoServiceEligibility.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import {Message} from "primereact/message";

/**
 * Info Panel: Milestone
  * @returns {JSX.Element}
 */

export default function InfoDelegatedServiceEligibility ({milestone}) {
    // determine award/service pin eligibility based on selected milestone
    const isEligible = milestone >= 5;
    const isLSAEligible = milestone >= 25
    return <>
        {isEligible && <Message
            className={'w-full m-2 font-bold'}
            severity="success"
            content={<span>Selected Milestone: {milestone}</span>}
        />}
        {isLSAEligible && <Message
            className={'w-full m-2'}
            severity="error"
            content={<div>This employee is eligible for a Long Service Award and should not
                be added to the current service-pin registration. Please notify the recipient of their eligibility
                and a service pin will be issued with their award registration.</div>}
        />}
    </>
}
