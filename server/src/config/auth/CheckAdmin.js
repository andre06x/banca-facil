import * as httpStatus from "../constants/httpStatus.js";
import { APIException } from "../../exception/APIException.js";

export default async (req, res, next) => {
  try {
    const { admin } = req.auth;

    if (!admin) {
      throw new APIException(httpStatus.UNAUTHORIZED, "Sem acesso.");
    }

    return next();
  } catch (err) {
    const status = err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR;

    return res.status(status).json({
      status,
      message: err.message,
    });
  }
};
