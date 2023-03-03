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
import CalculatorSelector from "./views/Calculator/CalculatorSelector.jsx";
import CalculatorSelf from "./components/calculator/CalculatorSelf.jsx";
// import SupervisorRegistration from "./views/ServicePins/SupervisorRegistration.jsx";
import Home from "./views/Home.jsx";
import Profile from "./views/SelfRegistration/Profile.jsx";
import Milestone from "./views/SelfRegistration/Milestone.jsx";
import Contact from "./views/SelfRegistration/Contact.jsx";
import Award from "./views/SelfRegistration/Award";
import Supervisor from "./views/SelfRegistration/Supervisor";
import Confirmation from "./views/SelfRegistration/Confirmation";
import SelfRegistration from "./views/SelfRegistration/SelfRegistration.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "calculate",
        element: <CalculatorSelector />,
        children: [
          { path: "supervisor", element: <SelfRegistration /> },
          { path: "self", element: <CalculatorSelf /> },
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
