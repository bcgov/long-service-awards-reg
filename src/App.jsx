/*!
 * LSA Registration Application (React)
 * File: api.services.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import {useEffect, useMemo, useRef, useState} from "react";
import { Outlet } from "react-router-dom";
import MenuBar from "./components/common/MenuBar.jsx";
import {Toast} from "primereact/toast";
import {ProgressSpinner} from "primereact/progressspinner";
import {
    RegistrationContext,
    ToastContext,
    AppContext,
    OptionsContext,
    LoadingContext,
    CalculatorContext} from "./AppContext.js";
import {
    getSelfRegistration,
    getUser,
    getOrganizations,
    getCommunities,
    getProvinces
} from "./services/api.routes.js";
import {BlockUI} from "primereact/blockui";


/**
 * Main application. Loads user, registration, and messaging states prior to mounting main application.
 * @returns
 */

export default function App() {
    const toastProvider = useRef(null);

    // define user provider
    const [user, setUser] = useState(null);
    const userProvider = useMemo(() => ({ user, setUser }), [user, setUser]);

    // define registration data provider
    const [registration, setRegistration] = useState(null);
    const [step, setStep] = useState(null);
    const [completed, setCompleted] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    const registrationProvider = useMemo(
        () => ({ step, setStep, completed, setCompleted,  confirmed, setConfirmed, registration, setRegistration }),
        [step, setStep, completed, setCompleted, confirmed, setConfirmed, registration, setRegistration]
    );

    // define service calculator data provider
    const [type, setType] = useState(null);
    const [service, setService] = useState(null);
    const [eligible, setEligible] = useState(false);
    const calculatorProvider = useMemo(
        () => ({ type, setType, service, setService, eligible, setEligible }),
        [type, setType, service, setService, eligible, setEligible]
    );

    // define options data provider
    const [options, setOptions] = useState(null);
    const optionsProvider = useMemo(() => ({ options, setOptions }), [options, setOptions]);

    // define loading status provider
    const [loading, setLoading] = useState(false);
    const loadingProvider = useMemo(() => ({ loading, setLoading }), [loading, setLoading]);

    useEffect(() => {
        // load either delegated or self registration
        (
            async () => {
                setLoading(true);
                setRegistration(await getSelfRegistration());
                setUser(await getUser());
                setOptions({
                    organizations: await getOrganizations(),
                    communities: await getCommunities(),
                    provinces: await getProvinces()
                });
            }
        )()
            .catch(console.error)
            .finally(() => { setLoading(false) });
    }, []);

    return (
        <OptionsContext.Provider value={optionsProvider}>
            <AppContext.Provider value={userProvider}>
                <CalculatorContext.Provider value={calculatorProvider}>
                    <RegistrationContext.Provider value={registrationProvider}>
                        <ToastContext.Provider value={toastProvider}>
                            <LoadingContext.Provider value={loadingProvider}>
                                <div className="container">
                                    <MenuBar />
                                    <div className="content">
                                        <Toast ref={toastProvider} />
                                        <Outlet />
                                        <BlockUI blocked={loading} fullScreen template={<ProgressSpinner />} />
                                    </div>
                                </div>
                            </LoadingContext.Provider>
                        </ToastContext.Provider>
                    </RegistrationContext.Provider>
                </CalculatorContext.Provider>
            </AppContext.Provider>
        </OptionsContext.Provider>
    );
}
