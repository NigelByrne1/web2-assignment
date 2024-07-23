import { playlistStore } from "../models/station-store.js";

export const dashboardController = {
  async index(request, response) {
    const viewData = {
      title: "Station Dashboard",
      playlists: await playlistStore.getAllStations(),
    };
    console.log("dashboard rendering");
    response.render("dashboard-view", viewData);
  },

  async addStation(request, response) {
    const newStation = {
      title: request.body.title,
    };
    console.log(`adding playlist ${newStation.title}`);
    await playlistStore.addStation(newStation);
    response.redirect("/dashboard");
  },
};
