/*!
 * Service Pins: Supervisor Registration
 * File: SupervisorRegistration.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import React, {Fragment, useContext, useEffect, useMemo, useState} from "react";
import {useForm, FormProvider, useFieldArray} from "react-hook-form";
import {LoadingContext, ToastContext} from "@/AppContext";
import formServices from "@/services/settings.services.js";
import {Button} from "primereact/button";
import EmployeeInput from "@/components/fieldsets/EmployeeInput";
import {BlockUI} from "primereact/blockui";
import {getDelegatedRegistrations, saveDelegatedRegistrations} from "@/services/api.routes.js";
import {Toolbar} from "primereact/toolbar";
import DelegateContactInput from "@/components/fieldsets/DelegateContactInput";
import PageHeader from "@/components/common/PageHeader.jsx";
import {Panel} from "primereact/panel";
import EmployeeData from "@/views/service-pins/data/EmployeeData";

/**
 * Delegated Calculator Page. Allows users to submit delegated applications for LSA/Service Pin registration.
 */

export default function DelegatedServicePins() {

  // get form step schema / default values
  const schema = formServices.copy('delegated-service-pins', 'employee');
  const defaultFormValues = schema && schema.default;
  const {employee} = defaultFormValues || {};

  // get context / hooks
  const { loading, setLoading } = useContext(LoadingContext);
  const toast = useContext(ToastContext);
  const [submitted, setSubmitted] = useState(false);
  const [registrations, setRegistrations] = useState([]);

  // init form
  const methods = useForm({
    mode: "all",
    defaultValues: useMemo(() => {
      return defaultFormValues;
    }, [defaultFormValues]),
  });
  const {control, handleSubmit, formState: { isValid }} = methods || {};

  // create field array for employee data
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm
    name: "employees", // unique name for your Field Array
  });

  // check for previous service pin registrations for delegate
  useEffect(() => {
    setLoading(true);
    getDelegatedRegistrations().then(console.log)
    getDelegatedRegistrations()
        .then(setRegistrations)
        .catch(console.error)
        .finally(()=>{setLoading(false)})
  }, []);

  // submit registration form data
  const submitData = async (data) => {
    try {
      setLoading(true);
      const [error, result] = await saveDelegatedRegistrations(data);
      toast.current.replace(formServices.lookup("messages", error || !result ? "saveError" : "saveSuccess"));
      if (!error && result) {
        setSubmitted(true);
        // show confirmation message if registration completed
        toast.current.replace(formServices.lookup("messages", "confirmRegistration"));
      }
      return result;
    } catch (error) {
      toast.current.replace(formServices.lookup("messages", "saveError"));
    } finally {
      setLoading(false);
    }
  };

  const startContent = (
      <Fragment>
        <Button
            className={'m-1'}
            label={'Add Employee'}
            severity={"info"}
            icon="pi pi-user-plus"
            onClick={(e) => {
              e.preventDefault();
              append(employee);
            }}
        />
      </Fragment>
  );

  const endContent = (
      <Fragment>
        <div className="font-bold employees-counter">
          Number of Employees: <span>{ fields.length }</span>
        </div>
      </Fragment>
  );

  return <FormProvider {...methods}>
    <form>
      <PageHeader title="Supervisor Service Pin Registration" subtitle={schema && schema.description}/>
      {
          registrations.length > 0 && <Panel
              toggleable
              collapsed={true}
              className={'mb-3'}
              header={<span className={'text-pink-500'}>Your Previous Service Pin Registrations</span>}
          >
            {
              (registrations || []).map((item, index) => (
                  <EmployeeData key={`employee-registration-${index}`} data={item} />
              ))
            }
          </Panel>
      }
      <BlockUI
          blocked={loading || submitted}
          template={<Button disabled icon={'pi pi-lock'} label={submitted ? 'Form Submitted' : 'Form Locked'} />}>
        <DelegateContactInput />
        <Panel header={"Employee(s) Information"}>
          {
            (fields || []).map((item, index) => (
                <EmployeeInput key={`employee-registration-${index}`} remove={remove} index={index}/>
            ))
          }
          <Toolbar left={startContent} right={endContent} />
        </Panel>
        <Panel className="container mt-3 mb-3" header={"Submit Registration"}>
          <div>
            {
                !isValid && <p className={'error'}>Form is incomplete or your input is not valid.
                  Please update before submitting.</p>
            }
            <div className={'grid'}>
              <div className={'col-12'}>
                <Button
                    className={'p-button-success w-full flex justify-content-center'}
                    type="submit"
                    onClick={handleSubmit(submitData)}
                    disabled={submitted}
                >
                  {submitted ? 'Registration Submitted' : 'Submit Registration'}
                </Button>
              </div>
            </div>
          </div>
        </Panel>
      </BlockUI>
    </form>
  </FormProvider>
}
