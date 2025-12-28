import crypto from "crypto";

export const validateInput = (str1: string, str2: string): boolean => {
  const trimmedStr1 = `${str1}`.trim();
  const trimmedStr2 = `${str2}`.trim();

  const buffer1: Buffer = Buffer.from(trimmedStr1, "utf8");
  const buffer2: Buffer = Buffer.from(trimmedStr2, "utf8");

  const uintBuffer1 = new Uint8Array(buffer1);
  const uintBuffer2 = new Uint8Array(buffer2);

  return (
    uintBuffer1.length === uintBuffer2.length &&
    crypto.timingSafeEqual(uintBuffer1, uintBuffer2)
  );
};
