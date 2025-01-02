import React from "react";
import { Stack, Typography } from "@mui/material";
import CONSTANT from "./const";
import moment from "moment";
const CryptoJS = require("crypto-js");

// Khóa và IV cho AES
const key = CryptoJS.enc.Utf8.parse("12345678901234567890123456789012"); // 32 bytes
const iv = CryptoJS.enc.Utf8.parse("1234567890123456"); // 16 bytes
console.log({ key, iv });

export const inputFormat = (input, format = ".000 đ") => {
  if (!input || typeof input !== "string") return "";
  if (input.includes(format)) {
    input = input.replace(format, "");
  } else if (input.includes(format.slice(0, -1))) {
    input = input.slice(0, -format.length);
  }

  let result = inputFormatToInt(input)
    .toString()
    .replace(/\D/g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return inputFormatToInt(result) ? result + format : "";
};

export const inputFormatToInt = (input) => {
  input = input ? input.replace(/[^0-9]/g, "") : 0;
  return parseInt(input);
};

export const encryption = (data) => {
  console.log("encryption", typeof data, data);
  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
};

export const decryption = (data) => {
  console.log("decryption", typeof data, data);
  const decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return JSON.parse(CryptoJS.enc.Utf8.stringify(decrypted));
};
