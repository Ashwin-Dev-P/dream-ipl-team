const mongoose = require("mongoose");
const config = require("../configurations/index.js");

//Image upload
const Grid = require("gridfs-stream");
const { GridFsStorage } = require("multer-gridfs-storage");
const multer = require("multer");
const crypto = require("crypto");

//Constants
const USE_MONGODB_ATLAS = config.db.USE_MONGODB_ATLAS;
const DB_NAME = config.db.name;
const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;

var uri;
if (USE_MONGODB_ATLAS === true || process.env.NODE_ENV === "production") {
  //Uses mongodb atlas cloud service
  uri = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@mycluster.gi2hp.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
} else {
  //Uses mongodb compass localhost storage
  uri = "mongodb://localhost:27017";
}

mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error) => {
    if (error) {
      console.error("Error connecting to the database");
      console.error(error);

      return res.json({
        message: "Error connecting to the database",
        status: 500,
        error,
      });
    } else {
      console.log("Connected to database");
    }
  }
);

//IMAGE STORAGE IN DATABASE
const conn = mongoose.connection;

var gfs;
const bucketName = "uploads";
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection(bucketName);
});

//Create Storage engine
const path = require("path");
const storage = new GridFsStorage({
  url: uri,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(24, (err, buf) => {
        if (err) {
          return reject(err);
        }

        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: bucketName,
        };

        resolve(fileInfo);
      });
    });
  },
});

//middleware to upload
const upload = multer({ storage });

module.exports = {
  upload,
  gfs,
};
