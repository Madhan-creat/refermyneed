import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import referralController from "../controller/Referral.controller";
import getYourPostReferralsController from "../controller/YourPosts.controller";
const jsonParser = bodyParser.json();

const referralsRoutes = express.Router();

//get all referales from db
referralsRoutes.get(
  "/user/getAllReferrals",
  jsonParser,
  referralController.getAllReferralsController
);

//get refer user details
referralsRoutes.get(
  "/user/getReferUrl/:user_id",
  jsonParser,
  referralController.getviewerDetailsController,
  referralController.getReferUrlController
);

//get your posted referrals
referralsRoutes.get(
  "/user/getYourPostAllReferrals/:vendorLead_id",
  jsonParser,
  getYourPostReferralsController
);

export default referralsRoutes;
