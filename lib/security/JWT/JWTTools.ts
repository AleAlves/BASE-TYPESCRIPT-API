
const JWT = require('jsonwebtoken')
const generator = require('generate-password');

import { JWTSession } from "../JWT/model/JWTSession"
import { JWTType } from "../JWT/model/JWTType"

var key = process.env.JSON_WEB_TOKEN_SECRET || generator.generate({
    length: 64,
    numbers: true
});

const sessionTokenLife = 43200 // 3min
const accessTokenLife = 60 // 1min

export class JWTTools {

    public instance(){
        console.log(key)
        return JWT
    }

    public key(){
        console.log(key)
        return key
    }


    public signAccessToken(data: any) {
        try {
            console.log(key)
            return JWT.sign(JSON.parse(JSON.stringify(data)), key, { expiresIn: accessTokenLife })
        }
        catch (e) {
            console.log("JWT e: " + e);
            return null;
        }
    }

    public signSessionToken(data: any) {
        try {
            console.log(key)
            return JWT.sign(JSON.parse(JSON.stringify(data)), key, { expiresIn: sessionTokenLife })
        }
        catch (e) {
            console.log("JWT e: " + e);
            return null;
        }
    }

    public renewSessionToken(expiredToken : String){
        let decodedToken = this.decodeToken(expiredToken)
        let newToken = new JWTSession(decodedToken, JWTType.SESSION)
        return this.signSessionToken(newToken)
    }

    public decodeToken(token: String) {
        JWT.verify(token, function(error, decodedToken){
            if(error){
                return undefined
            }
            return decodedToken
        });
    }

    public verify(token: String) {
        JWT.verify(token, function(error, decodedToken){
            if(error){
                return false
            }
            return true
        });
    }

}