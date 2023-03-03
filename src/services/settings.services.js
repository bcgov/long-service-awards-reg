/*!
 * Settings services/utilities (React)
 * File: settings.services.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import validate, {validators} from "@/services/validation.services.js";

const schemaData = {
  milestones: [
    { value: 5, text: "5 years" },
    { value: 10, text: "10 years" },
    { value: 15, text: "15 years" },
    { value: 20, text: "20 years" },
    { value: 25, text: "25 years" },
    { value: 30, text: "30 years" },
    { value: 35, text: "35 years" },
    { value: 40, text: "40 years" },
    { value: 45, text: "45 years" },
    { value: 50, text: "50 years" },
  ],
  delegatedFormFields: [
    { key: "employee", label: "Employee" },
    { key: "first_name", label: "First Name", validators: [validators.required] },
    { key: "last_name", label: "Last Name", validators: [validators.required] },
    { key: "office_email", label: "Government Email", validators: [validators.required, validators.email] },
    { key: "employee_number", label: "Employee Number", validators: [validators.required] },
    { key: "organization", label: "Ministry / Organization", validators: [validators.required]},
    { key: "service_years", label: "Current Years of Service", validators: [validators.required] },
    { key: "milestone", label: "Current Milestone", validators: [validators.required] },
    { key: "qualifying_year", label: "Milestone Qualifying Year", validators: [validators.required] },
    { key: "prior_milestones", label: "Prior Unclaimed Milestones" },
  ],
  registration_steps: [
    {
      key: 'milestone',
      seq: 0,
      label: "Milestone",
      description: "Select your Service Milestones",
      route: "/register/milestone",
      service_pin: true,
      default: {
        service: {
          cycle: 2023,
          service_years: "",
          milestone: "",
          qualifying_year: "",
          ceremony_opt_out: false,
          confirmed: false
        },
        bcgeu: false,
        retirement: false,
        retirement_date: null,
        previous_registration: false,
        prior_milestones: [],
      },
      validate: (data) => {
        const {service} = data || {};
        const fields = [
          {key: "service_years", validators: [validators.required]},
          {key: "milestone", validators: [validators.required]},
          {key: "qualifying_year", validators: [validators.required]}
        ];
        return validate(fields, service);
      }
    },
    {
      key: 'profile',
      seq: 1,
      label: "Profile",
      description: "Your Profile Information",
      route: "/register/profile",
      service_pin: true,
      default: {
        contact: {
          first_name: "",
          last_name: "",
          office_email: "",
          office_phone: "",
        },
        employee_number: "",
        organization: "",
        division: "",
        branch: "",
      },
      validate: (data) => {
        const { contact } = data || {};
        return validate([
          {key: "first_name", validators: [validators.required]},
          {key: "last_name", validators: [validators.required]},
          {key: "office_email", validators: [validators.required, validators.email]},
          {key: "personal_email", validators: [validators.email]},
          {key: "office_phone",  validators: [validators.phone]},
        ], contact) && validate([
          {key: "employee_number", validators: [validators.required, validators.employeeNumber]},
          {key: "organization", validators: [validators.required]},
          {key: "division", validators: [validators.required]},
          {key: "branch", validators: [validators.required]},
        ], data);
      }
    },
    {
      key: 'contact',
      seq: 2,
      label: "Contact Info",
      description: "Your personal contact information",
      route: "/register/contact",
      service_pin: true,
      default: {
        contact: {
          personal_phone: "",
          personal_email: "",
          personal_address: {
            pobox: "",
            street1: "",
            street2: "",
            postal_code: "",
            community: "",
            province: "British Columbia",
            country: "Canada",
          },
          office_address: {
            pobox: "",
            street1: "",
            street2: "",
            postal_code: "",
            community: "",
            province: "British Columbia",
            country: "Canada",
          }
        }
      },
      validate: (data) => {
        const { contact } = data || {};
        const {office_address, personal_address} = contact || {};
        return validate([
          {key: "personal_phone", validators: [validators.phone]},
        ], contact) && validate([
          { key: "street1", validators: [validators.required] },
          { key: "community", validators: [validators.required] },
          { key: "province", validators: [validators.required] },
          { key: "postal_code", validators: [validators.required, validators.postal_code] },
        ], personal_address) && validate([
          { key: "street1", validators: [validators.required] },
          { key: "community", validators: [validators.required] },
          { key: "province", validators: [validators.required] },
          { key: "postal_code", validators: [validators.required, validators.postal_code] },
        ], office_address);
      }
    },
    {
      key: 'awards',
      seq: 3,
      label: "Award",
      description: "Select your Long Service Award",
      route: "/register/award",
      service_pin: false,
      default: {
        service: {
          awards: {
            award: {
              id: "",
              vendor: "",
              type: "",
              milestone: "",
              label: "",
              description: ""
            },
            selections: []
          },
        }
      },
      validate: (data) => {
        const { service } = data || {};
        const { awards } = service || {};
        const { selections, award } = awards || {};
        const { id, options } = award || {};
        // validate award exists (no options) or award options match schema
        // - filter selections by selected award
        // - check that each option has a corresponding selection
        return (award || {}).hasOwnProperty('id') && award.id
            && (options.length === 0
            || (selections || [])
                    .filter(({award_option}) => award_option.award === id)
                    .every(({award_option}) => {
              return !!(options || []).find(({award, type}) =>
                  (award_option || {}).hasOwnProperty('type')
                  && award_option.type === type)
            }))
      }
    },
    {
      key: 'supervisor',
      seq: 4,
      label: "Supervisor",
      description: "Your Supervisor Information",
      route: "/register/supervisor",
      service_pin: true,
      default: {
        supervisor: {
          first_name: "",
          last_name: "",
          office_email: "",
          office_phone: "",
          office_address: {
            pobox: "",
            street1: "",
            street2: "",
            postal_code: "",
            community: "",
            province: "",
            country: "",
          },
        },
      },
      validate: (data) => {
        const { supervisor } = data || {};
        const { office_address } = supervisor || {};
        return validate([
          {key: "first_name", validators: [validators.required]},
          {key: "last_name", validators: [validators.required]},
          {key: "office_email", validators: [validators.required, validators.email]},
        ], supervisor) && validate([
          { key: "street1", validators: [validators.required] },
          { key: "community", validators: [validators.required] },
          { key: "province", validators: [validators.required] },
          { key: "postal_code", validators: [validators.required, validators.postal_code] },
        ], office_address);
      }
    },
    {
      key: 'confirmation',
      seq: 5,
      label: "Confirmation",
      description: "Confirm your Registration",
      service_pin: true,
      route: "/register/confirmation",
      fields: [],
      default: {
        service: {
          confirmed: false,
          survey_opt_in: false
        },
      },
      validate: (data) => {
        const { service } = data || {};
        return validate([{key: "confirmed", validators: [validators.required]}], service)
      }
    }
  ],
  messages: [
    {
      value: "save",
      text: {
        severity: "info",
        summary: "Submitting...",
        detail: "Submitting registration data. Please Wait.",
        sticky: true,
        closable: false,
      },
    },
    {
      value: "create",
      text: {
        severity: "info",
        summary: "Creating...",
        detail: "Creating a new registration. Please Wait.",
        sticky: true,
        closable: false,
      },
    },
    {
      value: "delete",
      text: {
        severity: "success",
        summary: "Registration Deleted",
        detail: "Registration was removed.",
        life: 3000
      },
    },
    {
      value: "createSuccess",
      text: {
        severity: "success",
        summary: "Success!",
        detail: "Registration Started!",
        closable: true,
        life: 1000,
      },
    },
    {
      value: "createError",
      text: {
        severity: "error",
        summary: "Registration could not be created.",
        detail:
            "There was an error in processing your registration. Please try again. If issues persist, please contact support",
        closable: true,
        sticky: true,
      },
    },
    {
      value: "submit",
      text: {
        severity: "info",
        summary: "Submitting Registration...",
        detail: "Submitting final registration. Please Wait.",
        sticky: true,
        closable: false,
      },
    },
    {
      value: "saveError",
      text: {
        severity: "error",
        summary: "Error! Save Failed",
        detail:
            "There was an error in processing your registration. Please try again. If issues persist, please contact support",
        sticky: true,
      },
    },
    {
      value: "saveSuccess",
      text: {
        severity: "success",
        summary: "Success!",
        detail: "Registration Updated!",
        life: 1000,
      },
    },
    {
      value: "confirmAward",
      text: {
        severity: "success",
        summary: "Award Selected!",
        detail: "Award options confirmed.",
        life: 3000
      },
    },
    {
      value: "confirmRegistration",
      text: {
        severity: "info",
        summary: "Registration Complete",
        detail: "Thank you we have received your registration.",
        life: 3000
      },
    },
  ],
};

export default {

  /**
   * get enumerated data by key
   * **/

  get: function get(key) {
    return schemaData[key] !== "undefined" ? schemaData[key] : null;
  },

  /**
   * get a copy of the schema data
   * **/

  copy: function copy(key, value, idKey='key') {
    if (typeof schemaData[key] === "undefined") return null;
    const found = schemaData[key].find((item) => item[idKey] === value);
    return found ? Object.assign({}, found) : null;
  },

  /**
   * get enumerated data by key
   * **/

  lookup: function lookup(key, value) {
    if (schemaData[key] === "undefined") return null;
    const found = schemaData[key].filter((item) => item.value === value);
    return found.length > 0 ? found[0].text : null;
  },

  capitalize: function capitalize(value) {
    const capitalizedValue =
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    return value !== "undefined" ? capitalizedValue : null;
  },
};
