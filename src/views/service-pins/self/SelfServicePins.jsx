/*!
 * Self Registration View
 * File: Profile.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import { useContext, useEffect, useState } from "react";
import { useNavigate, Outlet, redirect } from "react-router-dom";
import {LoadingContext, RegistrationContext, ToastContext} from "@/AppContext.js";
import PageHeader from "@/components/common/PageHeader.jsx";
import formServices from "@/services/settings.services.js";
import {createSelfRegistration, getSelfRegistration, saveSelfRegistration} from "@/services/api.routes.js";
import {BlockUI} from "primereact/blockui";
import {Button} from "primereact/button";
import {Card} from "primereact/card";

/**
 * Panel Header for common component management in registration flow
 */

export default function SelfServicePins () {
    const toast = useContext(ToastContext);
    const navigate = useNavigate();
    const {
        step, setCompleted, confirmed, setConfirmed, setRegistration, registration
    } = useContext(RegistrationContext);
    const {loading, setLoading} = useContext(LoadingContext);
    const [lsaEligible, setLSAEligible] = useState(false);
    // LSA-505 Added flag which indicates that a user intends to continue with Pin instead of LSA 
    
    const [lsaEligibleIgnore, setLSAEligibleIgnore] = useState(false);
    console.log(registration);

    // get the registration steps template schema
    // get service pins form schema
    const steps =  formServices.get('service-pins');

    // set form status
    const _setStatus = (data) => {
        // set form status
        const { service } = data || {};
        const { confirmed, milestone } = service || {};
        // form confirmation status
        setConfirmed(confirmed);
        // check if LSA eligible
        setLSAEligible(milestone >= 25);
        // form completion status: validate every step except confirmation
        setCompleted(
            steps
                .filter(step => step.key !== 'confirmation')
                .every(step => step.validate(data))
        );
    }

    // create new registration
    const _handleCreateRegistration = async () => {
        try {
            setLoading(true);
            toast.current.show(formServices.lookup("messages", "create"));
            const [error, result] = await createSelfRegistration();
            toast.current.replace(formServices.lookup("messages", error || !result ? "createError" : "createSuccess"));
            if (!error && result) setRegistration(result);
            // navigate to initial registration step after creation
            redirect("service-pins/self/milestone");
            // }
        } catch (error) {
            toast.current.replace(formServices.lookup("messages", "saveError"));
        } finally {
            setLoading(false);
        }
    }

    // save registration data
    const _handleSaveRegistration = async (data) => {
        try {
            setLoading(true);
            console.log(data);
            const {service} = data || {};
            const {confirmed} = service || {};
            const [error, result] = await saveSelfRegistration(data);
            toast.current.replace(formServices.lookup("messages", error || !result ? "saveError" : "saveSuccess"));
            if (!error && result) {
                setRegistration(result);
                _setStatus(result)
                // show confirmation message if registration completed
                if (confirmed)
                    toast.current.replace(formServices.lookup("messages", "confirmRegistration"));
            }
            return result;
        } catch (error) {
            toast.current.replace(formServices.lookup("messages", "saveError"));
        } finally {
            setLoading(false);
        }
    };

    // Initialize registration form
    useEffect(() => {
        // check for existing registration
        getSelfRegistration().then( async (data) => {
            // create new registration if none exists
            if (!data && !loading) await _handleCreateRegistration().catch(console.error)
        }).catch(err => {
            console.error(err)
            toast.current.replace(formServices.lookup("messages", "createError"));
        });
    }, []);

    // set registration status
    useEffect(() => {
        _setStatus(registration)
        if (confirmed) navigate("/service-pins/self/confirmation");
        // if no step is provided, navigate to start of form
        if(!step) navigate("/service-pins/self/milestone");
    }, [registration]);

    // overlay template for blocked form panels
    const BlockUITemplateConfirmed = () => {
        return <Button
                onClick={()=>{navigate("/service-pins/self/confirmation")}}
                icon={'pi pi-lock'}
                label={'View Submitted Registration'}
            />
    }

    // overlay template for blocked form panels
    const BlockUITemplateLSA = () => {
        // LSA-505 Added additional button which allows user to continue with Pin instead of LSA
        const footer = (<>

                        <Button
                            onClick={()=>{navigate("/lsa/milestone")}}
                            icon={'pi pi-lock'}
                            label={'Register for Your Long Service Award'}
                        />
                   
                        {" "}
                  
                        <Button
                            onClick={async ()=>{
                                /* 
                                LSA-505 Add a note, and also opt out of ceremony if the registrant does not want to register for LSA
                                */
                                setLSAEligibleIgnore(true);
                                registration.service.ceremony_opt_out = true;
                                registration.notes = "Registrant has opted to not register for the LSA.";
                                const [error, result] = await saveSelfRegistration(registration);
                                if ( !error ) {

                                    navigate("/service-pins/self/profile");
                                    setRegistration(result);
                                }
                                else {
                                    // Handle some error here.
                                }
                            }}
                            icon={'pi pi-lock'}
                            label={'Register for Service Pin'}
                        />
                    
                </>
        );
        return <>
                <Card title="LSA Confirmation" footer={footer}>

                    Please confirm whether you want to register for your Long Service Award, or continue with your Service Pin registration.
                </Card>
            </>
    }

    return <>
        <PageHeader title="Service Pin Registration" subtitle={step && step.description || ''}/>
        <BlockUI blocked={lsaEligible && !confirmed && !lsaEligibleIgnore} template={BlockUITemplateLSA}>
            <BlockUI blocked={confirmed && step && step.key !== "confirmation"} template={BlockUITemplateConfirmed}>
                <Outlet context={[_handleSaveRegistration]}/>
            </BlockUI>
        </BlockUI>
    </>
}