"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoTools_1 = require("../CryptoTools");
module.exports = (req, res, next) => {
    const accessToken = req.headers['accesstoken'];
    const sessionToken = req.headers['sessiontoken'];
    console.log("access: " + accessToken);
    console.log("session: " + sessionToken);
    let data = CryptoTools_1.CryptoTools.JWT().instance().verify(accessToken, CryptoTools_1.CryptoTools.JWT().key(), function (err, decoded) {
        console.log("decode: " + JSON.stringify(decoded));
        console.log("err: " + JSON.stringify(err));
    });
    if (accessToken && String(req.originalUrl).includes('login')) {
        CryptoTools_1.CryptoTools.JWT().instance().verify(sessionToken, CryptoTools_1.CryptoTools.JWT().key(), function (err, decoded) {
            if (err) {
                return res.status(401).json({ "error": true, "message": 'Unauthorized access.' });
            }
            req.decoded = decoded;
            next();
        });
    }
    else {
        return res.status(403).send({
            "error": true,
            "message": 'No token provided.'
        });
    }
    if (sessionToken) {
        CryptoTools_1.CryptoTools.JWT().instance().verify(sessionToken, CryptoTools_1.CryptoTools.JWT().key(), function (err, decoded) {
            if (err) {
                return res.status(401).json({ "error": true, "message": 'Unauthorized access.' });
            }
            req.decoded = decoded;
            next();
        });
    }
    else {
        return res.status(403).send({
            "error": true,
            "message": 'No token provided.'
        });
    }
};
//# sourceMappingURL=SessionGuardian.js.map