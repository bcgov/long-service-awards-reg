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
import "./index.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";

import Error from "./views/Error.jsx";

// Load view components
import ServicePins from "./views/ServicePins/ServicePins.jsx";
import SelfServicePins from "./views/ServicePins/SelfServicePins.jsx";
import SupervisorServicePins from "./views/ServicePins/SupervisorServicePins.jsx";
import Home from "./views/Home.jsx";
import Profile from "./views/LSA/Profile.jsx";
import Milestone from "./views/LSA/Milestone.jsx";
import Contact from "./views/LSA/Contact.jsx";
import Award from "./views/LSA/Award";
import Supervisor from "./views/LSA/Supervisor";
import Confirmation from "./views/LSA/Confirmation";
import SelfRegistration from "./views/LSA/SelfRegistration.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "service-pins",
        element: <ServicePins />,
        children: [
          { path: "supervisor", element: <SupervisorServicePins /> },
          { path: "self", element: <SelfServicePins /> },
        ]
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
