"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoTools_1 = require("../CryptoTools");
module.exports = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['ticket'] || req.headers['token'];
    // decode token
    if (token) {
        // verifies secret and checks exp
        console.log(CryptoTools_1.CryptoTools.JWT().key());
        CryptoTools_1.CryptoTools.JWT().instance().verify(token, CryptoTools_1.CryptoTools.JWT().key(), function (err, decoded) {
            if (err) {
                return res.status(401).json({ "error": true, "message": 'Unauthorized access.' });
            }
            req.decoded = decoded;
            next();
        });
    }
    else {
        // if there is no token
        // return an error
        return res.status(403).send({
            "error": true,
            "message": 'No token provided.'
        });
    }
};
//# sourceMappingURL=SessionManager.js.map