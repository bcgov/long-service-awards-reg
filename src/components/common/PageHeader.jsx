/*!
 * Page header component
 * File: PageHeader.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import { Card } from "primereact/card";

/**
 * Page Header custom component card block
 * @param {object} props
 * @param {string} props.title the title for the page header
 * @param {string} props.subtitle the subtitle for the page header
 * @param {string} props.header the header for the page header
 * @param {string} props.footer the footer for the page header
 * @param {string} props.children the content of the page header
 * @returns
 */

export default function PageHeader(props) {

    return <Card
        className={'page-header mb-3'}
        title={props.title}
        subTitle={props.subtitle}
        header={props.header}
        footer={props.footer}
    >
        {props.children}
    </Card>
}
