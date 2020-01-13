
export class BaseResponse {
    code: number = 200
    status: String = "SUCESS"
    message: String = ""

    constructor(status?: String, code?: number, message?: String) {
        if (code) {
            this.code = code
        }
        if (status) {
            this.status = status
        }
        if (message) {
            this.message = message
        }
    }
}