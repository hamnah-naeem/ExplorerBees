import { baseURL } from "../utils/helper";

export const endpoints = {
  login: `${baseURL}login.php`,
  register: `${baseURL}register.php`,
  getHotels: `${baseURL}getHotels.php`,
  getRestaurants: `${baseURL}getRestaurants.php`,
  showCountries: `${baseURL}showCountries.php`,
  showStates: `${baseURL}showStates.php`,
  getCities: `${baseURL}getCities.php`,
  getAreas: `${baseURL}getAreas.php`,
  getThingsToDo: `${baseURL}getThingsToDo.php`,
  checkUsername: `${baseURL}checkUsername.php`,
  getTimeline: `${baseURL}getTimeline.php`,
  getFamousCities: `${baseURL}getFamousCities.php`,
  getTrending: `${baseURL}getTrending.php`
};
