const settingModel = require("../model/Setting");
const JwtService = require("../services/authServices");
const authController = {
  login: async function(req, res) {
    console.log("[AuthCtl  Invoked]", req.body);
    if (!("userId" in req.body) || !("password" in req.body))
      return res.send({
        success: false,
        details: "UserId & password both are required"
      });

    // check null
    if (!req.body.userId || !req.body.password) {
      return res.send({
        success: false,
        details: "UserId & password can not be null"
      });
    }

    // process req..

    let usrId = req.body.userId.trim().toLowerCase();
    let password = req.body.password.trim();
    let user = await settingModel.findOne({
      $and: [{ userId: usrId }, { password: password }]
    });

    if (user) {
      // send token in body

      res.cookie("token", JwtService.issue({ data: user }), {
        httpOnly: true
      });

      return res.send({
        success: true,
        userData: user
      });
    } else {
      return res.send({
        success: false,
        details: "Invalid UserId Or password "
      });
    }
  },
  logout: async function(req, res) {
    console.log("get token and remove from  response ...");
    // send back
    res.send("login ok");
  }
};

module.exports = authController;
