/*!
 * Registration Closed view component
 * File: Closed.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import PageHeader from "../components/common/PageHeader";
import { Panel } from "primereact/panel";
import InfoEligibility from "@/components/info/InfoEligibility.jsx";
import { useEffect } from "react";
import {
  getCommunities,
  getOrganizations,
  getProvinces,
  getSelfRegistration,
  getUser,
  isActive,
} from "@/services/api.routes.js";

/**
 * Registration Closed Page.
 */

export default function Closed() {
  return (
    <div className="container">
      <PageHeader title="Registration is Currently Closed" subtitle="">
        <b>
          Registration is opening soon. Please ask your ministry recognition
          contact for an update or check back later.
        </b>
      </PageHeader>

      <InfoEligibility />
      <Panel
        className={"mb-3"}
        header="Celebrating Your Service: Long Service Awards"
      >
        <p className="m-2">
          The Long Service Awards celebrate the dedication and commitment of
          employees with 25, 30, 35, 40, 45 and 50 year careers in the BC Public
          Service. Long Service Award ceremonies are prestigious and memorable
          events held in Victoria this fall.
        </p>
      </Panel>
      <Panel header="Service Pin Registration">
        <p className="m-2">
          If you’ve reached a career milestone of at least 5, 10, 15 or 20 years
          with the BC Public Service, register now to receive a commemorative
          service pin. Note that Long Service Award recipients automatically
          receive a corresponding service pin and do not need to register
          separately.
        </p>
      </Panel>
    </div>
  );
}
