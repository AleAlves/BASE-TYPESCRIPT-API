
import { CryptoTools } from "../CryptoTools";
import { JWTType } from "../JWT/model/JWTType"

module.exports = (req, res, next) => {

  const token = req.headers['accesstoken'] || req.headers['sessiontoken'];

  console.log("token: " + token);

  let rawToken = CryptoTools.JWT().instance().verify(token, CryptoTools.JWT().key(), function (err, decoded) {
    console.log("decode: " + JSON.stringify(decoded));
    console.log("err: " + JSON.stringify(err));
  });

  console.log("is login: " + token && String(req.originalUrl).includes('login'))

  if (token && rawToken.type == JWTType.ACCESS && String(req.originalUrl).includes('login')) {
    CryptoTools.JWT().instance().verify(token, CryptoTools.JWT().key(), function (err, decoded) {
      if (err) {
        return res.status(401).json({ "error": true, "message": 'Unauthorized access.' });
      }
      req.decoded = decoded;
      next();
    });
  }
  else if (token && rawToken.type == JWTType.SESSION) {
    CryptoTools.JWT().instance().verify(token, CryptoTools.JWT().key(), function (err, decoded) {
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
}