/*!
 * Milestone selection form component (React)
 * File: Milestone.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import React, {useContext, useEffect, useMemo, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import { useNavigate, useOutletContext} from "react-router";
import {RegistrationContext} from "@/AppContext.js";
import AppButton from "../../components/common/AppButton";
import AppPanel from "../../components/common/AppPanel";
import MilestoneInput from "../../components/fieldsets/MilestoneInput.jsx";
import InfoToolTip from "../../components/common/InfoToolTip";
import formServices from "../../services/settings.services";
import InfoMilestone from "@/components/info/InfoMilestone.jsx";

/**
 * Supervisor Milestone Selection.
 * Allows user to use built in calculator to determine years of service and potential milestones.
 */

export default function Milestone() {
  const navigate = useNavigate();

  const [saveRegistration] = useOutletContext();
  const { registration, setRegistration } = useContext(RegistrationContext);

  const defaultFormValues = {
    // awards: [
    //   {
    //     award: {
    //       // service_years: null,
    //       milestone: null,
    //       qualifying_year: null,
    //       prior_milestones: [],
    //     },
    //   },
    // ],
    service_years: "",
    milestone: null,
    qualifying_year: "",
    prior_milestones: [],
  };

  const methods = useForm({
    defaultValues: useMemo(() => {
      return {...defaultFormValues, ...registration};
    }, [registration]),
  });

  const [ministrySelected, setMinistrySelected] = useState("");

  const {
    formState: { errors, isValid, isDirty },
    getValues,
    setValue,
    handleSubmit,
    reset,
    watch,
  } = methods;

  const [formComplete, setFormComplete] = useState(false);
  const formCompleteStatus = watch();

  useEffect(() => {
    setFormComplete(false);
  }, [formCompleteStatus]);
  //
  // const saveData = async (data) => {
  //   const registrationData = registration;
  //   const finalData = Object.assign({}, data);
  //   setSubmissionData(finalData);
  //   const registrationUpdate = { ...registrationData, ...finalData };
  //   await saveRegistration(registrationUpdate).then(() => {
  //     setRegistration(registrationUpdate);
  //     setFormComplete(true);
  //   }).catch(console.error);
  // };
  //
  // const submitData = (e) => {
  //   e.preventDefault();
  //   const finalData = { ...getValues() };
  //   setSubmissionData(finalData);
  //   try {
  //     const ministryData = getValues("organization");
  //     const newState = { ...stateData, ministryData };
  //     navigate("/register/milestone", { state: newState });
  //   } catch (error) {}
  // };

  const saveData = async (data) => {
    let updateData = {};
    if (data["milestone"] !== registration["milestone"]) {
      updateData = {
        awards: [
          {
            award: {
              id: "",
              label: "",
              description: "",
              award_options: [],
            },
          },
        ],
      };
    }
    const registrationData = registration;
    const finalData = Object.assign({}, data);
    const registrationUpdate = {
      ...registrationData,
      ...finalData,
      ...updateData,
    };
    saveRegistration(registrationUpdate).then(() => {
      setRegistration(registrationUpdate);
      setFormComplete(true);
    });
  };

  const submitData = (e) => {
    e.preventDefault();

  };


  useEffect(() => {
    reset(registration);
  }, [registration]);

  return (
    <>
      <div className="self-registration basic-profile">
        <FormProvider {...methods}>
          <form className="milestones-form">
            <InfoMilestone />
            <AppPanel
              header={
                <>
                  Milestone Details
                  <InfoToolTip
                    target="milestones-form"
                    content="Enter your years of service and claim milestones in recognition of years served."
                  />
                </>
              }
            >
              <MilestoneInput selfregister panelName="personal" errors={errors} ministry={ministrySelected} />
            </AppPanel>
            <div className="submission-buttons">
              <AppButton secondary onClick={handleSubmit(saveData)}>
                Save
              </AppButton>
              <AppButton onClick={submitData} disabled={!isValid || (isDirty && !formComplete)}>
                Continue
              </AppButton>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
}
