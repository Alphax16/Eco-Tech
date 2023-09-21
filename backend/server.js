require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const _apiRouter = require("./routes/mlmodels.route");
const _csvRouter = require("./routes/csv.route");
const _shpRouter = require("./routes/shapefile.route");
const fileupload = require("express-fileupload");

const app = express();

app.use(fileupload({ useTempFiles: true }));
// Middlewares-
const corsOpts = {
  origin: "*",

  methods: ["GET", "POST"],

  allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOpts));
// app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(_apiRouter);
app.use(_csvRouter);
app.use(_shpRouter);

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send(`Hi from Server side 👋!!`);
});

app.listen(port, () => {
  console.log(`Server running at port '${port}'...`);
});
