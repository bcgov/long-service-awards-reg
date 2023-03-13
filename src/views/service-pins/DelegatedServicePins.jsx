/*!
 * Service Pins: Supervisor Registration
 * File: SupervisorRegistration.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import React, {useState, useContext, useEffect} from "react";
import {useForm, FormProvider, useFormContext, useFieldArray} from "react-hook-form";
import { RegistrationContext, ToastContext } from "@/AppContext.js";
import formServices from "@/services/settings.services.js";
import InfoToolTip from "@/components/common/InfoToolTip.jsx";
import DataDisplay from "@/components/common/DataDisplay.jsx";
import AddressInput from "@/components/fieldsets/AddressInput.jsx";
import {saveDelegatedRegistrations} from "@/services/api.routes.js";
import {ConfirmDialog} from "primereact/confirmdialog";
import InfoSupervisorEligibility from "@/components/info/InfoSupervisorEligibility.jsx";
import InfoSupervisorRegistrations from "@/components/info/InfoSupervisorRegistrations.jsx";
import SupervisorContactInput from "@/components/fieldsets/SupervisorContactInput.jsx";
import ProfileInput from "@/components/fieldsets/ProfileInput.jsx";
import MilestoneInput from "@/components/fieldsets/MilestoneInput.jsx";
import {confirmPopup, ConfirmPopup} from "primereact/confirmpopup";
import {Panel} from "primereact/panel";
import {Button} from "primereact/button";

/**
 * Delegated Calculator Page. Allows users to submit delegated applications for LSA/Service Pin registration.
 */

