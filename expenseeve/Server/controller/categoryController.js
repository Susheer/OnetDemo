const categoryModel = require("../model/Category");
const settingModel = require("../model/Setting");
const authService = require("../services/authServices");
const mongoose = require("mongoose");
const category = {
  createCategory: async function(req, res) {
    console.log("[create category Invoked]", req.body);
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
        details: "Your session has been   expired, kindly login  again "
      });
    }

    //start if session found
    if (!("name" in req.body))
      return res.send({
        success: false,
        details: "Category Name unavailable"
      });

    // check null
    if (!req.body.name) {
      return res.send({
        success: false,
        details: " Name can not be  empty "
      });
    }

    // process req..
    /*

  
*/
    let usrId = userInSession.userId.trim().toLowerCase();
    let name = req.body.name.trim().toLowerCase();
    let user = await settingModel.findOne({ userId: usrId });

    if (user) {
      console.log("[User find with this email]", user);
      let category = await categoryModel.findOne({
        $and: [{ userId: usrId }, { name: name }]
      });
      console.log("[Find category]", category);
      if (category) {
        return res.send({
          success: false,
          details: "This category in present , create new one"
        });
      } else {
        // create new category here..
        console.log("[UserId from category]", user);

        const category = new categoryModel({
          _id: new mongoose.Types.ObjectId(),
          userId: usrId,
          name: name,
          deleted: false,
          user: user._id
        });
        console.log("[saving category]");

        category.save(function(err) {
          if (err)
            return res.send({
              success: false,
              details: "Somthing went wrong while creating category"
            });

          return res.send({ success: true, userId: usrId, category: category });
        });

        // end here..
      }

      // res.send({ success: true, userId: usrId, password: password });
    } else {
      return res.send({
        success: false,
        details: "User not found in order to create category"
      });
    }

    // res.send({ success: true, userId: usrId, password: password });
  },

  listCategory: async function(req, res) {
    console.log("[List category]", req.body.userId);
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

    // process request..
    let usrId = userInSession.userId;
    console.log("[------------]", usrId);
    categoryModel
      .find({ userId: usrId }, function(err, docs) {
        if (err) {
          return res.send({
            success: false,
            details: "Category not found."
          });
        }

        if (docs) {
          return res.json({
            success: true,
            details: "sojlsjd",
            categories: docs
          });
        } else {
          return res.send({
            success: false,
            details: "Somthing went wrong..."
          });
        }
      })
      .sort({ createdAt: -1 })
      .limit(10);
  },
  listActiveCategory: async function(req, res) {
    console.log("[List listActiveCategory]", req.body.userId);
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

    // process request..
    let usrId = userInSession.userId;
    console.log("[------------]", usrId);

    categoryModel
      .find(
        {
          $and: [{ userId: usrId }, { deleted: false }]
        },
        function(err, docs) {
          if (err) {
            return res.send({
              success: false,
              details: "Category not found."
            });
          }

          if (docs) {
            return res.json({
              success: true,
              details: "sojlsjd",
              categories: docs
            });
          } else {
            return res.send({
              success: false,
              details: "Somthing went wrong..."
            });
          }
        }
      )
      .sort({ createdAt: -1 })
      .limit(10);
  },

  deleteCategory: async function(req, res) {
    console.log("[DelCategory]", req.body);
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
    // process start

    if (!("name" in req.body))
      return res.send({
        success: false,
        details: " Name unavailable"
      });

    // check null
    if (!req.body.name) {
      return res.send({
        success: false,
        details: " Name are empty "
      });
    }

    // process req..
    /*

  
*/
    let usrId = userInSession.userId;
    let name = req.body.name.trim().toLowerCase();

    let category = await categoryModel.updateOne(
      {
        $and: [{ userId: usrId }, { name: name }]
      },
      { deleted: true }
    );
    console.log("[Updated value]", category);
    if (category) {
      return res.send({
        success: true,
        details: "value updated"
      });
    } else {
      return res.send({
        success: false,
        details: "Not Updated"
      });
    }
  },

  undoCategory: async function(req, res) {
    if (!("userId" in req.body) || !("name" in req.body))
      return res.send({
        success: false,
        details: "Either userId or Name unavailable"
      });

    // check null
    if (!req.body.userId || !req.body.name) {
      return res.send({
        success: false,
        details: "Either userId or Name are empty "
      });
    }

    // process req..
    /*

  
*/
    let usrId = req.body.userId.trim().toLowerCase();
    let name = req.body.name.trim().toLowerCase();
    let user = await settingModel.findOne({ userId: usrId });
    // process request..

    if (!user) {
      return res.send({
        success: false,
        details: "Invalid user id"
      });
    }

    let category = await categoryModel.updateOne(
      {
        $and: [{ userId: usrId }, { name: name }]
      },
      { deleted: false }
    );
    console.log("[Updated value]", category);
    if (category) {
      return res.send({
        success: true,
        status: category,
        details: "Undo request compleated ."
      });
    } else {
      return res.send({
        success: false,
        details: "Undo request failed "
      });
    }
  },

  removeCategory: async function(req, res) {
    if (!("userId" in req.body) || !("name" in req.body))
      return res.send({
        success: false,
        details: "Either userId or Name unavailable"
      });

    // check null
    if (!req.body.userId || !req.body.name) {
      return res.send({
        success: false,
        details: "Either userId or Name are empty "
      });
    }

    // process req..
    /*

  
*/

    // get Token from user
    let userInSession = null;
    try {
      userInSession = await authService.getUserFromToken(req);
    } catch (err) {
      console.log("Error", err);
      return res.send({
        success: false,
        details: "Session expired || Login again || Invalid user "
      });
    }

    if (!userInSession) {
      // console.log("User In session", userInSession);
      return res.send({
        success: false,
        details: "Your session expired, kindly login  again "
      });
    }

    let usrId = null;
    if (userInSession && "userId" in userInSession) {
      usrId = userInSession.userId; // req.body.userId.trim().toLowerCase();
    } else {
      return res.send({
        success: false,
        details: "Your session expired "
      });
    }

    let name = req.body.name.trim().toLowerCase();
    let user = await settingModel.findOne({ userId: usrId });
    // process request..

    if (!user) {
      return res.send({
        success: false,
        details: "Invalid user id"
      });
    }

    categoryModel.deleteOne(
      {
        $and: [{ userId: usrId }, { name: name }]
      },
      function(err) {
        if (err) {
          return res.send({
            success: false,
            details:
              "Dlete request for this category failed due to some problam "
          });
        } else {
          console.log("[User After Deleted]", err);
          return res.send({
            success: true,
            details: "Dlete request  processed successfully"
          });
        }
      }
    );
  }
};

module.exports = category;
