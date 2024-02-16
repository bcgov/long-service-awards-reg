/*!
 * Info Panel: PECSF Donations
 * File: InfoPecsf.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import { useState } from "react";
import { Panel } from "primereact/panel";
import { Dialog } from "primereact/dialog";
import Capital from "./regionalpools/Capital";
import Cariboo from "./regionalpools/Cariboo";
import FraserFortGeorge from "./regionalpools/FraserFortGeorge";
import FraserValley from "./regionalpools/FraserValley";
import MetroVancouver from "./regionalpools/MetroVancouver";
import ThompsonNicola from "./regionalpools/ThompsonNicola";

/**
 * Info Panel: PECSF Donations
 * Regional Pool Data pulled from https://pecsf.gov.bc.ca/donate-now/create
 * @returns {JSX.Element}
 */

export default function InfoPecsf() {
  const [showDialog, setShowDialog] = useState(null);
  const [region, setRegion] = useState("Capital");

  const renderRegion = (region) => {
    switch (region) {
      case "Capital":
        return <Capital />;
      case "Cariboo":
        return <Cariboo />;
      case "Fraser Valley":
        return <FraserFortGeorge />;
      case "Fraser-Fort George":
        return <FraserValley />;
      case "Metro Vancouver":
        return <MetroVancouver />;
      case "Thompson-Nicola":
        return <ThompsonNicola />;
      default:
        return <></>;
    }
  };

  const openDialog = (regionName) => {
    setRegion(regionName);
    setShowDialog(true);
  };

  return (
    <>
      <Dialog
        visible={showDialog}
        onHide={() => setShowDialog(null)}
        header={`Regional Charity Pool - ${region}`}
        position="center"
        closable
        maximizable
        modal
        breakpoints={{ "960px": "80vw" }}
        style={{ width: "70vw" }}
      >
        {renderRegion(region)}
      </Dialog>
      <Panel
        className={"mb-3"}
        header="About PECSF Donations"
        toggleable
        collapsed={true}
      >
        <div className="information-only-panel">
          <p>
            In lieu of receiving a Long Service Award, you may opt to make a
            charitable donation via Provincial Employees Community Services Fund
            (PECSF).{" "}
            <span className="font-weight-bold">
              Please Note: charitable tax receipts are not issued for LSA
              donations.
            </span>
          </p>

          <p>You may choose one of two donation options:</p>
          <ol>
            <li>
              to donate to one of the{" "}
              <span className="font-weight-bold">
                PECSF Regional Pool Funds
              </span>{" "}
              Supported pools of charities in your region (see information
              section below), OR,
            </li>
            <li>
              to donate to a registered charitable organization (maximum of two)
              of your choice.
            </li>
          </ol>
        </div>
        <div className="information-only-panel">
          <h4>PECSF Regional Pool Funds</h4>
          <p>
            {" "}
            If you select the regional Fund Supported Pool option, charities and
            distribution amounts are pre-determined and cannot be adjusted,
            removed, or substituted.  Visit the PECSF webpages to learn more
            about the{" "}
            <a href="https://www2.gov.bc.ca/gov/content/careers-myhr/about-the-bc-public-service/corporate-social-responsibility/pecsf/charity">
              Fund Supported Pool
            </a>{" "}
            option.
          </p>
          <p>You may choose one of six PECSF regional Fund Supported Pools:</p>
          <ol>
            <li>
              Capital Regional Charity Pool{" "}
              <sup>
                {" "}
                <i
                  className="pi pi-info-circle"
                  onClick={() => openDialog("Capital")}
                ></i>
              </sup>
            </li>
            <li>
              Cariboo Regional Charity Pool{" "}
              <sup>
                {" "}
                <i
                  className="pi pi-info-circle"
                  onClick={() => openDialog("Cariboo")}
                ></i>
              </sup>
            </li>
            <li>
              Fraser Valley Regional Charity Pool{" "}
              <sup>
                {" "}
                <i
                  className="pi pi-info-circle"
                  onClick={() => openDialog("Fraser Valley")}
                ></i>
              </sup>
            </li>
            <li>
              Fraser-Fort George Regional Charity Pool{" "}
              <sup>
                {" "}
                <i
                  className="pi pi-info-circle"
                  onClick={() => openDialog("Fraser-Fort George")}
                ></i>
              </sup>
            </li>
            <li>
              Metro Vancouver Regional Charity Pool{" "}
              <sup>
                {" "}
                <i
                  className="pi pi-info-circle"
                  onClick={() => openDialog("Metro Vancouver")}
                ></i>
              </sup>
            </li>
            <li>
              Thompson-Nicola Regional Charity Pool{" "}
              <sup>
                {" "}
                <i
                  className="pi pi-info-circle"
                  onClick={() => openDialog("Thompson-Nicola")}
                ></i>
              </sup>
            </li>
          </ol>
          <a
            href="https://longserviceawards.gww.gov.bc.ca/wp-content/uploads/2024/02/Current-PECSF-Fund-Supported-Pools-6-Regions-1.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            About the PECSF Fund Supported Pools - PDF
          </a>
        </div>
      </Panel>
    </>
  );
}
