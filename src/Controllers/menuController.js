const apiResponse = require("../Components/apiResponse");
const {
  body,
  query,
  sanitizeBody,
  validationResult,
} = require("express-validator");
const getDb = require("../Config/db");
var ObjectID = require("mongodb").ObjectID;

module.exports.addMenuItems = [
  body("user_id").exists().withMessage("user_id must be specified"),
  body("menu").exists().withMessage("menu must be specified"),
  async (request, response) => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          response,
          "validation error",
          errors.array()
        );
      } else {
        const db = await getDb();
        const myobj = request.body;
        let userExists = await db
          .collection("users")
          .findOne({ _id: ObjectID(myobj.user_id) });
        if (userExists) {
          let insertObj = {
            user_id: myobj.user_id,
            menu: myobj.menu,
          };
          await db.collection("restaurant-menu").insertOne(insertObj);
          return apiResponse.successResponse(
            response,
            "Menu added successsfully"
          );
        } else {
          return apiResponse.successResponse(response, "user does not exists");
        }
      }
    } catch (e) {
      console.log(e);
      return apiResponse.errorResponse(response, "Something went wrong!!");
    }
  },
];

module.exports.getMenu = [
  query("user_id").exists().withMessage("user_id must be specified"),
  async (request, response) => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          response,
          "validation error",
          errors.array()
        );
      } else {
        const db = await getDb();
        const myobj = request.query;
        let userExists = await db
          .collection("users")
          .findOne({ _id: ObjectID(myobj.user_id) });
        if (userExists) {
          let menu = await db
            .collection("restaurant-menu")
            .findOne({ user_id: myobj.user_id });
          if (menu) {
            return apiResponse.successResponseWithData(
              response,
              "success",
              menu
            );
          } else {
            return apiResponse.successResponse(response, "Menu not found");
          }
        } else {
          return apiResponse.successResponse(response, "user does not exists");
        }
      }
    } catch (e) {
      console.log(e);
      return apiResponse.errorResponse(response, "Something went wrong!!");
    }
  },
];

module.exports.updateMenuItem = [
  body("user_id").exists().withMessage("user_id must be specified"),
  body("menu_item").exists().withMessage("menu_item must be specified"),
  body("price").exists().withMessage("price must be specified"),
  async (request, response) => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          response,
          "validation error",
          errors.array()
        );
      } else {
        const db = await getDb();
        const myobj = request.body;
        let userExists = await db
          .collection("users")
          .findOne({ _id: ObjectID(myobj.user_id) });
        if (userExists) {
          let menu = await db
            .collection("restaurant-menu")
            .findOne({ user_id: myobj.user_id });
          if (menu) {
            let found = false;
            for (let i = 0; i < menu.menu.starter.length; i++) {
              if (menu.menu.starter[i].name == myobj.menu_item) {
                found = true;
                menu.menu.starter[i].price = myobj.price;
              }
            }
            for (let i = 0; i < menu.menu.mainCourse.length; i++) {
              if (menu.menu.mainCourse[i].name == myobj.menu_item) {
                found = true;
                menu.menu.mainCourse[i].price = myobj.price;
              }
            }
            for (let i = 0; i < menu.menu.dessert.length; i++) {
              if (menu.menu.dessert[i].name == myobj.menu_item) {
                found = true;
                menu.menu.dessert[i].price = myobj.price;
              }
            }
            for (let i = 0; i < menu.menu.drink.length; i++) {
              if (menu.menu.drink[i].name == myobj.menu_item) {
                found = true;
                menu.menu.drink[i].price = myobj.price;
              }
            }
            if (found) {
              await db
                .collection("restaurant-menu")
                .updateOne(
                  { user_id: myobj.user_id },
                  { $set: { menu: menu.menu } }
                );
              let resMenu = await db
                .collection("restaurant-menu")
                .findOne({ user_id: myobj.user_id });
              return apiResponse.successResponseWithData(
                response,
                "menu item price updated",
                resMenu
              );
            } else {
              return apiResponse.successResponse(
                response,
                "Menu Item not found"
              );
            }
          } else {
            return apiResponse.successResponse(response, "Menu not found");
          }
        } else {
          return apiResponse.successResponse(response, "user does not exists");
        }
      }
    } catch (e) {
      console.log(e);
      return apiResponse.errorResponse(response, "Something went wrong!!");
    }
  },
];
module.exports.addMenuItem = [
  body("user_id").exists().withMessage("user_id must be specified"),
  body("menu_item").exists().withMessage("menu_item must be specified"),
  body("price").exists().withMessage("price must be specified"),
  body("category").exists().withMessage("price must be specified"),
  async (request, response) => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          response,
          "validation error",
          errors.array()
        );
      } else {
        const db = await getDb();
        const myobj = request.body;
        let userExists = await db
          .collection("users")
          .findOne({ _id: ObjectID(myobj.user_id) });
        if (userExists) {
          let menu = await db
            .collection("restaurant-menu")
            .findOne({ user_id: myobj.user_id });
          if (menu) {
            if (myobj.category == "starter") {
              menu.menu.starter.push({
                name: myobj.menu_item,
                price: myobj.price,
              });
            } else if (myobj.category == "mainCourse") {
              menu.menu.mainCourse.push({
                name: myobj.menu_item,
                price: myobj.price,
              });
            } else if (myobj.category == "dessert") {
              menu.menu.dessert.push({
                name: myobj.menu_item,
                price: myobj.price,
              });
            } else if (myobj.category == "drink") {
              menu.menu.drink.push({
                name: myobj.menu_item,
                price: myobj.price,
              });
            } else {
              return apiResponse.successResponse(response, "Invalid category");
            }
            await db
              .collection("restaurant-menu")
              .updateOne(
                { user_id: myobj.user_id },
                { $set: { menu: menu.menu } }
              );
            let resMenu = await db
              .collection("restaurant-menu")
              .findOne({ user_id: myobj.user_id });
            return apiResponse.successResponseWithData(
              response,
              "menu item added successfully",
              resMenu
            );
          } else {
            return apiResponse.successResponse(response, "Menu not found");
          }
        } else {
          return apiResponse.successResponse(response, "user does not exists");
        }
      }
    } catch (e) {
      console.log(e);
      return apiResponse.errorResponse(response, "Something went wrong!!");
    }
  },
];

