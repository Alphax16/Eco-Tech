const cloudinary = require("cloudinary").v2;
const fileupload = require("express-fileupload");

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.APIKEY,
  api_secret: process.env.APISECRET,
  secure: true,
});

module.exports = cloudinary;
