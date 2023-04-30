import { Request, Response } from "express";
import getYourPostReferralservices from "../services/YourPost.services";
const getYourPostReferralsController = async (req: Request, res: Response) => {
  const vendorLead_id = req.params.vendorLead_id;
  if (!vendorLead_id) {
    return res.status(400).send({ message: "vendorLead_id not found" });
  }
  getYourPostReferralservices(vendorLead_id)
    .then((result) => {
      return res.status(200).send(result);
    })
    .catch((error) => {
      return res.status(400).send({ error });
    });
};
export default getYourPostReferralsController;
