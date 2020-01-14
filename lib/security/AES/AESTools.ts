
const CryptoJS = require('crypto-js');
const JsonWebToken = require('jwt-simple');
const KEY_SIZE = 8
const ITERATIONS = 2048

export class AESTools {

    public encrypt(data: String, key: String, salt: String, iv: String) {

        console.log("\nCryptoUtil : encrypt\n");
        console.log("key: " + key);

        salt = CryptoJS.enc.Utf8.parse(salt);
        iv = CryptoJS.enc.Base64.parse(iv);

        var keyBits = CryptoJS.PBKDF2(key, salt, {
            hasher: CryptoJS.algo.SHA1,
            keySize: KEY_SIZE,
            iterations: ITERATIONS
        });

        return CryptoJS.AES.encrypt(data, keyBits, {
            iv: iv,
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC
        }).toString();
    }

    public decrypt(data: String, key: String, salt: String, iv: String) {

        console.log("\nCryptoUtil : decrypt\n");
        console.log("key: " + key);

        salt = CryptoJS.enc.Utf8.parse(salt);
        iv = CryptoJS.enc.Base64.parse(iv);

        var keyBits = CryptoJS.PBKDF2(key, salt, {
            hasher: CryptoJS.algo.SHA1,
            keySize: KEY_SIZE,
            iterations: ITERATIONS
        });

        console.log('\n ---- CRYPTO -----');
        console.log('iv: ' + iv);
        console.log('key: ' + key);
        console.log('salt: ' + salt);
        console.log('cipherData: ' + data);
        console.log('\n ---- CRYPTO -----\n');

        return JSON.parse(CryptoJS.AES.decrypt(data, keyBits, {
            iv: CryptoJS.enc.Base64.parse(iv),
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC
        }).toString(CryptoJS.enc.Utf8).replace("\\", ""));
    }

}