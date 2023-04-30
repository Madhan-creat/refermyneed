import { v4 as uuidv4 } from "uuid";
import * as jwt from "jsonwebtoken";
import config from "../configs/config";
import Hash, { compare, hash } from "bcrypt";
import userModel from "../models/user.model";
const userRegisterService = async (
  name: string,
  email: string,
  password: string,
  login: string,
  userIsExist: boolean
) => {
  let userId = uuidv4();
  const userLeadId = uuidv4();
  const encryptedpassword = await hash(password, 10);
  const checkuser = await isuserExist(email);
  if (userIsExist) {
    userId = login;
  }
  return new Promise((resolve, reject) => {
    if (!checkuser) {
      userModel
        .userRegisterModel(
          name,
          email,
          encryptedpassword,
          userId,
          userLeadId,
          userIsExist
        )
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      reject({ message: "user exist this email alreay" });
    }
  });
};

const userLoginService = async (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    userModel
      .userLoginModel(email)
      .then(async (result: any) => {
        if (result.length > 0) {
          const encryptedpassword = result[0].user_password;
          const user_id = result[0].user_id;
          const userLead_id = result[0].userlead_id;
          const ispasswordmatch = await compare(password, encryptedpassword);
          const token = jwt.sign({ id: user_id }, config.authsecretkey, {
            expiresIn: "3h",
          });

          if (ispasswordmatch) {
            resolve({
              user_id: user_id,
              userLead_id: userLead_id,
              token: token,
            });
          } else {
            resolve("Invaled email or password");
          }
        } else {
          reject("no user found to this email");
        }
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

const isuserExist = async (email: string) => {
  return new Promise((resolve, reject) => {
    userModel
      .userLoginModel(email)
      .then((result: any) => {
        if (result.length > 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((error) => {
        reject(false);
      });
  });
};
const userService = {
  userRegisterService: userRegisterService,
  userLoginService: userLoginService,
};
export default userService;