export default function DelegatedServicePins() {
  const { setRegistration } = useContext(RegistrationContext);

  // const defaultValues = {
  //   supervisor: {
  //     first_name: "",
  //     last_name: "",
  //     office_email: "",
  //     office_phone: "",
  //     office_address: {
  //       pobox: "",
  //       street1: "",
  //       street2: "",
  //       postal_code: "",
  //       community: "",
  //       province: "",
  //       country: "",
  //     },
  //   },
  //   employees: [
  //     {
  //       first_name: "",
  //       last_name: "",
  //       office_email: "",
  //       employee_number: "",
  //       organization: "",
  //       service_years: "",
  //       milestone: "",
  //       qualifying_year: "",
  //       prior_milestones: "",
  //     },
  //   ],
  // };

  const defaultValues = {
    supervisor: {
      first_name: "Spencer",
      last_name: "Rose",
      office_email: "example@gov.bc.ca",
      office_phone: "777 777 7777",
      office_address: {
        pobox: "111",
        street1: "563 Superior Street",
        street2: "",
        postal_code: "V5T 1E6",
        community: "Victoria",
        province: "British Columbia",
        country: "Canada",
      },
    },
    employees: [
      {
        first_name: "Bryson",
        last_name: "Best",
        office_email: "example@gov.bc.ca",
        employee_number: 496748,
        organization: 4,
        service_years: "30",
        milestone: "25",
        qualifying_year: 2022,
        prior_milestones: [5, 10],
      },
    ],
  };

  const methods = useForm({ defaultValues });
  const [employeeData, setEmployeeData] = useState([]);
  const [submissionData, setSubmissionData] = useState({});
  const [formComplete, setFormComplete] = useState(false);
  const [formChanged, setFormChanged] = useState(true);

  const toast = useContext(ToastContext);
  const { control, reset } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: "employees" });
  const [employees, setEmployees] = useState({});
  const [employeeCount, setEmployeeCount] = useState(1);
  const [resetList, setResetList] = useState(false);

  const { formState: { errors }, watch, handleSubmit } = methods;
  watch(() => setFormChanged(true));

  /**
   * Reset confirmation form
   * */

  const acceptReset = () => {
    toast.current.show({
      severity: "info",
      summary: "Confirmed",
      detail: "FormStep Reset",
      life: 2000,
    });
    setEmployeeCount(1);
    setResetList(!resetList);
  };

  /**
   * Confirm form data reset
   * */

  const confirmReset = (event) => {
    confirmPopup({
      target: event.currentTarget,
      message:
          "Are you sure you want to reset the form? This will reset all fields.",
      icon: "pi pi-exclamation-triangle",
      accept: acceptReset,
      reject: null,
    });
  };

  /**
   * Reset form
   * */

  useEffect(() => {
    reset({
      employees: [
        {
          first_name: "Bryson",
          last_name: "Best",
          office_email: "example@gov.bc.ca",
          employee_number: 123456,
          organization: 6,
          service_years: 30,
          milestone: 25,
          qualifying_year: 2022,
          prior_milestones: [5, 10, 15],
        },
      ],
    });
    // reset({
    //   employees: [
    //     {
    //       first_name: "",
    //       last_name: "",
    //       office_email: "",
    //       employee_number: "",
    //       organization: null,
    //       service_years: "",
    //       milestone: "",
    //       qualifying_year: "",
    //       prior_milestones: "",
    //     },
    //   ],
    // });
  }, [resetList]);



  // confirm submission before sending
  const confirm = (data) => {
    setFormComplete(true);
    setFormChanged(false);
    const finalData = Object.assign({}, data);
    setSubmissionData(finalData);
    const employeeData = [...data.employees];
    employeeData.map((each, index) => {
      each["employee"] = each["first_name"] ? `${index + 1}` : "";
    });
    setEmployeeData(employeeData);
  };

  // Submit supervisor employee recipient data
  const submitSupervisorRegistrations = async () => {
    // set status to loading
    setRegistration((state) => ({ ...state, loading: true }));
    try {
      toast.current.show(formServices.lookup("messages", "submit"));
      await saveDelegatedRegistrations(submissionData);
      toast.current.replace(formServices.lookup("messages", "saveSuccess"));
      setRegistration((state) => ({ ...state, loading: false }));
    } catch (error) {
      toast.current.replace(formServices.lookup("messages", "saveError"));
    } finally {
      setRegistration((state) => ({ ...state, loading: false }));
    }
  };

  // handle form changes
  useEffect(() => {
    setFormComplete(false);
  }, [formChanged])

  return (
      <>
        <InfoSupervisorEligibility />
        <InfoSupervisorRegistrations />
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(confirm)}>
            <Panel header="Supervisor Contact Details">
              <SupervisorContactInput panelName="supervisor" errors={errors} />
            </Panel>
            <Panel header="Supervisor Address">
              <AddressInput pobox addressIdentifier="office" errors={errors} contactType="supervisor"/>
            </Panel>
            <Panel
                header={
                <span>
                  Register Employees
                  <InfoToolTip
                      target="p-panel-title"
                      content="Add employees that you wish to calculate and submit registration requests. "
                  />
                </span>
                }
            >
              <>
                <ul>
                  {
                    fields?.map((item, index) => {
                      return (
                          <li key={item.id}>
                            <Panel
                                header={
                                  <div className="employee-header-bar">
                                    <span className="employee-header-text">Employee {index + 1}</span>
                                    {index !== 0 ? (
                                        <Button
                                            className="employee-add-delete-button"
                                            passClass="p-button-raised p-button-rounded"
                                            icon="pi pi-times-circle"
                                            danger
                                            onClick={(e) => {
                                              e.preventDefault();
                                              setEmployeeCount((state) => state - 1);
                                              remove(index);
                                            }}
                                        ></Button>
                                    ) : null}
                                  </div>
                                }
                            >
                              <ProfileInput itemNumber={index + 1} errors={errors} />
                              <MilestoneInput itemNumber={index + 1} errors={errors} />
                            </Panel>
                          </li>
                      );
                    })}
                </ul>
                <div className="employee-list-options">
                  <Button
                      info
                      disabled={employeeCount >= 5}
                      onClick={(e) => {
                        e.preventDefault();
                        setEmployeeCount((state) => state + 1);
                        append({
                          first_name: "",
                          last_name: "",
                          office_email: "",
                          employee_number: "",
                          organization: null,
                          service_years: "",
                          milestone: "",
                          qualifying_year: "",
                          prior_milestones: "",
                        });
                      }}
                  >
                    Add Employee
                  </Button>
                  <ConfirmPopup />
                  <Button danger onClick={(e) => { e.preventDefault(); confirmReset(e) }}>
                    Reset Form
                  </Button>
                </div>
              </>
              <Button type="submit" onClick={ handleSubmit(confirm) }>Confirm Submission</Button>
            </Panel>
          </form>
        </FormProvider>

        <ConfirmDialog
            maximizable
            visible={formComplete}
            onHide={() => setFormComplete(false)}
            message={
              <>
                <p>
                  Based on the input in the service years calculator, the following employees
                  will receive registration confirmation emails for the current recognition cycle.
                  If employees are eligible for previous years that they have not claimed, they will
                  have the opportunity to update their registrations prior to submission.
                </p>
                <p>
                  Please confirm the following employee data before submitting.
                </p>
                <DataDisplay
                    category="delegated"
                    data={submissionData}
                    identifier="employees"
                />
              </>
            }
            header={'Submit Registrations'}
            icon=""
            acceptLabel={'Submit'}
            rejectLabel={'Cancel'}
            accept={submitSupervisorRegistrations}
            reject={() => setFormComplete(false)}
        />
      </>
  );
}
