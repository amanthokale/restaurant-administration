const menuController = require("../Controllers/menuController");
const USERS_ROUTE_BASE_URL = process.env.USERS_ROUTE_BASE_URL;
require("dotenv").config();

console.log("USERS_ROUTE_BASE_URL --->", USERS_ROUTE_BASE_URL);

module.exports = (app) => {
  app.post(
    "/" + USERS_ROUTE_BASE_URL + "/addMenuItems",
    menuController.addMenuItems
  );
  app.get("/" + USERS_ROUTE_BASE_URL + "/getMenu", menuController.getMenu);
  app.post(
    "/" + USERS_ROUTE_BASE_URL + "/updateMenuItemPrice",
    menuController.updateMenuItem
  );
  app.post(
    "/" + USERS_ROUTE_BASE_URL + "/addMenuItem",
    menuController.addMenuItem
  );
  app.post(
    "/" + USERS_ROUTE_BASE_URL + "/deleteMenuItem",
    menuController.deleteMenuItem
  );
};
