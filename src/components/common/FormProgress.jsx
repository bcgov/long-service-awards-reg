/*!
 * Form Progress component
 * File: FormProgress.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import React, {useContext } from "react";
import { Steps } from "primereact/steps";
import {Panel} from "primereact/panel";
import { useNavigate } from "react-router-dom";
import formServices from "@/services/settings.services";
import {RegistrationContext} from "@/AppContext.js";
import {Tag} from "primereact/tag";

/**
 * Data Display common display component to display user data after input/submission
 * @returns {JSX.Element}
 */

export default function FormProgress({control}) {
    const navigate = useNavigate();
    // get the registration steps template schema
    const steps = formServices.get("registration_steps");
    // get current registration step
    const { step, registration, confirmed } = useContext(RegistrationContext);
    const { label, seq } = step || {};

    const StepTemplate = ({label, validate}) => {
        // check if form step is completed
        return validate(registration)
            ? <Tag className={'m-1'} icon="pi pi-check-circle" severity="success" value={label}></Tag>
            : <Tag className={'m-1'} icon="pi pi-chevron-circle-right" severity="info" value={label}></Tag>
    }

    return <Panel className={"steps mb-3"} header={`Registration Steps: ${label}`} toggleable>
        <Steps
            model={steps.map(({label, route, validate}) => ({
                className: validate(registration) ? 'step-completed' : 'step-incomplete',
                icon: <StepTemplate label={label} validate={validate} />,
                command: confirmed ? ()=>{} : ()=>{navigate(route)}
            }))}
            activeIndex={seq}
            readOnly={confirmed}
        />
    </Panel>
}
