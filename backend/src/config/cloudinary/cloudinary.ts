import cloudinary from "cloudinary";
import { envs } from "../envs/env.config";
cloudinary.v2.config({
  cloud_name: envs.CLOUDINARY_NAME,
  api_key: envs.CLOUDINARY_KEY,
  api_secret: envs.CLOUDINARY_SECRET,
});

export { cloudinary };
