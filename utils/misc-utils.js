import { accountsController } from "../controllers/accounts-controller.js";

export function loginAsGuest(request, response) {
  request.body.email = "test@test.test";
  request.body.password = "test";
  console.log(`logging in guest account`);
  return accountsController.authenticate(request, response);
}