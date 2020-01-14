
const JsonWebToken = require('jwt-simple');
const generator = require('generate-password');

var JWTSecret = process.env.JSON_WEB_TOKEN_SECRET || generator.generate({
    length: 32,
    numbers: true
});

export class JWTTools {

    public encode(data: any) {
        try {
            return JsonWebToken.encode(data, JWTSecret);
        }
        catch (e) {
            console.log("JWT e: " + e);
            return null;
        }
    }

    public decode(data: any) {
        try {
            return JsonWebToken.decode(data, JWTSecret);
        }
        catch (e) {
            console.log("JWT e: " + e);
            return null;
        }
    }

    public verify(data : any){

    }

}