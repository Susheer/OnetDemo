const jwt = require("jsonwebtoken");
const config = require("../config");

const secretKey = config.secretKey;
const authServices = {
  issue: function(payload) {
    //60 * 60 * 24 // expires in 24 hours
    token = jwt.sign(payload, secretKey, { expiresIn: 60 * 60 * 24 });
    return token;
  },

  verify: function(token) {
    try {
      return jwt.verify(token, secretKey);
    } catch (err) {}

    return;
  },
  decode: token => {
    return jwt.decode(token, { complete: true });
    //returns null if token is invalid
  },

  getUserFromToken: async function(req) {
    let user, payload, userInfo;

    // console.log("[Auth Service] called");

    let token = req.cookies.token;
    user = null;
    payload = null;
    userInfo = null;

    // check if token is there  if not return null
    if (token) {
      // call JWTService in order to decode the token
      console.log("[Auth Service] token found");

      try {
        user = await jwt.decode(token, { complete: true });
        payload = user.payload;
        console.log("[AuthService]Token decoded");
      } catch (err) {
        return null;
      }

      // look for payload in decoded token
      if (payload && "data" in payload) {
        data = payload.data;
        console.log("[AuthService]Token Data returned");
        return data;
      } else {
        return null;
      }
    } else {
      console.log("[AuthTokenService]- token not found");
      return null;
    }
  }
};

module.exports = authServices;
