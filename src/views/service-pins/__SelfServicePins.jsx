/*!
 * Service Pins: Self Registration View
 * File: Profile.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import React, {useContext, useEffect, useMemo, useState} from "react";
import {LoadingContext, RegistrationContext, ToastContext} from "@/AppContext.js";
import formServices from "@/services/settings.services.js";
import {createSelfRegistration, getSelfRegistration, saveSelfRegistration} from "@/services/api.routes.js";
import {BlockUI} from "primereact/blockui";
import MilestoneInput from "@/components/fieldsets/MilestoneInput.jsx";
import PersonalContactInput from "@/components/fieldsets/PersonalContactInput";
import ProfileInput from "@/components/fieldsets/ProfileInput";
import SupervisorContactInput from "@/components/fieldsets/SupervisorContactInput";
import ConfirmationInput from "@/components/fieldsets/ConfirmationInput";
import FormSubmit from "@/components/common/FormSubmit.jsx";
import {FormProvider, useForm, useWatch} from "react-hook-form";
import {Button} from "primereact/button";
import {removeNull} from "@/services/validation.services.js";
import PageHeader from "@/components/common/PageHeader.jsx";
import OfficeContactInput from "@/components/fieldsets/OfficeContactInput";
import InfoServicePinDeclaration from "@/components/info/InfoServicePinDeclaration.jsx";

/**
 * Panel Header for common component management in registration flow
 */

export default function SelfServicePins() {
    const toast = useContext(ToastContext);
    const {
        completed,
        setCompleted,
        setRegistration,
        registration,
        confirmed,
        setConfirmed } = useContext(RegistrationContext);
    const {loading, setLoading} = useContext(LoadingContext);

    // get service pins form schema
    const steps =  [
        formServices.copy('registration_steps', 'milestone'),
        formServices.copy('registration_steps', 'profile'),
        formServices.copy('registration_steps', 'contact'),
        formServices.copy('registration_steps', 'supervisor'),
        formServices.copy('registration_steps', 'confirmation')
    ];

    // destructure form methods (react-hook-form)
    const methods = useForm({
        defaultValues: useMemo(() => {
            console.log(removeNull(registration))
            return removeNull(registration);
        }, [registration]),
    });

    const {
        formState: { isValid, isDirty },
        handleSubmit,
        control,
        reset,
        watch,
    } = methods;

    const [validStep, setValidStep] = useState(false);
    const {service} = registration || {};
    const {cycle} = service || {};

    // monitor item size
    const currentMilestone = useWatch({control, name: "service.milestone",});

    // set form status
    const _setStatus = (data) => {
        // set form status
        const { service } = data || {};
        const { confirmed } = service || {};
        // form confirmation status
        setConfirmed(confirmed);
        // form completion status: validate schema
        // setCompleted(schema.validate(data));
    }

    // update default values
    // - overwrite defaults with current registration data
    useEffect(() => {
        reset(removeNull(registration))
        // setValidStep(schema.validate(registration));
    }, [registration]);

    // create new registration
    const _handleCreateRegistration = async () => {
        try {
            setLoading(true);
            toast.current.show(formServices.lookup("messages", "create"));
            const [error, result] = await createSelfRegistration();
            toast.current.replace(formServices.lookup("messages", error || !result ? "createError" : "createSuccess"));
            if (!error && result) setRegistration(result);
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
            console.log(data)
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


    // overlay template for blocked form panels
    const BlockUITemplate = () => {
        return confirmed
            ? <>Registration Submitted</>
            : <Button icon={'pi pi-lock'} label={'Form Locked'} />
    }

    return <FormProvider {...methods}>
        <PageHeader title="Service Pin Registration" />
        !!!{currentMilestone}
        <form>
            <BlockUI blocked={loading || completed} template={<BlockUITemplate />}>
                <MilestoneInput type={'service-pins'} />
                <BlockUI
                    blocked={currentMilestone >= 25 }
                    template={<BlockUITemplate />}
                >
                    <ProfileInput />
                    <PersonalContactInput />
                    <OfficeContactInput />
                    <SupervisorContactInput />
                    <ConfirmationInput>
                        <InfoServicePinDeclaration year={cycle} />
                    </ConfirmationInput>
                    <FormSubmit
                        submit={handleSubmit(_handleSaveRegistration)}
                        disabled={!validStep || !isValid || (isDirty && !formComplete)}
                        confirmation={true}
                    />
                </BlockUI>
            </BlockUI>
        </form>
    </FormProvider>
}