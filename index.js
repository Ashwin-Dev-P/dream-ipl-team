//To enable .env file
require("dotenv").config();

const express = require("express");
const app = express();

//Cookie
const cookieParser = require("cookie-parser");
app.use(cookieParser());

//CORS
var cors = require("cors");
var corsOptions = {
  origin: ["http://localhost:3000", "http://192.168.0.150:3000"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
};
app.use(cors(corsOptions));

//DB connection
require("./src/models/");

//body parser deprecation replacement
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//import routes
const routes = require("./src/routes/");
app.use(routes);

//Client route
const path = require("path");
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "presidio", "build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on  port ${PORT}`);
});
