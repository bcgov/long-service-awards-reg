/*!
 * Delegated Registration: Employee Registration Data
 * File: EmployeeData.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import {Fieldset} from "primereact/fieldset";

/**
 * Employee Registration Details
 */

export default function EmployeeData({data}) {

    const {contact, service, organization, employee_number, created_at} = data || {};
    const { first_name, last_name } = contact || {};
    const {milestone, qualifying_year, service_years } = service || {};
    const createdAt = new Date(created_at);

    return <Fieldset className={'mb-3'} legend={<>{first_name} {last_name}</>}>
        <div className={'container'}>
            <div className={'grid'}>
                <div className={'col-6'}>First Name</div>
                <div className={'col-6'}>{first_name}</div>
                <div className={'col-6'}>Last Name</div>
                <div className={'col-6'}>{last_name}</div>
                <div className={'col-6'}>Employment Number</div>
                <div className={'col-6'}>{employee_number}</div>
                <div className={'col-6'}>Organization</div>
                <div className={'col-6'}>
                    {organization && organization.name} ({organization && organization.abbreviation})
                </div>
                <div className={'col-6'}>Current Years of Service</div>
                <div className={'col-6'}>{service_years}</div>
                <div className={'col-6'}>Current Milestone</div>
                <div className={'col-6'}>{milestone}</div>
                <div className={'col-6'}>Milestone Qualifying Year</div>
                <div className={'col-6'}>{qualifying_year}</div>
                <div className={'col-6'}>Current Milestone</div>
                <div className={'col-6'}>{milestone}</div>
                <div className={'col-6'}>Created</div>
                <div className={'col-6'}>{createdAt.toLocaleString()}</div>
            </div>
        </div>
    </Fieldset>
}
