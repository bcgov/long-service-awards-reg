/*!
 * Service CalculatorSelector Options View (React)
 * File: CalculatorSelector.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import React, {useContext, useEffect} from "react";
import AppButton from "@/components/common/AppButton";
import AppPanel from "@/components/common/AppPanel";
import PageHeader from "@/components/common/PageHeader";
import { useNavigate, Outlet, useLocation } from "react-router";
import "@/styles/CalculatorLanding.css";
import {CalculatorContext} from "@/AppContext.js";
import InfoSupervisorEligibility from "@/components/info/InfoSupervisorEligibility.jsx";
import InfoCalculateService from "@/components/info/InfoCalculateService.jsx";
import InfoEligibility from "@/components/info/InfoEligibility.jsx";
import CalculatorSelf from "@/components/calculator/CalculatorSelf.jsx";
import SupervisorRegistration from "@/views/ServicePins/SupervisorRegistration.jsx";

/**
 * CalculatorSelector Parent Page.
 * Provides outlet for self and supervisor calculations.
 */

export default function CalculatorSelector() {

    // service data context
    const { type, setType } = useContext(CalculatorContext);

    return (
        <>
            <div className="calculator-splash">
                <PageHeader title="Long Service Award and Service Pin Eligibility" singleLine gradient1 />
                {
                    !type && <>
                        <InfoEligibility />
                        <InfoCalculateService />
                        <InfoSupervisorEligibility />
                        <div className="grid">
                            <div className="col-6">
                                <AppButton onClick={() => setType('self')}>
                                    Self-Registration: Calculate My Eligibility
                                </AppButton>
                            </div>
                            <div className="col-6">
                                <AppButton info onClick={() => setType('supervisor')}>
                                    Supervisor Registrations: Register Employees
                                </AppButton>
                            </div>
                        </div>
                    </>
                }
                {
                    type === 'self' && <CalculatorSelf />
                }
                {
                    type === 'supervisor' && <SupervisorRegistration />
                }
            </div>
        </>
    );
}
