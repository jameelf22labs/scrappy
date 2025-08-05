import crypto from "crypto";

export const hashObject = (obj: any) => {
  return crypto.createHash("md5").update(JSON.stringify(obj)).digest("hex");
};
