import { userStore } from "../models/user-store.js";
import { accountsController } from "./accounts-controller.js";

export const userController = {
    async index(request, response) {
        const loggedInUser = await accountsController.getLoggedInUser(request);
        const viewData = {
            title: "Account Information",
            loggedInUser: loggedInUser,
        };
        console.log("Account Information rendering");

        if (loggedInUser._id === '92a15adb-0f1b-43d6-9c49-b2492dd02b54') {
            return response.render("guest-view", viewData);
        }

        response.render("user-view", viewData);

        
    },

    async update(request, response) {
        const loggedInUser = await accountsController.getLoggedInUser(request);
        const updatedUser = {
          firstName: request.body.firstName,
          lastName: request.body.lastName,
          email: request.body.email,
          password: request.body.password,
        };

        console.log(`Updating user ${loggedInUser._id}`);
        await userStore.updateUser(loggedInUser._id, updatedUser);
        response.redirect("/user");
      },
};
