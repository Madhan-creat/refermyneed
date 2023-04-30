import referralModel from "../models/referral.model";

const getYourPostReferralservices = async (vendorLead_id: string) => {
  return new Promise((resolve, reject) => {
    referralModel
      .getYourPostReferralsModel(vendorLead_id)
      .then((result: any) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export default getYourPostReferralservices;
