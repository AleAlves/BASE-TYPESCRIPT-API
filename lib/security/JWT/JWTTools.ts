
const jsonWebToken = require('jsonwebtoken')
const generator = require('generate-password');

var key = process.env.JSON_WEB_TOKEN_SECRET || generator.generate({
    length: 64,
    numbers: true
});

const sessionTokenLife = 84600 // 24h
const accessTokenLife = 120 //2min

export class JWTTools {

    public instance(){
        console.log(key)
        return jsonWebToken
    }

    public key(){
        console.log(key)
        return key
    }


    public signAccessToken(data: any) {
        try {
            console.log(key)
            return jsonWebToken.sign(JSON.parse(JSON.stringify(data)), key, { expiresIn: accessTokenLife })
        }
        catch (e) {
            console.log("JWT e: " + e);
            return null;
        }
    }

    public signSessionToken(data: any) {
        try {
            console.log(key)
            return jsonWebToken.sign(JSON.parse(JSON.stringify(data)), key, { expiresIn: sessionTokenLife })
        }
        catch (e) {
            console.log("JWT e: " + e);
            return null;
        }
    }

    public verify(jwt: any) {
        try {
            console.log(key)
            return jwt.verify(key, key);
        }
        catch (e) {
            console.log("JWT e: " + e);
            return null;
        }
    }

}