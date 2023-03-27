/*!
 * Form Data display component
 * File: FormData.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import {Panel} from "primereact/panel";
import formServices from "@/services/settings.services.js";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {RegistrationContext} from "@/AppContext";

/**
 * Data Display common display component to display user data after input/submission
 *
 * @param {String} form
 * @param {String} id
 * @param children
 * @returns {JSX.Element}
 */

export default function FormData({form, id, children}) {

    const navigate = useNavigate();
    const { confirmed } = useContext(RegistrationContext);
    const {label, route} = formServices.copy(form, id);

    return <Panel toggleable className={'mb-3'} header={<div className="flex align-items-stretch flex-wrap">
        <div
            className="flex align-items-center justify-content-center">
            <Button
                disabled={confirmed}
                onClick={()=>{navigate(route)}}
                className={'p-button-outlined'}
                label={'Edit'}
                icon={'pi pi-pencil'}
            />
        </div>
        <div className="ml-5 flex align-items-center justify-content-center">{label}</div>
    </div>}>
        {children}
    </Panel>;
}
