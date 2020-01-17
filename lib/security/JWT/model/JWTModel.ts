
export class JWTModel {

    sessionToken: String
    accessToken: String

    constructor(sessionToken?: String, accessToken?: String) {
        this.accessToken = accessToken
        this.sessionToken = sessionToken
    }

}