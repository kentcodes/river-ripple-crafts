import crypto from "crypto";

const ENC_KEY = process.env.LOCAL_ENC_KEY || "dev_dev_dev_dev_dev_dev_dev_dev"; // 32 bytes in prod
const IV_LEN = 12;

export function encryptJSON(obj: unknown) {
  const iv = crypto.randomBytes(IV_LEN);
  const key = Buffer.from(ENC_KEY.padEnd(32, "0").slice(0,32));
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const json = Buffer.from(JSON.stringify(obj));
  const enc = Buffer.concat([cipher.update(json), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, enc]); // store as single blob
}

export function decryptJSON(buf: Buffer) {
  const iv = buf.subarray(0,12);
  const tag = buf.subarray(12,28);
  const enc = buf.subarray(28);
  const key = Buffer.from((process.env.LOCAL_ENC_KEY || "").padEnd(32, "0").slice(0,32));
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);
  const dec = Buffer.concat([decipher.update(enc), decipher.final()]);
  return JSON.parse(dec.toString("utf8"));
}
