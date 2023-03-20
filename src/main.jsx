/*!
 * Main application root.
 * File: main.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "./index.css";

import Error from "./views/Error.jsx";

// Load view components
import DelegatedServicePins from "./views/service-pins/delegated/DelegatedServicePins.jsx";
import Home from "./views/Home.jsx";
import Profile from "./views/lsa/Profile.jsx";
import Milestone from "./views/lsa/Milestone.jsx";
import Contact from "./views/lsa/Contact.jsx";
import Award from "./views/lsa/Award";
import Supervisor from "./views/lsa/Supervisor";
import Confirmation from "./views/lsa/Confirmation";
import ServicePins from "./views/service-pins/ServicePins.jsx";
import SelfServicePins from "./views/service-pins/self/SelfServicePins.jsx";
import SelfRegistration from "./views/lsa/SelfRegistration.jsx";
import ServicePinsMilestone from "@/views/service-pins/self/ServicePinsMilestone.jsx";
import ServicePinsProfile from "@/views/service-pins/self/ServicePinsProfile.jsx";
import ServicePinsContact from "@/views/service-pins/self/ServicePinsContact.jsx";
import ServicePinsSupervisor from "@/views/service-pins/self/ServicePinsSupervisor.jsx";
import ServicePinsConfirmation from "@/views/service-pins/self/ServicePinsConfirmation.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "service-pins",  element: <ServicePins /> },
      { path: "service-pins/supervisor", element: <DelegatedServicePins /> },
      {
        path: "service-pins/self",
        element: <SelfServicePins />,
        children: [
          { path: "milestone", element: <ServicePinsMilestone /> },
          { path: "profile", element: <ServicePinsProfile /> },
          { path: "contact", element: <ServicePinsContact /> },
          { path: "supervisor", element: <ServicePinsSupervisor /> },
          { path: "confirmation", element: <ServicePinsConfirmation /> },
        ],
      },
      {
        path: "register",
        element: <SelfRegistration />,
        children: [
          { path: "milestone", element: <Milestone /> },
          { path: "profile", element: <Profile /> },
          { path: "contact", element: <Contact /> },
          { path: "award", element: <Award /> },
          { path: "supervisor", element: <Supervisor /> },
          { path: "confirmation", element: <Confirmation /> },
        ],
      },
    ],
  },
],{ basename: import.meta.env.LSA_APPS_REGISTRATION_BASE });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
