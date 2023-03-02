/*!
 * Main navigation bar component
 * File: MenuBar.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import { useContext } from "react";
import {AppContext} from "@/AppContext.js";
import {Button} from "primereact/button";
import {Menubar} from "primereact/menubar";
import logoURL from '@/assets/images/BCID_H_rgb_pos.png'

function MenuBar() {

    const { user } = useContext(AppContext);
    const logo = <img alt="logo" src={logoURL} height="60" className="mr-2" />;
    const items = [
        {
            label: 'Long Service Awards Registration',
            icon: 'pi pi-fw pi-home',
            url: '/'
        },
        {
            label:'About',
            icon:'pi pi-fw pi-info-circle',
            url: import.meta.env.LSA_APPS_MAIN_SITE_URL
        },
        {
            label:'Service Calculator',
            icon:'pi pi-fw pi-calculator',
            url: '/calculate'
        }
    ];
    const profile = <Button label={user ? user.idir : 'Loading'} icon="pi pi-user" />;

    return <Menubar
        model={items}
        start={logo}
        end={profile}
    />

}

export default MenuBar;
