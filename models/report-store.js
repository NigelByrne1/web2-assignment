import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";
import { getWeatherIconCode } from "../utils/misc-utils.js";

const db = initStore("reports");

export const reportStore = {
  async getAllReports() {
    await db.read();
    return db.data.reports;
  },

  async addReport(stationId, report) {
    await db.read();
    report._id = v4();
    report.stationid = stationId;
    db.data.reports.push(report);
    await db.write();
    return report;
  },

  async getReportsByStationId(id) {
    await db.read();
    return db.data.reports.filter((report) => report.stationid === id);
  },

  async getReportById(id) {
    await db.read();
    return db.data.reports.find((report) => report._id === id);
  },

  async deleteReport(id) {
    await db.read();
    const index = db.data.reports.findIndex((report) => report._id === id);
    db.data.reports.splice(index, 1);
    await db.write();
  },

  async deleteAllReports() {
    db.data.reports = [];
    await db.write();
  },

  async updateReport(report, updatedReport) {
    report.weatherCode = Number(updatedReport.weatherCode);
    report.temperature = Number(updatedReport.temperature);
    report.windSpeed = Number(updatedReport.windSpeed);
    report.pressure = Number(updatedReport.pressure);
    report.windDirection = updatedReport.windDirection;

    report.iconCode = getWeatherIconCode(updatedReport.weatherCode);

    await db.write();
  },
};
