import { ENV } from "@/constants/env";
import * as ExpoCrypto from "expo-crypto";
import CryptoJS from "crypto-js";

function bytesToWordArray(bytes: Uint8Array) {
  const hex = Array.from(bytes, (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");

  return CryptoJS.enc.Hex.parse(hex);
}

export async function encryptData(
  payload: Record<string, unknown>,
): Promise<string> {
  const key = CryptoJS.enc.Hex.parse(ENV.ALERT_ENCRYPTION_KEY);
  const iv = bytesToWordArray(await ExpoCrypto.getRandomBytesAsync(16));
  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(payload), key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return CryptoJS.enc.Base64.stringify(iv.concat(encrypted.ciphertext));
}
