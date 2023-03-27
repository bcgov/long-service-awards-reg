/*!
 * Main navigation bar component
 * File: MenuBar.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import { useContext } from "react";
import {AppContext, RegistrationContext, ToastContext} from "@/AppContext.js";
import {Button} from "primereact/button";
import {Menubar} from "primereact/menubar";
import logoURL from '@/assets/images/BCID_H_rgb_pos.png'
// import {removeSelfRegistration} from "@/services/api.routes.js";
// import {useNavigate} from "react-router-dom";
// import formServices from "@/services/settings.services.js";

function MenuBar() {

    const { user } = useContext(AppContext);
    // const { setRegistration } = useContext(RegistrationContext);
    // const toast = useContext(ToastContext);
    // const navigate = useNavigate();
    const logo = <img alt="logo" src={logoURL} height="60" className="mr-2" />;
    const items = [
        {
            label: 'Long Service Awards / Service Pins Registration',
            icon: 'pi pi-fw pi-home',
            url: import.meta.env.LSA_APPS_REGISTRATION_URL
        },
        {
            label:'About',
            icon:'pi pi-fw pi-info-circle',
            url: import.meta.env.LSA_APPS_MAIN_SITE_URL
        }
    ];
    const profile = <>
        <Button label={user ? user.idir : 'Loading'} icon="pi pi-user" />
        {/*{*/}
        {/*    user && ['super-administrator', 'administrator'].includes(user.role) &&*/}
        {/*    <Button*/}
        {/*        className={'ml-1'}*/}
        {/*        severity={'danger'}*/}
        {/*        label={'Reset'}*/}
        {/*        icon="pi pi-sync"*/}
        {/*        onClick={() => {*/}
        {/*            removeSelfRegistration()*/}
        {/*                .then(() => {*/}
        {/*                    setRegistration(null);*/}
        {/*                    navigate('/')*/}
        {/*                    window.location.reload()*/}
        {/*                })*/}
        {/*                .catch(console.error)*/}
        {/*                .finally(() => {*/}
        {/*                    toast.current.show(formServices.lookup("messages", "delete"));*/}
        {/*                })*/}
        {/*        }}*/}
        {/*    />}*/}
    </>;

    return <Menubar model={items} start={logo} end={profile}/>

}

export default MenuBar;
