
const jsonWebToken = require('jsonwebtoken')
const generator = require('generate-password');

const tokenKey = process.env.JSON_WEB_TOKEN_SECRET || generator.generate({
    length: 64,
    numbers: true
});
const tokenLife = "24h"

export class JWTTools {

    public sign(data: any) {
        try {
            return jsonWebToken.sign(data, tokenKey, { expiresIn: tokenLife })
        }
        catch (e) {
            console.log("JWT e: " + e);
            return null;
        }
    }

    public verify(jwt: any) {
        try {
            return jwt.verify(tokenKey, tokenKey);
        }
        catch (e) {
            console.log("JWT e: " + e);
            return null;
        }
    }

}