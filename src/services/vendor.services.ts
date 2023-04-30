import vendorModel from "../models/vendor.model";
import { v4 as uuidv4 } from "uuid";
import * as jwt from "jsonwebtoken";
import config from "../configs/config";
import Hash, { compare, hash } from "bcrypt";
const vendorRegisterService = async (
  name: string,
  email: string,
  password: string,
  login: string,
  userIsExist: boolean
) => {
  let vendorId = uuidv4();
  const vendorLeadId = uuidv4();
  const encryptedpassword = await hash(password, 10);
  const checkuser = await isvendorExist(email);
  console.log("+++++++", checkuser);

  if (userIsExist) {
    vendorId = login;
  }
  return new Promise((resolve, reject) => {
    console.log(!checkuser);

    if (!checkuser) {
      vendorModel
        .vendorRegisterModel(
          name,
          email,
          encryptedpassword,
          vendorId,
          vendorLeadId,
          userIsExist
        )
        .then((result) => {
          resolve(result);
          console.log("serverice promise", result);
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      reject({ message: "user exist this email alreay" });
    }
  });
};

const vendorLoginService = async (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    vendorModel
      .vendorLoginModel(email)
      .then(async (result: any) => {
        if (result.length > 0) {
          const encryptedpassword = result[0].vendor_password;
          const vendor_id = result[0].vendor_id;
          const vendorLead_id = result[0].vendorLead_id;
          const ispasswordmatch = await compare(password, encryptedpassword);
          const token = jwt.sign({ id: vendor_id }, config.authsecretkey, {
            expiresIn: "3h",
          });

          if (ispasswordmatch) {
            resolve({
              vendor_id: vendor_id,
              vendorLead_id: vendorLead_id,
              token: token,
            });
          } else {
            resolve("Invaled email or password");
          }
        } else {
          reject("no user found to this email");
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const isvendorExist = async (email: string) => {
  return new Promise((resolve, reject) => {
    vendorModel
      .vendorLoginModel(email)
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
const vendorService = {
  vendorRegisterService: vendorRegisterService,
  vendorLoginService: vendorLoginService,
};
export default vendorService;
