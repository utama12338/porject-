import CryptoJS from "crypto-js";
export function decryptWithKey(ciphertext, key){
    const secretKey = CryptoJS.enc.Utf8.parse(key);
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
     });

    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
}

export default decryptWithKey;
