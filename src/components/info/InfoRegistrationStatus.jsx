/*!
 * Info Panel: Registration Status
 * File: InfoRegistrationStatus.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import React from "react";
import {Button} from "primereact/button";
import {Panel} from "primereact/panel";
import {useNavigate} from "react-router-dom";

/**
 * Info Panel: PECSF Donations
 * @returns {JSX.Element}
 */

export default function InfoRegistrationStatus() {
    const navigate = useNavigate();
    return <Panel className={'mb-3'} header={<span>Registration Submitted</span>}>
        <div className="confirmation-redirection-panel">
            <div className={'flex justify-center'}>
                You have already submitted your registration for this year.
                Please review your application details here:
            </div>
            <div>
                <Button
                    className={'m-2 p-button-info w-full flex justify-content-center'}
                    onClick={() => { navigate("/register/confirmation") }}>
                    Confirmation Page
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
