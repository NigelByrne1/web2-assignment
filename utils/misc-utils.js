import { accountsController } from "../controllers/accounts-controller.js";
import { stationAnalytics } from "./station-analytics.js";
import { reportStore

 } from "../models/report-store.js";
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

  export const miscUtils = {
    getCelsiusToFahrenheit(celsius) {
      const fahrenheit = (celsius * 9/5) + 32;
      return Math.round(fahrenheit * 100) / 100;
    },

    getWeatherCondition(weatherCode) {
      let weatherCondition = '';
      if (weatherCode >= 200 && weatherCode <= 232) {
          weatherCondition = 'Thunderstorms'; 
      } else if (weatherCode >= 300 && weatherCode <= 321) {
          weatherCondition = 'Drizzle'; 
      } else if (weatherCode >= 500 && weatherCode <= 531) {
          weatherCondition = 'Rain'; 
      } else if (weatherCode === 511) {
          weatherCondition = 'Freezing Rain'; 
      } else if (weatherCode >= 600 && weatherCode <= 622) {
          weatherCondition = 'Snow'; 
      } else if (weatherCode >= 701 && weatherCode <= 781) {
          weatherCondition = 'Mist'; 
      } else if (weatherCode === 800) {
          weatherCondition = 'Clear Sky'; 
      } else if (weatherCode === 801) {
          weatherCondition = 'Few Clouds'; 
      } else if (weatherCode === 802) {
          weatherCondition = 'Scattered Clouds'; 
      } else if (weatherCode >= 803 && weatherCode <= 804) {
          weatherCondition = 'Overcast or Broken Clouds'; 
      }
      return weatherCondition;
    },

    getWindDirection(degree) {
      if (degree > 337.5 || degree <= 22.5) return 'North';
      if (degree > 22.5 && degree <= 45) return 'North-Northeast';
      if (degree > 45 && degree <= 67.5) return 'Northeast';
      if (degree > 67.5 && degree <= 90) return 'East-Northeast';
      if (degree > 90 && degree <= 112.5) return 'East';
      if (degree > 112.5 && degree <= 135) return 'East-Southeast';
      if (degree > 135 && degree <= 157.5) return 'Southeast';
      if (degree > 157.5 && degree <= 180) return 'South-Southeast';
      if (degree > 180 && degree <= 202.5) return 'South';
      if (degree > 202.5 && degree <= 225) return 'South-Southwest';
      if (degree > 225 && degree <= 247.5) return 'Southwest';
      if (degree > 247.5 && degree <= 270) return 'West-Southwest';
      if (degree > 270 && degree <= 292.5) return 'West';
      if (degree > 292.5 && degree <= 315) return 'West-Northwest';
      if (degree > 315 && degree <= 337.5) return 'Northwest';
      return 'North'; 
    },


    //attempting a utility function to get data to display on dashboard
    async getStationData(station) {
      const reports = await reportStore.getReportsByStationId(station._id);
      station.reports = reports;

      if (station.reports.length > 0) {
        const mostRecentReport = stationAnalytics.getMostRecentReport(station);
        const temperatureFahrenheit = miscUtils.getCelsiusToFahrenheit(mostRecentReport.temperature);
        const weatherCondition = miscUtils.getWeatherCondition(mostRecentReport.weatherCode);

        return {
          title: station.title,
          station: station,
          lat: station.lat,
          lon: station.lon,
          mostRecentReport: mostRecentReport,
          minTemperature: stationAnalytics.getMinTemperature(station),
          maxTemperature: stationAnalytics.getMaxTemperature(station),
          temperatureFahrenheit: temperatureFahrenheit,
          minWindSpeed: stationAnalytics.getMinWindSpeed(station),
          maxWindSpeed: stationAnalytics.getMaxWindSpeed(station),
          minPressure: stationAnalytics.getMinPressure(station),
          maxPressure: stationAnalytics.getMaxPressure(station),
          weatherCondition: weatherCondition,
        };
      } else {
        return {
          title: station.title,
          station: station,
          lat: station.lat,
          lon: station.lon,
        };
      }
  },

}
  