const settingModel = require("../model/Setting");
const categoryModel = require("../model/Category");
const authService = require("../services/authServices");
const setting = {
  createUser: async function(req, res) {
    console.log("[create User Invoked]", req.body);
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
    let user = await settingModel.findOne({ userId: usrId });

    if (user) {
      console.log("[User find with this email]", user);
      res.send({
        success: false,
        userId: usrId,
        details: "user id already in use"
      });
    } else {
      settingModel.create({ userId: usrId, password: password }, function(
        err,
        user
      ) {
        if (err)
          return res.send({
            success: false,
            details: "User creation failed try again."
          });

        return res.send({
          success: true,
          details: "User created "
        });
      });
    }

    // res.send({ success: true, userId: usrId, password: password });
  },

  updateBudget: async function(req, res) {
    console.log("[update budget Invoked]", req.body);
    if (!("userId" in req.body) || !("budget" in req.body))
      return res.send({
        success: false,
        details: "UserId & budget are  required in order to  upated budget "
      });

    // check null
    if (!req.body.userId || !req.body.budget) {
      return res.send({
        success: false,
        details: "UserId or budget  can not be null"
      });
    }
    if (isNaN(req.body.budget)) {
      return res.send({
        success: false,
        details: "budget should be number "
      });
    }

    settingModel.findOneAndUpdate(
      { userId: req.body.userId },
      { $set: { budget: req.body.budget } },
      { new: true },
      (err, doc) => {
        if (err) {
          return res.send({
            success: false,
            details: "UserId not found"
          });
        }

        if (doc) {
          res.setHeader("Content-Type", "application/json");
          return res.json({
            success: true,
            budget: doc
          });
        } else {
          return res.json({
            success: false,
            details: "UserId not found"
          });
        }
      }
    );

    // process req..
  },
  getBudget: async function(req, res) {
    console.log("[getBudget invoked]", req.body);
    let userInSession = null;

    try {
      userInSession = await authService.getUserFromToken(req);
    } catch (err) {
      console.log("Error", err);
      return res.send({
        success: false,
        details: "Somthing wrong with this session"
      });
    }

    if (!userInSession) {
      // console.log("User In session", userInSession);
      return res.send({
        success: false,
        details: "Your session has been  expired, kindly login  again "
      });
    }

    let budget = await settingModel.findOne({ userId: userInSession.userId });

    if (budget) {
      res.send({ success: true, budget: budget.budget, user: budget.userId });
    } else {
      return res.send({
        success: false,
        details: "Budget not define"
      });
    }

    // process req..
  },

  getSettings: async function(req, res) {
    console.log("[getSettng invoked]", req.body);
    let userInSession = null;

    try {
      userInSession = await authService.getUserFromToken(req);
    } catch (err) {
      console.log("Error", err);
      return res.send({
        success: false,
        details: "Somthing wrong with this session"
      });
    }

    if (!userInSession) {
      // console.log("User In session", userInSession);
      return res.send({
        success: false,
        details: "Your session has been  expired, kindly login  again "
      });
    }

    let budget = await settingModel.findOne({ userId: userInSession.userId });
    let category = await categoryModel
      .find({ userId: userInSession.userId })
      .sort({ createdAt: -1 })
      .limit(10);
    let responseData = { budget: 0, categories: [] };

    if (budget) responseData.budget = budget;

    if (category) responseData.categories = category;

    res.send({ success: true, settingCompData: responseData });

    // process req..
  }
};
module.exports = setting;
