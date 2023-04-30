import { Request, Response } from "express";
import vendorService from "../services/vendor.services";

const vendorRegisterController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body || {};
  const login = req.params.vendorId;
  const userIsExist: boolean = Boolean(login);

  if (!name) {
    return res.status(400).send({ message: "name not found" });
  }
  if (!email) {
    return res.status(400).send({ message: "email not found" });
  }
  if (!password) {
    return res.status(400).send({ message: "password not found" });
  }
  vendorService
    .vendorRegisterService(name, email, password, login, userIsExist)
    .then((success) => {
      return res.status(200).send({ message: "Got success from User service" });
    })
    .catch((error) => {
      return res.status(400).send({ error });
    });
};

const vendorLoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body || {};
  if (!email) {
    return res.status(400).send({ message: "email not found" });
  }
  if (!password) {
    return res.status(400).send({ message: "password not found" });
  }
  vendorService
    .vendorLoginService(email, password)
    .then((result) => {
      return res.status(200).send({ result });
    })
    .catch((error) => {
      return res
        .status(400)
        .send({ message: "Got  erorrr  from User service" });
    });
};
const vendorController = {
  vendorLoginController: vendorLoginController,
  vendorRegisterController: vendorRegisterController,
};

export default vendorController;
