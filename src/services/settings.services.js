/*!
 * Schema/settings configuration + settings utilities
 * File: settings.services.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import validate, {validators} from "@/services/validation.services.js";

const schemaData = {
  lsa: [
    {
      key: 'milestone',
      seq: 0,
      label: "Milestone",
      description: "Select your Service Milestones",
      route: "/lsa/milestone",
      default: {
        service: {
          cycle: "",
          service_years: "",
          milestone: "",
          qualifying_year: "",
          confirmed: false,
          previous_registration: false,
          previous_award: false
        },
        bcgeu: false,
        retirement: false,
        retirement_date: null
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
      route: "/lsa/profile",
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
      route: "/lsa/contact",
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
      route: "/lsa/award",
      default: {
        service: {
          ceremony_opt_out: false,
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
      route: "/lsa/supervisor",
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
      route: "/lsa/confirmation",
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
  'service-pins': [
    {
      key: 'milestone',
      seq: 0,
      label: "Milestone",
      description: "Select your Service Milestones",
      route: "/service-pins/self/milestone",
      default: {
        service: {
          cycle: "",
          service_years: "",
          milestone: "",
          qualifying_year: "",
          confirmed: false,
        }
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
      route: "/service-pins/self/profile",
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
      route: "/service-pins/self/contact",
      default: {
        office_address: {
          pobox: "",
          street1: "",
          street2: "",
          postal_code: "",
          community: "",
          province: "British Columbia",
          country: "Canada",
        }
      },
      validate: (data) => {
        const { contact } = data || {};
        const {office_address} = contact || {};
        return validate([
          { key: "street1", validators: [validators.required] },
          { key: "community", validators: [validators.required] },
          { key: "province", validators: [validators.required] },
          { key: "postal_code", validators: [validators.required, validators.postal_code] },
        ], office_address);
      }
    },
    {
      key: 'supervisor',
      seq: 3,
      label: "Supervisor",
      description: "Your Supervisor Information",
      route: "/service-pins/self/supervisor",
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
      seq: 4,
      label: "Confirmation",
      description: "Confirm your Registration",
      route: "/service-pins/self/confirmation",
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
  'delegated-service-pins': [{
    key: 'employee',
    label: "Delegated Service Pins",
    description: "Register Service Pins on behalf of your employees",
    route: "/service-pins/delegated",
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
      employees: [{
        employee_number: "",
        organization: null,
        contact: {
          first_name: "",
          last_name: "",
          office_email: "",
        },
        service: {
          years_of_service: "",
          milestone: "",
          qualifying_year: "",
        },
        prior_milestones: ""
      }]
    },
    validate: (data) => {
      const { service, contact } = data || {};
      return validate([
        {key: "first_name", validators: [validators.required]},
        {key: "last_name", validators: [validators.required]},
        {key: "office_email", validators: [validators.required, validators.email]},
      ], contact) && validate([
        {key: "service_years", validators: [validators.required]},
        {key: "milestone", validators: [validators.required]},
        {key: "qualifying_year", validators: [validators.required]}
      ], service) && validate([
        {key: "employee_number", validators: [validators.required, validators.employeeNumber]},
        {key: "organization", validators: [validators.required]},
      ], data);
    }
  }],
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

  /**
   * Capialize string
   * @param value
   * @return {string|null}
   */
  capitalize: function capitalize(value) {
    const capitalizedValue =
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    return value !== "undefined" ? capitalizedValue : null;
  },

  /**
   * Sort array of objects alphanumerically
   */

  sort: function sort(arr, field) {
    return arr.sort((a, b) => {
      if (a.hasOwnProperty(field) && b.hasOwnProperty(field)) {
        return a[field] < b[field] ? -1 : 1;
      }
      return 0;
    })
  }
};
