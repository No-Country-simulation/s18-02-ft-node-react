/** @format */

import { CorsOptions } from "cors";
import { envs } from "../envs/env.config";

const whiteList: (string | undefined)[] = [envs.FRONTEND_URL];

export const corsConfig: CorsOptions = {
  origin: function (origin, callback) {
    if (origin) {
      whiteList.push(origin);
    }
    if (process.argv[2] === "--api") {
      whiteList.push(undefined);
    }
    if (!origin || whiteList.includes(origin!)) {
      callback(null, true);
    } else {
      callback(new Error("Cors Error"));
    }
  },
  credentials: true,
};
