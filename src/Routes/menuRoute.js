const menuController = require("../Controllers/menuController");
const ADMINISTRATION_ROUTE_BASE_URL = process.env.ADMINISTRATION_ROUTE_BASE_URL;
require("dotenv").config();

console.log(
  "ADMINISTRATION_ROUTE_BASE_URL --->",
  ADMINISTRATION_ROUTE_BASE_URL
);

module.exports = (app) => {
  app.post(
    "/" + ADMINISTRATION_ROUTE_BASE_URL + "/addMenuItems",
    menuController.addMenuItems
  );
  app.get(
    "/" + ADMINISTRATION_ROUTE_BASE_URL + "/getMenu",
    menuController.getMenu
  );
  app.post(
    "/" + ADMINISTRATION_ROUTE_BASE_URL + "/updateMenuItemPrice",
    menuController.updateMenuItem
  );
  app.post(
    "/" + ADMINISTRATION_ROUTE_BASE_URL + "/addMenuItem",
    menuController.addMenuItem
  );
  app.post(
    "/" + ADMINISTRATION_ROUTE_BASE_URL + "/deleteMenuItem",
    menuController.deleteMenuItem
  );
};
