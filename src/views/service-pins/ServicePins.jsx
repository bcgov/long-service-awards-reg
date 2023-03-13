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

    return <div className="container p-fluid">
                <PageHeader title="Service Pin Registration" />
                <InfoEligibility />
                <InfoCalculateService />
                <InfoSupervisorEligibility />
                <div className="grid">
                    <div className="col-6">
                        <Button
                            className={'p-button-info w-full flex justify-content-center'}
                            onClick={() => navigate('/service-pins/self')}
                        >
                            Register for Your Service Pin
                        </Button>
                    </div>
                    <div className="col-6">
                        <Button
                            disabled={true}
                            className={'p-button-info w-full flex justify-content-center'}
                            onClick={() => navigate('/service-pins/supervisor')}
                        >
                            Register Your Employees for Service Pins (Supervisors)
                        </Button>
                    </div>
                </div>
            </div>;
}
