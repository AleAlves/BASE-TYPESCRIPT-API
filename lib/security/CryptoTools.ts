import { AESTools } from "./AES/AESTools";
import { RSATools } from "./RSA/RSATools";

export class CryptoTools {

    private static aes: AESTools = new AESTools()
    private static rsa: RSATools = new RSATools()

    public static AES(): AESTools {
        return this.aes
    }

    public static RSA(): RSATools {
        return this.rsa
    }

}