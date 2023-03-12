/*!
 * API services (React)
 * File: api.services.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import axios from "axios";

/**
 * Services to allow consuming components to subscribe to
 * API request handlers.
 *
 * @public
 * @param {Object} props
 */

const api = axios.create({
  baseURL: import.meta.env.LSA_APPS_API_URL,
  headers: {
    "Content-Type": "application/json",
    dataType: "json",
  },
  withCredentials: true,
});


/**
 * Process API response status
 */

const handleResponse = (error, response) => {
  if (error) {
    // extract specific error message (if exists)
    const {code = '', response = null} = error || {};
    const {data = ''} = response || {};
    const {message = ''} = data || {};
    const {msg = ''} = message || {};
    if (code === 'ERR_NETWORK') {
      return msg
    }
    if (error.response.status === 403 || error.response.status === 401) {
      return msg

    } else if (error.response.status === 422) {
      return msg
    } else return msg

  }
  // post message and return result
  const {data = null} = response || {};
  const {result = null} = data || {};
  return [error, result];
}

/**
 * Define Native Error types https://mzl.la/2Veh3TR
 */

const nativeExceptions = [
  EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError
].filter((except) => typeof except === 'function')

/* Throw native errors. ref: https://bit.ly/2VsoCGE */
function throwNative(error) {
  for (const Exception of nativeExceptions) {
    if (error instanceof Exception) throw error
  }
}

/**
 * Helper utility for removing async/await try/catch litter
 * - encapsulates API errors to avoid cascading fallbacks
 */

function asyncWrapper(promise, finallyFunc) {
  return promise.then(data => {
    if (data instanceof Error) {
      throwNative(data)
      return [ data ]
    }
    return [ undefined, data ]
  }).catch(error => {
    throwNative(error)
    return [ error ]
  }).finally(() => {
    if (finallyFunc && typeof finallyFunc === 'function') {
      finallyFunc();
    }
  })
}

/**
 * Get method
 *
 * @param route
 * @param callback
 * @return {Promise} [error, response]
 */

const get = async (route, callback=()=>{}) => {
  const [error, response] = await asyncWrapper(api.get(route), callback);
  return handleResponse(error, response);
}

/**
 * Put method
 *
 * @param route
 * @param data
 * @param callback
 * @return {Promise} [error, response]
 */

const put = async (route, data, callback=()=>{}) => {
  const [error, response] = await asyncWrapper(api.put(route, data), callback);
  return handleResponse(error, response);
}

/**
 * Post method
 *
 * @param route
 * @param data
 * @param callback
 * @return {Promise} [error, response]
 */

const post = async (route, data, callback=()=>{}) => {
  const [error, response] = await asyncWrapper(api.post(route, data), callback);
  return handleResponse(error, response);
}

export default {
  get: get,
  put: put,
  post: post
}

