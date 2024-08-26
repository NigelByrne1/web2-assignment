import { accountsController } from "../controllers/accounts-controller.js";

export function loginAsGuest(request, response) {
  request.body.email = "test@test.test";
  request.body.password = "test";
  console.log(`logging in guest account`);
  return accountsController.authenticate(request, response);
}

export function getWeatherIconCode(weatherCode) {
    let iconCode = '';
    if (weatherCode >= 200 && weatherCode <= 232) {
      iconCode = '11d'; 
    } else if (weatherCode >= 300 && weatherCode <= 321) {
      iconCode = '09d'; 
    } else if (weatherCode >= 500 && weatherCode <= 531) {
      iconCode = '10d'; 
    } else if (weatherCode === 511) {
      iconCode = '13d'; 
    } else if (weatherCode >= 600 && weatherCode <= 622) {
      iconCode = '13d'; 
    } else if (weatherCode >= 701 && weatherCode <= 781) {
      iconCode = '50d'; 
    } else if (weatherCode === 800) {
      iconCode = '01d'; 
    } else if (weatherCode === 801) {
      iconCode = '02d'; 
    } else if (weatherCode === 802) {
      iconCode = '03d'; 
    } else if (weatherCode >= 803 && weatherCode <= 804) {
      iconCode = '04d'; 
    }
    return iconCode;
  }