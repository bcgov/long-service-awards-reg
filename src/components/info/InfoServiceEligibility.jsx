/*!
 * Info Panel: Service Years Eligibility
 * File: InfoServiceEligibility.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import {Message} from "primereact/message";
import {Link} from "react-router-dom";

/**
 * Info Panel: Milestone
  * @returns {JSX.Element}
 */

export default function InfoServiceEligibility ({type, milestone}) {
    // determine award/service pin eligibility based on selected milestone
    const isEligible = type === 'lsa' ? milestone >= 25 : milestone >= 5;
    const altEligibile = type === 'lsa' ? milestone >= 5 && milestone < 25 : milestone >= 25
    return <>
        {isEligible && <Message
            className={'w-full m-2 font-bold'}
            severity="success"
            content={<span>Your Current Milestone: {milestone}</span>}
        />}
        {altEligibile && <Message
            className={'w-full m-2'}
            severity="info"
            content={
                type === 'lsa'
                    ? <div>
                        You are eligible for a <Link to="/service-pins/self/milestone">Service Pin</Link>.
                        Long Service Award recipients must have 25+
                        years of service to be eligible.
                    </div>
                    : <div>
                        You are eligible for a Long Service Award! <Link to="/lsa/milestone">
                        Click Here</Link> to complete your award registration.
                    </div>
            }
        />}
    </>
}
