const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("config");
const path = require("path");

require("dotenv").config();

const port = process.env.PORT || 3001;
// const http = require("http").createServer(app);
app.use(cors());
app.use(
  bodyParser.urlencoded({
    limit: "200mb",
    extended: true,
    parameterLimit: 100000,
  })
);
app.use(bodyParser.json({ limit: "200mb" }));
app.use((request, response, next) => {
  next();
});

require("./src/Routes")(app);

const jsn = { status: "User Management Server" };
app.get("/*", (request, response) => {
  response.send(jsn);
});

app.listen(port, () => {
  console.log("listening on port ", port);
});
