/*!
 * Home view component
 * File: Home.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import React, { useContext } from "react";
import PageHeader from "../components/common/PageHeader";
import { RegistrationContext } from "../AppContext.js";
import { useNavigate } from "react-router-dom";
import {Button} from "primereact/button";
import {Card} from "primereact/card";
import {Panel} from "primereact/panel";

/**
 * Front Page.
 */

export default function Home() {
    const navigate = useNavigate();
    const { registration } = useContext(RegistrationContext);
    const submittedRegistration = registration ? registration.confirmed : null;
    const activeRegistration = JSON.stringify(registration) !== "{}";

    const registerRedirect = () => {
        navigate("/register/milestone");
    };

    return (
        <div className="container">
            <PageHeader
                title="Welcome"
                subtitle="Long Service Awards And Service Pin Registration"
            ></PageHeader>
            <Panel header="Celebrating Your Service">
                <p className="m-2">
                    The Long Service Awards celebrate the dedication and commitment of
                    employees with 25, 30, 35, 40, 45 and 50 year careers in the BC Public
                    Service. Long Service Award ceremonies are prestigious and memorable
                    events held at Government House in Victoria, the official residence of
                    B.C.'s Lieutenant Governor and the ceremonial home for all British
                    Columbians.
                </p>
                <div className="card">
                    <div className="flex justify-content-center flex-wrap card-container">
                        <div
                            className="flex align-items-center justify-content-center w-full m-2">
                            <Button onClick={registerRedirect}>
                                { activeRegistration || submittedRegistration ? "View Your Registration" : "Register" }
                            </Button>
                        </div>
                    </div>
                </div>
            </Panel>

        </div>
    );
}
