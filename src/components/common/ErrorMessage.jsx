/**
 * Function returns an error message based on react-hook-form's error object
 * @param {string} name name of the error field
 * @param {object} errors errors object inherited from form values
 * @param {string} category Optional. Required in nested errors. Names of error item within object - dependent on delegated or personal.
 * @param {int} index Optional. Required in nested errors. Determine where in the error category the specific error is occuring.
 * @param {string} optionname Optional. Required in nested errors. Locates subname of error.
 * @returns
 */
export default function getFormErrorMessage(
  name,
  errors,
  category = null,
  index = null,
  optionname = null
) {
  const helpid = `${name}-help`;

  const topLevelError = errors[name];

  const nestedError = !!(errors[category] && errors[category][optionname]);

  const nestedExists = errors?.category?.index?.optionname;
  const altNested =
    errors[category] &&
    errors[category][index] &&
    errors[category][index][optionname];

  // console.log(topLevelError, "nested error", nestedError);
  // console.log(name, errors, category, index, optionname, "all error options");

  return (
    <>
      {topLevelError ? (
        <small className={`p-error ${helpid}`}>{errors[name].message}</small>
      ) : null}
      {nestedError ? (
        <small className={`p-error ${helpid}`}>
          {errors[category] && errors[category][optionname].message}
        </small>
      ) : null}
      {!topLevelError && (nestedExists || altNested) ? (
        <small className={`p-error ${helpid}`}>
          {errors[category][index][optionname].message}
        </small>
      ) : null}
    </>
  );
}
