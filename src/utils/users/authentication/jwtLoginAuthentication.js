const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

//models
const mongoose = require("mongoose");
const UserModel = mongoose.model("user");

//utils
const isValidId = require("../../shared/isValidId");

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = async function jwtLoginAuthentication(req, res, next) {
  return cookieParser()(req, res, async function () {
    if ((await req.cookies.jwt) !== undefined) {
      const jwtToken = await req.cookies.jwt;
      try {
        var decoded = await jwt.verify(jwtToken, JWT_SECRET);
      } catch {
        return res.json({
          message: "Jwt token expired. Please login again",
          status: 401,
        });
      }

      const decoded_id = mongoose.Types.ObjectId(decoded.id); // decoded.id;
      console.log(decoded_id);
      const valid_user_id = await isValidId(decoded_id);

      if (valid_user_id) {
        const user = await UserModel.findOne({ _id: decoded_id })
          .select("-_id")
          .lean();

        if (user) {
          if (req.body) {
            req.body.user_id = decoded_id;
          } else {
            req.body = {
              user_id: decoded_id,
            };
          }

          return next();
        } else {
          console.error("User is not defined or not available");
        }
      } else {
        console.error("Invalid user id when decoding jwt");
      }
    } else {
      console.error("jwt cookie is undefined", req.cookies);
    }

    return res.json({
      message: "Unauthorized",
      status: 401,
    });
  });
};
