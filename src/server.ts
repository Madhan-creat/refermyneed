import express, { Request, Response } from "express";
import referralsRoutes from "./routes/referrals.routes";
import userRoutes from "./routes/user.routes";
import vendorRoutes from "./routes/vendor.routes";
const app = express();
var cors = require("cors");
app.use(cors());
app.options("*", cors());
const http = require("url");
const API_VERSION = "/api/v1";
app.use(API_VERSION, vendorRoutes);
app.use(API_VERSION, userRoutes);
app.use(API_VERSION, referralsRoutes);
app.listen(4000, () => {
  console.log("application run 4000");
});
