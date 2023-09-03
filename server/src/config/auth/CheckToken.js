import jwt from "jsonwebtoken";
import { promisify } from "util";

import * as secrets from "../constants/secrets.js";
import * as httpStatus from "../constants/httpStatus.js";
import { APIException } from "../../exception/APIException.js";
import { log } from "console";

const bearer = "bearer ";

const emptySpace = " ";

export default async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new APIException(httpStatus.UNAUTHORIZED, "Token de acesso não informado.");
    }

    let accessToken = authorization;

    if (accessToken.includes(emptySpace)) {
      accessToken = accessToken.split(emptySpace)[1];
    }

    const decode = await promisify(jwt.verify)(accessToken, secrets.API_SECRET);

    log("acess", accessToken);
    log("decode", decode);

    req.auth = decode.auth;
    return next();
  } catch (err) {
    const status = err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR;

    return res.status(status).json({
      status,
      message: err.message,
    });
  }
};
