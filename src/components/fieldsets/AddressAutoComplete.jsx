/**
 * AddressAutoComplete Service integrates google API to query user addresses for autocomplete
 * @returns
 */

export default function AddressAutoComplete() {
  const initializeAutoComplete = async (input, callback) => {
    let autoComplete = new window.google.maps.places.Autocomplete(input, {
      componentRestrictions: { country: ["us", "ca"] },
      fields: ["address_component", "geometry"],
      types: ["address"],
    });
    autoComplete.addListener("place_changed", callback);

    return autoComplete;
  };

  const getAddressDetails = async (autoComplete) => {
    const place = await autoComplete.getPlace();

    let streetAddress,
      cityCommunity,
      provinceStateShort,
      provinceStateLong,
      countryShort,
      countryLong,
      postalCode = "";

    // Get each component of the address from the place details,
    for (const component of place.address_components) {
      const componentType = component.types[0];

      if (componentType === "street_number") {
        streetAddress = component.long_name;
      }
      if (componentType === "route") {
        streetAddress = `${streetAddress} ${component.long_name}`;
      }
      if (componentType === "locality") {
        cityCommunity = component.long_name;
      }
      if (componentType === "administrative_area_level_1") {
        provinceStateShort = component.short_name;
        provinceStateLong = component.long_name;
      }
      if (componentType === "postal_code") {
        postalCode = component.long_name;
      }
      if (componentType === "postal_code_suffix") {
        postalCode = `${postalCode}-${component.long_name}`;
      }
      if (componentType === "country") {
        countryShort = component.short_name;
        countryLong = component.long_name;
      }
    }

    let addressResult = {
      streetAddress: streetAddress,
      cityCommunity: cityCommunity,
      provinceStateShort: provinceStateShort,
      provinceStateLong: provinceStateLong,
      postalCode: postalCode,
      countryShort: countryShort,
      countryLong: countryLong,
    };

    return addressResult;
  };

  return {
    initializeAutoComplete,
    getAddressDetails,
  };
}
