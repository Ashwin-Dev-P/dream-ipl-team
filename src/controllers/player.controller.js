//Modules
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");

//services
const player_services = require("../services/player.services");

const {
  get_all_players_repository,
} = require("../repositories/player.repository");

const get_all_players_controller = async (req, res) => {
  const result = await get_all_players_repository();
  return res.json(result);
};

const post_player_controller = async (req, res) => {
  const { foreigner, name, value, category, team_id } = req.body;

  if (req.file && req.file.id) {
    const image_details = req.file;
    var image_id = image_details.id;
  }

  const result = await player_services.post_player_service(
    foreigner,
    name,
    value,
    category,
    team_id,
    image_id
  );

  return res.json(result);
};

const get_image_controller = async (req, res) => {
  const conn = await mongoose.connection;

  var gfs;
  const bucketName = "uploads";

  gfs = await Grid(conn.db, mongoose.mongo);
  await gfs.collection(bucketName);

  gridfsBucket = await new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: bucketName,
  });

  const image_id = mongoose.Types.ObjectId(req.params.image_id);
  await gfs.files.findOne({ _id: image_id }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      console.error("File not found");
      return res.status(404).json({
        err: "No file exists",
      });
    }

    // Check if image
    if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
      var readStream = gridfsBucket.openDownloadStream(file._id);
      readStream.pipe(res);
    } else {
      res.status(404).json({
        err: "Not an image",
      });
    }
  });
};

module.exports = {
  post_player_controller,
  get_all_players_controller,
  get_image_controller,
};
