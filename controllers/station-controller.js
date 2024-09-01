import { reportStore } from "../models/report-store.js";
import { stationStore } from "../models/station-store.js";
import { getWeatherIconCode } from "../utils/misc-utils.js";
import { stationAnalytics } from "../utils/station-analytics.js";
import { miscUtils } from "../utils/misc-utils.js";
import dayjs from "dayjs";



export const stationController = {
    async index (request, response) {
        
        const station = await stationStore.getStationById(request.params.id);
        if (station.reports.length> 0 ){
            const mostRecentReport = stationAnalytics.getMostRecentReport(station);
            const temperatureFahrenheit = miscUtils.getCelsiusToFahrenheit(mostRecentReport.temperature);
            const weatherCondition = miscUtils.getWeatherCondition(mostRecentReport.weatherCode);
            const viewData = {
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
            //console.log(temperatureFahrenheit);
            response.render("station-view", viewData);
        } else {
            const viewData = {
                title: station.title,
                station: station,
                lat: station.lat,
                lon: station.lon,
        }
        response.render("new-station-view", viewData);
        }
    },

    async addReport(request, response) {
        const station = await stationStore.getStationById(request.params.id);
        const weatherCode = Number(request.body.weatherCode);
        const newReport = {
            weatherCode: weatherCode,
            temperature: Number(request.body.temperature),
            windSpeed: Number(request.body.windSpeed),
            windDirection: (request.body.windDirection),
            pressure: Number(request.body.pressure),
            iconCode: getWeatherIconCode(weatherCode),
            timestamp: dayjs().format('MMMM D, YYYY h:mm A'),
        }
        console.log('adding new weather report');
        await reportStore.addReport(station._id, newReport);
        response.redirect("/station/" + station._id);
    },
    
    async deleteReport(request, response) {
        const stationId = request.params.stationid;
        const reportId = request.params.reportid;
        console.log(`Deleting Report ${reportId} from Station ${stationId}`);
        await reportStore.deleteReport(request.params.reportId);
        response.redirect("/station/" + stationId);
      },

    async autoUpdate(request, response) {
        const station = await stationStore.getStationById(request.params.id);
    
        const apiKey = "432f6790dcd0195c35c9fe3711654b4f"; 
        const stationTitle = station.title; 
    
        const apiResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${stationTitle}&units=metric&appid=${apiKey}`);
        const data = await apiResponse.json();
    
        const weatherCode = data.weather[0].id;
        const newReport = {
          weatherCode: weatherCode,
          temperature: data.main.temp,
          windSpeed: data.wind.speed,
          windDirection: miscUtils.getWindDirection(data.wind.deg),
          pressure: data.main.pressure,
          iconCode: getWeatherIconCode(weatherCode),
          timestamp: dayjs().format('MMMM D, YYYY h:mm A'),
        };
    
        console.log(`Auto-updating report for Station ${station._id}`);
        await reportStore.addReport(station._id, newReport);
        response.redirect("/station/" + station._id);
    },
};
