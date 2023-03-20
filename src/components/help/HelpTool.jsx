/*!
 * Years of Service CalculatorSelector (React)
 * File: ServiceCalculatorHelp.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import { useState } from "react";
import { Dialog } from "primereact/dialog";
import helpIndex from "./HelpIndex.jsx";
import {Button} from "primereact/button";

/**
 * Service CalculatorSelector component calculates years of service from given year fieldsets.
 * @returns
 */

export default function HelpTool({index}) {

    // get content by index
    const help = helpIndex.hasOwnProperty(index) ? helpIndex[index] : {};

    // help info controls
    const [display, setDisplay] = useState(false);
    const toggle = () => { setDisplay(!display) };

    return <>
        <Button
            className={'m-1 p-button-help'}
            label={'Help'}
            severity="help"
            icon="pi pi-question-circle"
            onClick={(e) => { e.preventDefault(); toggle() }}
        />
        <Dialog
            header={help.title}
            visible={display}
            style={{ width: "90vw" }}
            onHide={() => toggle()}
            className="information-only-panel"
        >
            {help.content}
        </Dialog>
    </>
}
