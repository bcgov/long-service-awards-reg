/*!
 * Info Panel: Previous Registration Status
 * File: InfoPreviousRegistrationStatus.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import React from "react";
import {Button} from "primereact/button";
import {Panel} from "primereact/panel";
import {useNavigate} from "react-router-dom";

/**
 * Info Panel: Previous registration status
 * @returns {JSX.Element}
 */

export default function InfoPreviousRegistrationStatus() {
    const navigate = useNavigate();
    return <Panel className={'mb-3'} header={<>Previous Registration Selected</>}>
        <div className="confirmation-redirection-panel">
            <div className={'flex justify-center'}>
                You have selected that you previously registered for an award (in last two years)
                and were unable to attend your ceremony.
            </div>
            <div>
                <Button
                    className={'m-2 p-button-info w-full flex justify-content-center'}
                    onClick={() => { navigate("/register/milestone") }}>
                    Return to Registration
                </Button>
            </div>
            <div>
                If you believe you are seeing this message in error, please
                contact support at <a href="mailto: LongServiceAwards@gov.bc.ca">
                LongServiceAwards@gov.bc.ca
            </a>.
            </div>
        </div>
    </Panel>
}
