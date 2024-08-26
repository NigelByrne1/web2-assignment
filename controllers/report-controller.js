import { stationStore } from "../models/station-store.js";
import { reportStore } from "../models/report-store.js";
import { getWeatherIconCode } from "../utils/misc-utils.js";


export const reportController = {
  async index(request, response) {
    const stationId = request.params.stationid;
    const reportId = request.params.reportid;
    console.log(`Editing Report ${reportId} from Station ${stationId}`);
    const viewData = {
      title: "Edit Report",
      station: await stationStore.getStationById(stationId),
      report: await reportStore.getReportById(reportId),
    };
    response.render("report-view", viewData);
  },

  async update(request, response) {
    const stationId = request.params.stationid;
    const reportId = request.params.reportid;
    const weatherCode = request.body.weatherCode;
    const updatedReport = {
      title: request.body.title,
      weatherCode: weatherCode,
      temperature: request.body.temperature,
      windSpeed: request.body.windSpeed,
      pressure: request.body.pressure,
      iconCode: getWeatherIconCode(weatherCode),
    };
    console.log(`Updating Report ${reportId} from Station ${stationId}`);
    const report = await reportStore.getReportById(reportId);
    await reportStore.updateReport(report, updatedReport);
    response.redirect("/station/" + stationId);
  },
};
