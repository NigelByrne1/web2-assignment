import { reportStore } from "../models/report-store.js";
import { stationStore } from "../models/station-store.js";

export const stationController = {
    async index (request, response) {
        const station = await stationStore.getStationById(request.params.id);
        const viewData = {
            title: station.title,
            station: station,
        };
        response.render("station-view", viewData);
    },

    async addReport(request, response) {
        const station = await stationStore.getStationById(request.params.id);
        const newReport = {
            weatherCode: Number(request.body.weatherCode),
            temperature: Number(request.body.temperature),
            windSpeed: Number(request.body.temperature),
            pressure: Number(request.body.pressure),
        }
        console.log('adding new weather report in ${station.title}');
        await reportStore.addReport(station._id, newReport);
        response.redirect("/station/" + station._id);
    },
    
    async deleteReport(request, response) {
        const stationId = request.params.stationid;
        const reportId = request.params.reportid;
        console.log(`Deleting Report ${reportId} from Station ${stationId}`);
        await reportStore.deleteReport(request.params.reportId);
        response.redirect("/station/" + stationId);
      }
};
