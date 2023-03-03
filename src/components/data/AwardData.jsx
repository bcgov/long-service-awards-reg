/*!
 * Self Registration: Award Data
 * File: AwardData.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import {useContext} from "react";
import {RegistrationContext} from "@/AppContext.js";
import {Panel} from "primereact/panel";

/**
 * Recipient Profile Details
 */

export default function AwardData() {

    const { registration } = useContext(RegistrationContext);
    const {service} = registration || {};
    const { awards } = service || {};
    const { award, selections } = awards || {};
    const { options } = award || {};
    console.log(registration)

    return <div className={'container'}>
        <div className={'grid'}>
            <div className={'col-6'}>Name</div>
            <div className={'col-6'}>{award && award.label}</div>
            <div className={'col-6'}>Description</div>
            <div className={'col-6'}>{award && award.description}</div>
            {
                (options || []).length > 0 && <div className={'col-12'}>
                    <Panel header={'Award Options'} toggleable>
                        <div className={'container'}>
                            {
                                (options || []).map(({id, customizable}) => {
                                    const {pecsf_charity, custom_value, award_option} = selections
                                        .find(selection => {
                                            // match award option ID to selection ID
                                            const {award_option} = selection || {};
                                            return award_option.id === id;
                                        }) || {};
                                    const {value, label, type, description} = award_option || {};
                                    return <div className={'grid'} key={`award-option-${id}`}>
                                        {
                                            pecsf_charity && <>
                                                <div className={'col-6'}>{label}</div>
                                                    <div className={'col-6'}>
                                                        {pecsf_charity.label} ({pecsf_charity.region})
                                                    </div>
                                                </>
                                        }
                                        {
                                            !pecsf_charity && !customizable && <>
                                                <div className={'col-6'}>{label}</div>
                                                <div className={'col-6'}>{description}</div>

                                            </>
                                        }
                                        {
                                            !pecsf_charity && customizable && <>
                                                <div className={'col-6'}>{description}</div>
                                                <div className={'col-6'}>{custom_value}</div>
                                            </>
                                        }
                                    </div>
                                })
                            }

                        </div>
                    </Panel>
                </div>
            }
        </div>
    </div>
}
