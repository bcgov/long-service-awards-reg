/*!
 * Supervisor Contact Details fieldset component
 * File: SupervisorContactInput.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import { Controller, useFormContext } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import classNames from "classnames";
import { matchers } from "@/services/validation.services.js";
import InfoToolTip from "@/components/common/InfoToolTip.jsx";
import { Panel } from "primereact/panel";
//import { SelectButton } from "primereact/selectbutton";
import { RadioButton } from 'primereact/radiobutton';
import { useContext, useEffect, useState } from "react";
import AddressInput from "@/components/fieldsets/AddressInput.jsx";
import { BlockUI } from "primereact/blockui";
import { LoadingContext } from "@/AppContext.js";

/**
 * Supervisor Contact Details
 * @returns first_name, last_name, office email */

export default function SupervisorContactInput() {
  const [sameAddress, setSameAddress] = useState(false);
  const [isBulk, setIsBulk] = useState(true);
  const { control, resetField, setValue, getValues } = useFormContext();
  const { loading } = useContext(LoadingContext);

  // check if recipient and supervisor addresses are identical
  useEffect(() => {
    setIsBulk(getValues(`organization.bulk`));
    setSameAddress(
      getValues(`supervisor.office_address.street1`) &&
        getValues(`supervisor.office_address.street2`) &&
        getValues(`supervisor.office_address.pobox`) &&
        getValues(`supervisor.office_address.province`) &&
        getValues(`supervisor.office_address.community`) &&
        getValues(`supervisor.office_address.postal_code`) &&
        getValues(`supervisor.office_address.street1`) ===
          getValues(`contact.office_address.street1`) &&
        getValues(`supervisor.office_address.street2`) ===
          getValues(`contact.office_address.street2`) &&
        getValues(`supervisor.office_address.pobox`) ===
          getValues(`contact.office_address.pobox`) &&
        getValues(`supervisor.office_address.community`) ===
          getValues(`contact.office_address.community`) &&
        getValues(`supervisor.office_address.province`) ===
          getValues(`contact.office_address.province`) &&
        getValues(`supervisor.office_address.postal_code`) ===
          getValues(`contact.office_address.postal_code`)
    );
  }, []);

  // set supervisor address to recipient address
  const _handleSameAddress = (toggle) => {
    setSameAddress(toggle);
    if (toggle) {
      setValue(
        "supervisor.office_address",
        getValues("contact.office_address")
      );
      // strip out space between postal code
      setValue(
        "supervisor.office_address.postal_code",
        String(getValues("contact.office_address.postal_code")).replace(" ", "")
      );
    } else {
      resetField(`supervisor.office_address.street1`, { defaultValue: "" });
      resetField(`supervisor.office_address.street2`, { defaultValue: "" });
      resetField(`supervisor.office_address.pobox`, { defaultValue: "" });
      resetField(`supervisor.office_address.community`, { defaultValue: "" });
      resetField(`supervisor.office_address.province`, { defaultValue: "" });
      resetField(`supervisor.office_address.postal_code`, { defaultValue: "" });
    }
  };

  return (
    <>
      <Panel
        className={"mb-3"}
        header={
          <>
            Supervisor Contact Information{" "}
            <InfoToolTip
              target="supervisor-details-profile"
              content="Please enter the contact information of your current supervisor."
            />
          </>
        }
      >
        <div className="container">
          <div className="grid">
            <div className={"col-12 form-field-container"}>
              <label htmlFor={"supervisor.first_name"}>First Name</label>
              <Controller
                name={"supervisor.first_name"}
                control={control}
                rules={{ required: "First name is required." }}
                render={({ field, fieldState: { invalid, error } }) => (
                  <>
                    <InputText
                      id={field.name}
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value)}
                      className={classNames({ "p-invalid": error })}
                      aria-describedby={`first_name-help`}
                      placeholder={`Supervisor first name`}
                    />
                    {invalid && <p className="error">{error.message}</p>}
                  </>
                )}
              />
            </div>
            <div className="col-12 form-field-container">
              <label htmlFor={"supervisor.last_name"}>Last Name</label>
              <Controller
                name={"supervisor.last_name"}
                control={control}
                rules={{ required: "Last name is required." }}
                render={({ field, fieldState: { invalid, error } }) => (
                  <>
                    <InputText
                      id={field.name}
                      value={field.value || ""}
                      className={classNames({ "p-invalid": error })}
                      aria-describedby={`last_name-help`}
                      onChange={(e) => field.onChange(e.target.value)}
                      placeholder={`Supervisor last name`}
                    />
                    {invalid && <p className="error">{error.message}</p>}
                  </>
                )}
              />
            </div>
            <div className="col-12 form-field-container">
              <label htmlFor={`supervisor.office_email`}>
                Government Email
              </label>
              <Controller
                name={"supervisor.office_email"}
                control={control}
                rules={{
                  required: "Error: Government email is required.",
                  pattern: {
                    value: matchers.govEmail,
                    message: "Invalid email address. (e.g., example@gov.bc.ca)",
                  },
                }}
                render={({ field, fieldState: { invalid, error } }) => (
                  <>
                    <InputText
                      id={field.name}
                      value={field.value || ""}
                      className={classNames({ "p-invalid": error })}
                      aria-describedby={`government-email-help`}
                      onChange={(e) => field.onChange(e.target.value)}
                      placeholder={`Supervisor's email address`}
                    />
                    {invalid && <p className="error">{error.message}</p>}
                  </>
                )}
              />
            </div>
          </div>
        </div>
      </Panel>
      {!loading && !isBulk && (
        <>
          <Panel className={"mb-3"} header="Use Same Office Address">
            <div className="container">
              <div className="grid">
                <div className="col-12 form-field-container">
                  <div className="flex align-items-center">
                    <RadioButton
                      inputId="sameAddressYes"
                      name="sameAddress"
                      value="Yes"
                      checked={sameAddress}
                      onChange={(e) => {
                        _handleSameAddress(e.value === "Yes");
                      }}
                      />
                    <label className={"ml-3"} htmlFor="sameAddressYes">
                      Yes, supervisor office address is the same as my office address
                    </label>
                  </div>
                  
                  <div className="flex align-items-center">
                    <RadioButton
                      inputId="sameAddressNo"
                      name="sameAddress"
                      value="No"
                      checked={!sameAddress}
                      onChange={(e) => {
                        _handleSameAddress(e.value === "Yes");
                      }}
                    />
                    <label className={"ml-3"} htmlFor="sameAddressNo">
                      No, supervisor office address is different from my office address
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </Panel>
          <BlockUI blocked={!loading && (sameAddress || isBulk)}>
            <AddressInput
              id={"supervisor.office_address"}
              label={"Supervisor Office"}
              pobox={true}
            />
          </BlockUI>
        </>
      )}
    </>
  );
}
