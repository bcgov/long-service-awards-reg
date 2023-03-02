/*!
 * Form for registration process step component
 * File: FormStep.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import {useContext, useEffect, useMemo, useState} from "react";
import { useNavigate } from "react-router-dom";
import {LoadingContext, RegistrationContext} from "@/AppContext.js";
import {useOutletContext} from "react-router";
import {FormProvider, useForm } from "react-hook-form";
import FormSubmit from "@/components/common/FormSubmit.jsx";
import {BlockUI} from "primereact/blockui";
import {Button} from "primereact/button";
import {removeNull} from "@/services/validation.services.js";

/**
 * FormStep component
 * @param {Object} previous
 * @param {Object} current
 * @param {Object} next
 * @param children
 * @returns {JSX.Element}
 */

export default function FormStep({previous=null, current, next=null, children}) {

    const navigate = useNavigate();
    // get context / hooks
    const { loading } = useContext(LoadingContext);
    const [saveRegistration] = useOutletContext();
    const { setStep, confirmed, registration } = useContext(RegistrationContext);
    const defaultFormValues = current && current.default;

    // destructure form methods (react-hook-form)
    const methods = useForm({
        defaultValues: useMemo(() => {
            return {...defaultFormValues, ...removeNull(registration)};
        }, [registration]),
    });

    const {
        formState: { isValid, isDirty },
        handleSubmit,
        reset,
        watch,
    } = methods;

    const [previousComplete, setPreviousComplete] = useState(!previous);
    const [formComplete, setFormComplete] = useState(false);
    const formCompleteStatus = watch();

    // set current step and validate previous step
    useEffect(() => {
        setStep(current);
    }, []);

    // update default values
    // - overwrite defaults with current registration data
    useEffect(() => {
        reset({...defaultFormValues, ...removeNull(registration)})
        if (previous) setPreviousComplete(previous.validate(registration));
    }, [registration]);

    // set form to not complete (ready for submission)
    useEffect(() => {
        setFormComplete(false);
    }, [formCompleteStatus]);

    // save current form data
    const saveData = async (data) => {
        const defaultData = Object.assign({}, defaultFormValues)
        const registrationData = Object.assign({}, removeNull(registration));
        const submissionData = Object.assign({}, data);
        const result = await saveRegistration({...defaultData, ...registrationData, ...submissionData});
        if (result) setFormComplete(true);
    };

    // submit form data for next step
    const submitData = async (data) => {
        await saveData(data);
        if (next) navigate(next.route);
    };

    // overlay template for blocked form panels
    const BlockUITemplate = () => {
        return confirmed
            ? <>Registration Submitted</>
            : <Button
                onClick={()=>{navigate(previous.route)}}
                icon={'pi pi-lock'}
                label={'Complete the Previous Step'}
            />
    }

    return <FormProvider {...methods}>
        <form>
            <BlockUI
                blocked={!loading && (confirmed || !previousComplete)}
                template={<BlockUITemplate />}
            >
                {children}
                <FormSubmit
                    save={handleSubmit(saveData)}
                    submit={handleSubmit(submitData)}
                    disabled={!next || !isValid || (isDirty && !formComplete)}
                    confirmation={!next}
                />
            </BlockUI>
        </form>
    </FormProvider>;
}
