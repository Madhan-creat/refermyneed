import Connect from "../configs/mysql";
import Query from "../configs/mysql";

const vendorRegisterModel = async (
  name: string,
  email: string,
  encryptedpassword: string,
  vendorId: string,
  vendorLeadId: string,
  userIsExist: boolean
) => {
  let query = `insert into vendor (vendor_name,vendor_email,vendor_password,vendor_id,vendorLead_id) values ('${name}','${email}','${encryptedpassword}','${vendorId}','${vendorLeadId}')`;
  if (userIsExist) {
    query = `update vendor set vendor_name ='${name}',vendor_email= '${email}',vendor_password='${encryptedpassword}' where vendor_id='${vendorId}'`;
  }
  return new Promise((resolve, reject) => {
    Connect.Connect()
      .then((connection) => {
        Query.Query(connection, query)
          .then((result) => {
            resolve(result);
            console.log("connects");
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
const vendorLoginModel = async (email: string) => {
  let query = `select * from vendor where vendor_email='${email}'`;
  return new Promise((resolve, reject) => {
    Connect.Connect()
      .then((connection: any) => {
        Query.Query(connection, query)
          .then((result: any) => {
            resolve(result);
            console.log("model file");
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
const vendorModel = {
  vendorRegisterModel: vendorRegisterModel,
  vendorLoginModel: vendorLoginModel,
};
export default vendorModel;
