import Connect from "../configs/mysql";
import Query from "../configs/mysql";

const addReferralModel = async (
  organizationName: string,
  referId: string,
  url: string,
  description: string,
  phone: string,
  vendorLead_id: string
) => {
  let query = `insert into addreferrals (organization_name,refer_id,url,description,phone_number,vendorLead_id) values ('${organizationName}','${referId}','${url}','${description}','${phone}','${vendorLead_id}')`;
  return new Promise((resolve, reject) => {
    Connect.Connect()
      .then((connection) => {
        Query.Query(connection, query)
          .then((result) => {
            resolve(result);
          })
          .catch((error) => {
            reject(error);
          })
          .finally(() => {
            connection.end();
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getAllReferralsModel = async () => {
  let query = `select a.id,a.organization_name,a.url,a.description,a.phone_number,v.vendor_name,v.vendor_email from addreferrals as a,vendor as v where v.vendorLead_id = a.vendorLead_id `;

  return new Promise((resolve, reject) => {
    Connect.Connect()
      .then((connection: any) => {
        Query.Query(connection, query)
          .then((result: any) => {
            resolve(result);
          })
          .catch((error) => {
            reject(error);
          })
          .finally(() => {
            connection.end();
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getviewerDetailsModel = async (
  userlead_id: string,
  os: any,
  ip: any,
  browser: any,
  location: any,
  time: string
) => {
  let query = `insert into referral_details (userlead_id,viewer_os,viewer_ip,viewer_browers,viewer_location,viewer_using_time) values ('${userlead_id}','${os}','${ip}','${browser}','${location}','${time}')`;
  return new Promise((resolve, reject) => {
    Connect.Connect()
      .then((connection: any) => {
        Query.Query(connection, query)
          .then((result) => {
            resolve(result);
          })
          .catch((error) => {
            reject(error);
          })
          .finally(() => {
            connection.end();
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getviewerReferralModel = async (id: number) => {
  let query = `select url from addreferrals where id='${id}'`;
  return new Promise((resolve, reject) => {
    Connect.Connect()
      .then((connection: any) => {
        Query.Query(connection, query)
          .then((result) => {
            console.log(result);

            resolve(result);
          })
          .catch((error) => {
            reject(error);
          })
          .finally(() => {
            connection.end();
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
};
const getYourPostReferralsModel = async (vendorLead_id: string) => {
  let query = `select a.id,a.organization_name,a.url,a.description,a.phone_number,v.vendor_name,v.vendor_email from addreferrals as a,vendor as v where v.vendorLead_id =${vendorLead_id} `;
  return new Promise((resolve, reject) => {
    Connect.Connect()
      .then((connection: any) => {
        Query.Query(connection, query)
          .then((result: any) => {
            resolve(result);
          })
          .catch((error) => {
            reject(error);
          })
          .finally(() => {
            connection.end();
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
};
const referralModel = {
  addReferralModel: addReferralModel,
  getAllReferralsModel: getAllReferralsModel,
  getviewerDetailsModel: getviewerDetailsModel,
  getviewerReferralModel: getviewerReferralModel,
  getYourPostReferralsModel: getYourPostReferralsModel,
};
export default referralModel;
