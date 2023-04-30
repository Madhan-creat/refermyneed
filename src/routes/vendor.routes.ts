import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import referralController from "../controller/Referral.controller";
import vendorController from "../controller/vendor.controller";
const jsonParser = bodyParser.json();

const vendorRoutes = express.Router();
vendorRoutes.post(
  "/vendor/register",
  jsonParser,
  vendorController.vendorRegisterController
);
vendorRoutes.post(
  "/vendor/login",
  jsonParser,
  vendorController.vendorLoginController
);
vendorRoutes.put(
  "/vendor/update/:vendorId",
  jsonParser,
  vendorController.vendorRegisterController
);

//add post from vendor to the user api
vendorRoutes.post(
  "/vendor/addreferral/:vendorLead_id",
  jsonParser,
  referralController.addReferralController
);
export default vendorRoutes;
