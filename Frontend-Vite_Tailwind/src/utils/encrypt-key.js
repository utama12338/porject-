import CryptoJS from "crypto-js";
export function encryptWithKey(plaintext, key){
    const secretKey = CryptoJS.enc.Utf8.parse(key);
    const ciphertext = CryptoJS.AES.encrypt(plaintext, secretKey, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
    }).toString();

    return ciphertext;
}
export default encryptWithKey;