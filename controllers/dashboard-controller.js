import { stationStore } from "../models/station-store.js";
import { accountsController } from "./accounts-controller.js";
import { reportStore } from "../models/report-store.js";
//import { miscUtils } from "../utils/misc-utils.js";

export const dashboardController = {
  async index(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    
    let stations = await stationStore.getStationByUserId(loggedInUser._id);

    //attmepting to itterate through the stations to display the report data 
    //const processedStations = stations.map(station => miscUtils.getStationData(station));

    
    stations.sort((a, b) => {
      if (a.title > b.title) {
        return 1;  // Place/sort b before a
      } else if (a.title < b.title) {
        return -1;  // Place/sort a before b
      } else {
        return 0; // Same titles, no change in order
      }
    });
    
    const viewData = {
      title: "Dashboard",
      stations: stations, 
      //stations: processedStations 
    };
    
    console.log("dashboard rendering");
    response.render("dashboard-view", viewData);
  },

  async addStation(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const newStation = {
      title: request.body.title,
      lat: Number(request.body.lat),
      lon: Number(request.body.lon),
      userid: loggedInUser._id,
    };
    console.log(`adding station ${newStation.title}`);
    await stationStore.addStation(newStation);
    response.redirect("/dashboard");
  },

  async deleteStation(request, response) {
    const stationId = request.params.id;
    console.log(`Deleting Station ${stationId}`);

    await reportStore.deleteReportsByStationId(stationId);
    await stationStore.deleteStationById(stationId);

    response.redirect("/dashboard");
  },

};
