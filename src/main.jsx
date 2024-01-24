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
import LSAProfile from "@/views/lsa/LSAProfile.jsx";
import LSAMilestone from "@/views/lsa/LSAMilestone.jsx";
import LSAContact from "@/views/lsa/LSAContact.jsx";
import LSAAward from "@/views/lsa/LSAAward.jsx";
import LSASupervisor from "@/views/lsa/LSASupervisor";
import LSAConfirmation from "@/views/lsa/LSAConfirmation";
import SelfServicePins from "@/views/service-pins/self/SelfServicePins.jsx";
import LSASelfRegistration from "@/views/lsa/LSASelfRegistration.jsx";
import ServicePinsMilestone from "@/views/service-pins/self/ServicePinsMilestone.jsx";
import ServicePinsProfile from "@/views/service-pins/self/ServicePinsProfile.jsx";
import ServicePinsContact from "@/views/service-pins/self/ServicePinsContact.jsx";
import ServicePinsSupervisor from "@/views/service-pins/self/ServicePinsSupervisor.jsx";
import ServicePinsConfirmation from "@/views/service-pins/self/ServicePinsConfirmation.jsx";
import Closed from "@/views/Closed";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: <Error />,
      children: [
        { index: true, element: <Home /> },
        { path: "service-pins/delegated", element: <DelegatedServicePins /> },
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
          path: "lsa",
          element: <LSASelfRegistration />,
          children: [
            { path: "milestone", element: <LSAMilestone /> },
            { path: "profile", element: <LSAProfile /> },
            { path: "contact", element: <LSAContact /> },
            { path: "award", element: <LSAAward /> },
            { path: "supervisor", element: <LSASupervisor /> },
            { path: "confirmation", element: <LSAConfirmation /> },
          ],
        },
        { path: "closed", element: <Closed /> },
      ],
    },
  ],
  { basename: import.meta.env.LSA_APPS_REGISTRATION_BASE }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
