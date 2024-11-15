/*!
 * API routes
 * File: api.routes.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import api from "./api.services.js";

/**
 *  Gets current user info.
 *
 * */

export const getUser = async () => {
  const [_, result] = await api.get("/auth/user");
  const { guid = "", idir = "" } = result || {};
  return { id: guid, idir: idir };
};

/**
 *  View registration(s) for current user.
 *
 * */

export const getSelfRegistration = async () => {
  const [, result] = await api.get(`/recipients/self/view/`);
  return result;
};

/**
 *  SelfRegister registration (creates registration stub)
 *
 * */

export const createSelfRegistration = async () => {
  return await api.post(`/recipients/self/register/`, {});
};

/**
 * Update registration for current user
 *
 * */

export const saveSelfRegistration = async (data) => {
  console.log("Save:", data);
  return await api.post(`/recipients/self/save/`, data);
};

/**
 *  View registration(s) for delegated user.
 *
 * */

export const getDelegatedRegistrations = async () => {
  const [_, result] = await api.get(`/recipients/delegated/view/`);
  return result;
};

/**
 *  Save delegated registration (creates registration stub)
 *
 * */

export const saveDelegatedRegistrations = async (data) => {
  console.log("Save delegated form:", data);
  return await api.post(`/recipients/delegated/save/`, data);
};

/**
 *  Get awards
 *
 * */

export const getAwards = async (milestone) => {
  const [_, result] = milestone
    ? await api.get(`/awards/filter/milestone/${milestone || ""}`)
    : [];
  return result;
};

/**
 *  Get milestones
 *
 * */

export const getMilestones = async () => {
  const [_, result] = await api.get(`/settings/milestones/list`);
  return result;
};

/**
 *  Get qualifying years
 *
 * */

export const getQualifyingYears = async () => {
  const [_, result] = await api.get(`/settings/qualifying_years/list`);
  return result;
};

/**
 * Get list of participating ministries and agencies
 *
 * */

export const getOrganizations = async () => {
  const [_, result] = await api.get(
    `settings/organizations/filter/active/true`
  );
  return result;
};

/**
 * Get list of BC communities
 *
 * */

export const getCommunities = async () => {
  const [_, result] = await api.get(`settings/communities/list`);
  return result;
};

/**
 * Get list of provinces
 *
 * */

export const getProvinces = async () => {
  const [_, result] = await api.get(`settings/provinces/list`);
  return result;
};

/**
 * Get list of PECSF charities
 *
 * */

export const getPecsfCharities = async () => {
  const [_, result] = await api.get(`settings/pecsf-charities/list`);
  return result;
};

/**
 * Get list of active PECSF charities
 *
 * */

export const getActivePECSFCharities = async () => {
  const [_, result] = await api.get(
    `settings/pecsf-charities/filter/active/true`
  );
  return result;
};

/**
 * Get list of pooled PECSF charities
 *
 * */

export const getPooledPecsfCharities = async () => {
  const [_, result] = await api.get(
    `settings/pecsf-charities/filter/pooled/true`
  );
  return result;
};

/**
 * Get list of PECSF regions
 *
 * */

export const getPecsfRegions = async () => {
  const [_, result] = await api.get(`settings/pecsf-regions/list`);
  return result;
};

/**
 * Delete recipient data
 *
 * */

export const removeSelfRegistration = async () => {
  const [_, result] = await api.post(`/recipients/self/delete/`, {});
  return result;
};

/**
 *  Check if registration is active (not closed)
 *
 * */

export const isActive = async () => {
  const [, result] = await api.get(`/settings/global/self-registration-active`);
  const { value } = result || {};
  return value === "true";
};

/**
 * Check if employee has already been registered in this cycle
 */

export const recipientExistsInCycle = async (employeeNumber) => {

  const [, result] = await api.get(`/recipients/admin/exists/${employeeNumber}`);
  return result;
};

export default null;
