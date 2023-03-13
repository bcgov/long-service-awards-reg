/*!
 * Submit Form Button component
 * File: SubmitStep.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import { Button } from "primereact/button";
import {useFormContext, useWatch} from "react-hook-form";
import {Panel} from "primereact/panel";
import {useContext} from "react";
import {RegistrationContext} from "@/AppContext.js";

/**
 * common button component to submit registration step
 * @param {object} props
 * @returns
 */

export default function FormSubmit({submit, save, disabled, confirmation=false}) {
    const { formState: {errors}, control } = useFormContext();
    const { completed, confirmed } = useContext(RegistrationContext);
    const confirmSelected = useWatch({control, name: 'service.confirmed'});
    const header = confirmation
        ? "Submit Your Registration"
        : "Save Current Form / Continue to Next Step";

    const icon = confirmation ? 'pi pi-upload' : 'pi pi-save';

    return <Panel icons={<i className={icon} />} header={header}>
        <div className="container m-3">
            {
                Object.keys(errors).length > 0
                && <p className={'error'}>Form has errors. Please update and submit again.</p>
            }
            <div className={'grid'}>
                {
                    confirmation
                        ? <div className={'col-12'}>
                            <Button
                                className={'p-button-success w-full flex justify-content-center'}
                                icon={'p-arrow-right'}
                                type="submit"
                                onClick={submit}
                                disabled={!confirmSelected || !completed || confirmed}
                            >
                                {confirmed ? 'Registration Submitted' : 'Submit Registration'}
                            </Button>
                        </div>
                        :<>
                            <div className={'col-6'}>
                                <Button
                                    className={'p-button-success w-full flex justify-content-center'}
                                    onClick={save}>
                                    Save
                                </Button>
                            </div>
                            <div className={'col-6'}>
                                <Button
                                    className={'w-full flex justify-content-center'}
                                    type="submit"
                                    onClick={submit}
                                    disabled={disabled}
                                >
                                    {disabled ? 'Save before Continuing' : 'Continue'}
                                </Button>
                            </div>
                        </>
                }
            </div>
        </div>
    </Panel>;
}
