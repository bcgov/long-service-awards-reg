/*!
 * Data Display component
 * File: DataDisplay.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import React, {useContext, useEffect, useState} from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import formServices from "../../services/settings.services";
import {OptionsContext} from "@/AppContext.js";

/**
 * Data Display common display component to display submission data after input/submission
 * @param {object} props
 * @param {object} props.data object of data to display in data table
 * @param {string} props.identifier if object contains nested array, the string name identifier for that array
 * @param {string} props.category determines the formfield options that should be selected (options: contact, address, milestone, award, lsa, delegated)
 * @param {boolean} props.stacked boolean that determines if data table will be forced into permanent stacked layout, or will be responsive
 * @returns
 */

export default function DataDisplay(props) {

    const {identifier=null, data=null, category=null} = props || {};

  const formField = `${category}FormFields`;
  const columns = category ? formServices.get(formField) || [] : [];
  const { options } = useContext(OptionsContext);
  const { organizations=[] } = options || {};

  // lookup organization name
  const lookupOrg = (id) => {
      const found = (organizations || []).filter(org => org.id === id);
      return found.length > 0 ? found[0].name : null;
  }

  // column template to display organization data
  const orgTemplate = (item) =>{
      const {organization=null} = item || {};
      return <>{lookupOrg(organization)}</>
  };

  // set local display data
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    setDisplayData(identifier ? [...data[identifier]] : [...data]);
  }, []);

  return (
    <div>
      <div className="card">
        <DataTable
          value={displayData}
          breakpoint={props.stacked ? "100vw" : "1240px"}
        >
          {
              (columns || []).map((col) => {
                  const columnClass = `${col.header
                      .replace(/\s+/g, "-")
                      .replace(/\//g, "")
                      .toLowerCase()}-column`;
                  if (col.field === "organization") {
                      return (
                          <Column
                              key={col.field}
                              field={col.field}
                              header={col.header}
                              body={orgTemplate}
                              className={columnClass}
                          />
                      );
                  } else if (col.body) {
                      return (
                          <Column
                              key={col.field}
                              field={col.field}
                              header={col.header}
                              body={col.body}
                              className={columnClass}
                          />
                      );
                  } else {
                      return <Column key={col.field} field={col.field} header={col.header} className={columnClass} />;
                  }
              })
          }
        </DataTable>
      </div>
    </div>
  );
}
