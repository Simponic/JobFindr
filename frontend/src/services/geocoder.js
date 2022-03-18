import Geocode from "react-geocode";


export const GeocodeWrapper = ((key) => {
  Geocode.setApiKey(key);
  Geocode.setLanguage("en");
  Geocode.setLocationType("ROOFTOP");

  return Geocode;
})(process.env.REACT_APP_MAPS_API_KEY);
