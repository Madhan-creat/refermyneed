import express, { Request, Response } from "express";
import geoip from "geoip-lite";
const parser = require("ua-parser-js");
import fetch from "node-fetch";
import referralModel from "../models/referral.model";
import referralServices from "../services/referral.services";

const addReferralController = async (req: Request, res: Response) => {
  const { organizationName, url, description, phone } = req.body || {};
  const vendorLead_id = req.params.vendorLead_id;
  if (!organizationName) {
    return res.status(400).send({ message: "organization Name not found" });
  }
  if (!url) {
    return res.status(400).send({ message: "url not found" });
  }
  if (!description) {
    return res.status(400).send({ message: "description not found" });
  }
  if (!phone) {
    return res.status(400).send({ message: "phone not found" });
  }
  if (!vendorLead_id) {
    return res.status(400).send({ message: "vendorLead_id not found" });
  }
  referralServices
    .addReferralservices(
      organizationName,
      url,
      description,
      phone,
      vendorLead_id
    )
    .then((result) => {
      return res.status(200).send(result);
      console.log("succsh");
    })
    .catch((error) => {
      return res.status(400).send({ error });
    });
};

const getAllReferralsController = async (req: Request, res: Response) => {
  referralServices
    .getAllReferralservices()
    .then((result) => {
      console.log(result, "===========");
      return res.status(200).send(result);
    })
    .catch((error) => {
      console.log(error, "===========");
      return res.status(400).send({ error });
    });
};

const getReferUrlController = async (req: Request, res: Response) => {
  const id: number = 1;
  const user_id = req.params.user_id;
  const addon = "?ref=";
  referralModel
    .getviewerReferralModel(id)
    .then((result: any) => {
      const referrelurl = `${result[0].url}${addon}${user_id}`;
      console.log(referrelurl);
      return res.status(200).redirect(referrelurl);
    })
    .catch((error) => {
      return res.status(400).send({ error });
    });
};

const getviewerDetailsController = async (
  req: Request,
  res: Response,
  next: any
) => {
  const userlead_id = req.params.userlead_id;
  const ip: any = await ipAddress();
  const userAgent = req.headers["user-agent"];
  const result = parser(userAgent);
  const browser = result.browser.name;
  const os = result.os.name;
  // const engine = result.engine;
  // const device = result.device;
  // const cpu = result.cpu;
  const location = geoip.lookup(ip)?.city;
  const dateTime = require("node-datetime");
  const dt = dateTime.create();
  const time = dt.format("Y-m-d H:M:S");
  console.log(userlead_id, os, ip, browser, location, time);
  referralServices
    .getviewerDetailsservices(userlead_id, os, ip, browser, location, time)
    .then((result) => {
      console.log(result);
      return next();
    })
    .catch((error) => {
      return res.status(400).send({ error });
    });
};

const ipAddress = async () => {
  return new Promise(async (resolve, reject) => {
    await fetch("https://api.ipify.org?format=json")
      .then((result: any) => result.json())
      .then((data) => {
        const ip = data.ip;
        console.log(ip);
        resolve(ip);
      });
  });
};

const referralController = {
  addReferralController: addReferralController,
  getAllReferralsController: getAllReferralsController,
  getReferUrlController: getReferUrlController,
  getviewerDetailsController: getviewerDetailsController,
};

export default referralController;
function getOS(userAgent: string | undefined) {
  throw new Error("Function not implemented.");
}
