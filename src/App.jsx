/*!
 * LSA Registration Application: app component
 * File: App.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import {useEffect, useMemo, useRef, useState} from "react";
import {Outlet, useNavigate} from "react-router-dom";
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
    getProvinces,
    isActive
} from "./services/api.routes.js";
import {BlockUI} from "primereact/blockui";
import Closed from "@/views/Closed";


/**
 * Main application. Loads user, registration, and messaging states prior to mounting main application.
 * @returns
 */

export default function App() {
    const toastProvider = useRef(null);

    // define registration active state
    const [active, setActive] = useState(false);

    // define user provider
    const [user, setUser] = useState(null);
    const userProvider = useMemo(() => ({ user, setUser }), [user, setUser]);

    // define registration data provider
    const [registration, setRegistration] = useState(null);
    const [step, setStep] = useState(null);
    const [completed, setCompleted] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    const registrationProvider = useMemo(
        () => ({
            step, setStep,
            completed, setCompleted,
            confirmed, setConfirmed,
            registration, setRegistration,
        }),
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

    const navigate = useNavigate();

    // check if registration is closed
    useEffect(() => {
        (
            async () => {
                setLoading(true);

                // set active state (flag if registration is closed)
                setActive(await isActive());

                const registration = await getSelfRegistration();

                // determine the type of registration
                const { service } = registration || {};
                const { confirmed } = service || {};
                setConfirmed(confirmed);
                setRegistration(registration);
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
                                    {
                                        active
                                            ? <div className="content">
                                                <Toast ref={toastProvider}/>
                                                <Outlet/>
                                                <BlockUI blocked={loading} fullScreen template={<ProgressSpinner/>}/>
                                            </div>
                                            : loading
                                                ? <BlockUI blocked={loading} fullScreen template={<ProgressSpinner/>}/>
                                                : <Closed />
                                    }
                                    {!!!String(active)}
                                </div>
                            </LoadingContext.Provider>
                        </ToastContext.Provider>
                    </RegistrationContext.Provider>
                </CalculatorContext.Provider>
            </AppContext.Provider>
        </OptionsContext.Provider>
    );
}
