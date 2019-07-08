const dashboardModel = require("../model/Dashboard");
const authService = require("../services/authServices");
const dashbord = {
  addExpense: async function(req, res) {
    console.log("[Add expense invoked]", req.body);
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

    // validation->
    if (
      !("categoryName" in req.body) ||
      !("iteamName" in req.body) ||
      !("amount" in req.body)
    )
      return res.send({
        success: false,
        details: "Category Name, Item Name, Amout  are missing"
      });

    // check null
    if (!req.body.categoryName || !req.body.iteamName || !req.body.amount) {
      return res.send({
        success: false,
        details: "Category Name, Item Name, Amout  are empty"
      });
    }

    if (isNaN(req.body.amount)) {
      return res.send({
        success: false,
        details: "Invalid Entered amount  "
      });
    }

    // create Expense
    const expense = new dashboardModel({
      categoryName: req.body.categoryName,
      iteamName: req.body.iteamName,
      amount: req.body.amount,
      userId: userInSession.userId
    });

    console.log("[saving expense]");

    expense.save(function(err) {
      if (err)
        return res.send({
          success: false,
          details: "Somthing went wrong while creating expense"
        });

      return res.send({
        success: true,
        expense: expense,
        details: "Expense created "
      });
    });

    // creation end
    //return res.send({ Hi: userInSession.userId });
    // parameter to available
    // categoryName
    //iteamName
    //amount
  },
  editExpense: async function(req, res) {
    console.log("[edit expense invoked]", req.body);
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

    // validation->
    if (
      !("expenseId" in req.body) ||
      !("categoryName" in req.body) ||
      !("iteamName" in req.body) ||
      !("amount" in req.body)
    )
      return res.send({
        success: false,
        details: "Category Name, Item Name, Amout  are missing"
      });

    // check null
    if (
      !req.body.categoryName ||
      !req.body.iteamName ||
      !req.body.amount ||
      !req.body.expenseId
    ) {
      return res.send({
        success: false,
        details: "expenseId  not  found "
      });
    }

    // first check Budget

    let updatedExpense = await dashboardModel.updateOne(
      { _id: req.body.expenseId },
      {
        categoryName: req.body.categoryName,
        iteamName: req.body.iteamName,
        amount: req.body.amount
      }
    );
    console.log("[updatedExpense]", updatedExpense);
    if (updatedExpense) {
      return res.send({
        success: true,
        status: updatedExpense,
        details: "Update request compleated."
      });
    } else {
      return res.send({
        success: false,
        details: "Update  request failed "
      });
    }

    // parameter to available
    // categoryName
    //iteamName
    //amount

    //updateHere
  },
  deleteExpense: async function(req, res) {
    console.log("[deleteexpense invoked]", req.body);
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

    // validation->
    if (!("expenseId" in req.body))
      return res.send({
        success: false,
        details: "Expense Id is  missing"
      });

    // check null
    if (!req.body.expenseId) {
      return res.send({
        success: false,
        details: "expense Id cant be null or blank"
      });
    }

    let updatedExpense = await dashboardModel.updateOne(
      { _id: req.body.expenseId },
      {
        deleted: true
      }
    );
    console.log("[updatedExpense]", updatedExpense);
    if (updatedExpense) {
      return res.send({
        success: true,
        status: updatedExpense,
        details: "Delete request compleated."
      });
    } else {
      return res.send({
        success: false,
        details: "Delete  request failed "
      });
    }

    // parameter to available
    // categoryName
    //iteamName
    //amount
  },
  undoExpense: async function(req, res) {
    console.log("[undoExpense invoked]", req.body);
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

    // validation->
    if (!("expenseId" in req.body))
      return res.send({
        success: false,
        details: "Expense Id is  missing"
      });

    // check null
    if (!req.body.expenseId) {
      return res.send({
        success: false,
        details: "expense Id cant be null or blank"
      });
    }

    let updatedExpense = await dashboardModel.updateOne(
      { _id: req.body.expenseId },
      {
        deleted: false
      }
    );
    console.log("[undoExpense]", updatedExpense);
    if (updatedExpense) {
      return res.send({
        success: true,
        status: updatedExpense,
        details: "Undo request compleated."
      });
    } else {
      return res.send({
        success: false,
        details: "Undo  request failed "
      });
    }

    // parameter to available
    // categoryName
    //iteamName
    //amount
  },

  listExpense: async function(req, res) {
    console.log("[listExpense invoked]", req.body);
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

    dashboardModel
      .find(
        { userId: userInSession.userId },

        function(err, docs) {
          if (err) {
            return res.send({
              success: false,
              details: "Expense not found."
            });
          }

          if (docs) {
            return res.json({ success: true, expenses: docs });
          } else {
            return res.send({
              success: false,
              details: "Somthing went wrong..."
            });
          }
        }
      )
      .sort({ createdDate: -1 })
      .limit(5);
  },
  getExpenseById: async function(req, res) {
    console.log("[getExpenseById invoked]", req.body);
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

    // validation->
    if (!("expenseId" in req.body))
      return res.send({
        success: false,
        details: "Mssing expense id"
      });

    // check null
    if (!req.body.expenseId) {
      return res.send({
        success: false,
        details: "expense Id cant be null or blank"
      });
    }

    dashboardModel.findById(req.body.expenseId, function(err, data) {
      if (data) {
        return res.send({
          success: true,
          data: data,
          details: "edit  request compleated."
        });
      } else {
        return res.send({
          success: false,
          details: "This expense can not be edited "
        });
      }
    });

    // parameter to available
    // categoryName
    //iteamName
    //amount
  }
};
module.exports = dashbord;
