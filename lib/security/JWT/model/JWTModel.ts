
export class JWTModel {

    token: String
    ticket: String

    constructor(ticket?: String, token?: String) {
        this.token = token
        this.ticket = ticket
    }
}