import { userStore } from "../models/user-store.js";
import { loginAsGuest } from "../utils/misc-utils.js";

export const accountsController = {
  loginAsGuest,
  
  index(request, response) {
    const viewData = {
      title: "Home",
    };
    response.render("index", viewData);
  },

  login(request, response) {
    const viewData = {
      title: "Login",
    };
    response.render("login-view", viewData);
  },

  logout(request, response) {
    response.cookie("playlist", "");
    response.redirect("/");
  },

  signup(request, response) {
    const viewData = {
      title: "Signup",
    };
    response.render("signup-view", viewData);
  },

  async register(request, response) {
    const user = request.body;
    await userStore.addUser(user);
    console.log(`registering ${user.email}`);
    response.redirect("/");
  },

  async authenticate(request, response) {
    const user = await userStore.getUserByEmail(request.body.email);
    if (user) {
      response.cookie("playlist", user.email);
      console.log(`logging in ${user.email}`);
      response.redirect("/dashboard");
    } else {
      response.redirect("/login");
    }
  },

  async getLoggedInUser(request) {
    const userEmail = request.cookies.playlist;
    return await userStore.getUserByEmail(userEmail);
  },
};