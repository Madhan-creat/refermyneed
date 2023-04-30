import Connect from "../configs/mysql";
import Query from "../configs/mysql";

const userRegisterModel = async (
  name: string,
  email: string,
  encryptedpassword: string,
  userId: string,
  userLeadId: string,
  userIsExist: boolean
) => {
  let query = `insert into user (user_name,user_email,user_password,user_id,userlead_id) values ('${name}','${email}','${encryptedpassword}','${userId}','${userLeadId}')`;
  if (userIsExist) {
    query = `update user set user_name ='${name}',user_email= '${email}',user_password='${encryptedpassword}' where user_id='${userId}'`;
  }
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
const userLoginModel = async (email: string) => {
  let query = `select * from user where user_email='${email}'`;
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
const userModel = {
  userRegisterModel: userRegisterModel,
  userLoginModel: userLoginModel,
};
export default userModel;
