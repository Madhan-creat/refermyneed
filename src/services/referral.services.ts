import referralModel from "../models/referral.model";
import { v4 as uuidv4 } from "uuid";
import shortid from "shortid";
const addReferralservices = async (
  organizationName: string,
  url: string,
  description: string,
  phone: string,
  vendorLead_id: string
) => {
  const referId = shortid();
  return new Promise((resolve, reject) => {
    referralModel
      .addReferralModel(
        organizationName,
        referId,
        url,
        description,
        phone,
        vendorLead_id
      )
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
const getAllReferralservices = async () => {
  return new Promise((resolve, reject) => {
    referralModel
      .getAllReferralsModel()
      .then((result: any) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
const getviewerDetailsservices = async (
  userlead_id: string,
  os: any,
  ip: any,
  browser: any,
  location: any,
  time: string
) => {
  return new Promise((resolve, reject) => {
    referralModel
      .getviewerDetailsModel(userlead_id, os, ip, browser, location, time)
      .then((result) => {
        resolve(result);
        console.log(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
const referralServices = {
  addReferralservices: addReferralservices,
  getAllReferralservices: getAllReferralservices,
  getviewerDetailsservices: getviewerDetailsservices,
};
export default referralServices;