module.exports.deleteMenuItem = [
  body("user_id").exists().withMessage("user_id must be specified"),
  body("menu_item").exists().withMessage("menu_item must be specified"),
  body("price").exists().withMessage("price must be specified"),
  async (request, response) => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          response,
          "validation error",
          errors.array()
        );
      } else {
        const db = await getDb();
        const myobj = request.body;
        let userExists = await db
          .collection("users")
          .findOne({ _id: ObjectID(myobj.user_id) });
        if (userExists) {
          let menu = await db
            .collection("restaurant-menu")
            .findOne({ user_id: myobj.user_id });
          if (menu) {
            let found = false;
            for (let i = 0; i < menu.menu.starter.length; i++) {
              if (menu.menu.starter[i].name == myobj.menu_item) {
                found = true;
                let filteredarray = menu.menu.starter.filter(
                  (starter) => starter.name != myobj.menu_item
                );
                menu.menu.starter[i] = filteredarray;
              }
            }
            for (let i = 0; i < menu.menu.mainCourse.length; i++) {
              if (menu.menu.mainCourse[i].name == myobj.menu_item) {
                let filteredarray = menu.menu.mainCourse.filter(
                  (mainCourse) => mainCourse.name != myobj.menu_item
                );
                menu.menu.mainCourse[i] = filteredarray;
              }
            }
            for (let i = 0; i < menu.menu.dessert.length; i++) {
              if (menu.menu.dessert[i].name == myobj.menu_item) {
                found = true;
                let filteredarray = menu.menu.dessert.filter(
                  (dessert) => dessert.name != myobj.menu_item
                );
                menu.menu.dessert[i] = filteredarray;
              }
            }
            for (let i = 0; i < menu.menu.drink.length; i++) {
              if (menu.menu.drink[i].name == myobj.menu_item) {
                found = true;
                let filteredarray = menu.menu.drink.filter(
                  (drink) => drink.name != myobj.menu_item
                );
                menu.menu.drink[i] = filteredarray;
              }
            }
            if (found) {
              await db
                .collection("restaurant-menu")
                .updateOne(
                  { user_id: myobj.user_id },
                  { $set: { menu: menu.menu } }
                );
              let resMenu = await db
                .collection("restaurant-menu")
                .findOne({ user_id: myobj.user_id });
              return apiResponse.successResponseWithData(
                response,
                "menu item deleted successfully",
                resMenu
              );
            } else {
              return apiResponse.successResponse(
                response,
                "Menu Item not found"
              );
            }
          } else {
            return apiResponse.successResponse(response, "Menu not found");
          }
        } else {
          return apiResponse.successResponse(response, "user does not exists");
        }
      }
    } catch (e) {
      console.log(e);
      return apiResponse.errorResponse(response, "Something went wrong!!");
    }
  },
];
