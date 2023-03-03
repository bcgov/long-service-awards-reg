/*!
 * Service CalculatorSelector Options View (React)
 * File: CalculatorSelector.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */


import PageHeader from "@/components/common/PageHeader.jsx";
import InfoSupervisorEligibility from "@/components/info/InfoSupervisorEligibility.jsx";
import InfoCalculateService from "@/components/info/InfoCalculateService.jsx";
import InfoEligibility from "@/components/info/InfoEligibility.jsx";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";

/**
 * CalculatorSelector Parent Page.
 * Provides outlet for self and supervisor calculations.
 */

export default function ServicePins() {

    const navigate = useNavigate();

    return (
        <>
            <div className="calculator-splash">
                <PageHeader title="Long Service Award and Service Pin Eligibility" singleLine gradient1 />
                <>
                    <InfoEligibility />
                    <InfoCalculateService />
                    <InfoSupervisorEligibility />
                    <div className="grid">
                        <div className="col-6">
                            <Button onClick={() => navigate('/service-pins/self')}>
                                Self-Registration: Calculate My Eligibility
                            </Button>
                        </div>
                        <div className="col-6">
                            <Button onClick={() => navigate('/service-pins/supervisor')}>
                                Supervisor Registrations: Register Employees
                            </Button>
                        </div>
                    </div>
                </>
            </div>
        </>
    );
}
