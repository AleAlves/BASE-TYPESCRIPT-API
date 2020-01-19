"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoTools_1 = require("../CryptoTools");
const JWTType_1 = require("../JWT/model/JWTType");
const HTTPResponse_1 = require("../../models/http/HTTPResponse");
const HTTPStatus_1 = require("../../models/http/HTTPStatus");
module.exports = (req, res, next) => {
    const token = req.headers['accesstoken'] || req.headers['sessiontoken'];
    console.log("token: " + token);
    try {
        var rawToken = CryptoTools_1.CryptoTools.JWT().instance().verify(token, CryptoTools_1.CryptoTools.JWT().key());
    }
    catch (error) {
        console.log("Verify Error: " + error);
        return res.send(new HTTPResponse_1.HTTPResponse(undefined, new HTTPStatus_1.HTTPStatus.CLIENT_ERROR.FORBIDDEN));
    }
    console.log("is login: " + token && String(req.originalUrl).includes('login'));
    console.log("Raw Token: " + JSON.stringify(rawToken));
    if (token && rawToken.type == JWTType_1.JWTType.ACCESS && String(req.originalUrl).includes('login')) {
        CryptoTools_1.CryptoTools.JWT().instance().verify(token, CryptoTools_1.CryptoTools.JWT().key(), function (err, decoded) {
            if (err) {
                return res.status(401).send(new HTTPResponse_1.HTTPResponse(undefined, new HTTPStatus_1.HTTPStatus.CLIENT_ERROR.UNAUTHORIZED));
            }
            req.decoded = decoded;
            next();
        });
    }
    else if (token && rawToken.type == JWTType_1.JWTType.SESSION) {
        CryptoTools_1.CryptoTools.JWT().instance().verify(token, CryptoTools_1.CryptoTools.JWT().key(), function (err, decoded) {
            if (err) {
                return res.status(401).send(new HTTPResponse_1.HTTPResponse(undefined, new HTTPStatus_1.HTTPStatus.CLIENT_ERROR.UNAUTHORIZED));
            }
            req.decoded = decoded;
            next();
        });
    }
    else {
        return res.send(new HTTPResponse_1.HTTPResponse(undefined, new HTTPStatus_1.HTTPStatus.CLIENT_ERROR.UNAUTHORIZED));
    }
};
//# sourceMappingURL=SessionAuth.js.map