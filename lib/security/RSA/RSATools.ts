const NodeRSA = require('node-rsa');
const generator = require('generate-password');
const ALGORITHM = 'pkcs1'
const PUBLIC_KEY_FORMT = 'pkcs8-public-pem'
const STANDAR_ENCODE = 'base64'

const RSAKey = new NodeRSA({
    b: 1024
});

RSAKey.setOptions({ encryptionScheme: ALGORITHM });

export class RSATools {

    public publicKey() {
        return RSAKey.exportKey(PUBLIC_KEY_FORMT);
    }

    public encrypt(data: String) {
        return RSAKey.encrypt(data, STANDAR_ENCODE);
    }

    public decrypt(data: String, format?: String) {
        return RSAKey.decrypt(data, format);
    }

}