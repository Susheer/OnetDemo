/* global global */
var cluster = require("cluster"),
  express = require("express"),
  mongoose = require("mongoose"),
  cookieParser = require("cookie-parser"),
  //Grid = require("gridfs-stream"), //need to search more
  fs = require("fs"),
  moment = require("moment"),
  bodyParser = require("body-parser"),
  multipart = require("connect-multiparty"),
  app = express(),
  config = require("./config");

global.app = app;
global.moment = moment;
global.config = config;
global.fs = fs;
global.db = mongoose.connect(
  config.db_host + config.db_name,
  config.option,
  err => {
    if (err) console.log("database", err);
    console.log("Database connected");
  }
);

global.isMaster = false;
global.mongoose = mongoose;

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(multipart());
app.use(cookieParser());
//init function

function initApp() {
  var numCPUs = require("os").cpus().length;
  if (cluster.isMaster) {
    // Fork workers.

    for (var i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    cluster.on("exit", function(worker, code, signal) {
      console.log(
        "initApp1: Worker " +
          worker.process.pid +
          " died (" +
          code +
          "). restarting..."
      );
      cluster.fork();
    });
    global.isMaster = true;
  } else {
    app.listen(config.api_port);
    console.log("[glockr.io] initialized on port " + config.api_port);
  }
}
initApp();

///-----------------------------------------------------------
//          ADD CONTROLLER

let apiRequest = require("./constant/apiRequest");
let settingController = require("./controller/settingController");
let categoryController = require("./controller/categoryController");
let authController = require("./controller/authController");
let dashboardController = require("./controller/dashboardController");
// POST or PUT
var putOrPostFunction = (req, res, redirectFunc) => {
  redirectFunc(req, res);
};

// GET Hello Request
app.get(config.base_url + apiRequest.get.helloRequest.url, (req, res) => {
  res.send("Hello recieved");
});

// userLogin
app.post(config.base_url + apiRequest.auth.login.url, (req, res) => {
  console.log("[Post called]");
  putOrPostFunction(req, res, authController.login);
});

//create user
app.post(config.base_url + apiRequest.post.createUser.url, (req, res) => {
  console.log("[Post called]");
  putOrPostFunction(req, res, settingController.createUser);
});

// update budget
app.post(config.base_url + apiRequest.post.updateBudget.url, (req, res) => {
  console.log("[Post called]");
  putOrPostFunction(req, res, settingController.updateBudget);
});

// create category
app.post(config.base_url + apiRequest.post.createCategory.url, (req, res) => {
  console.log("[ createt category called]");
  putOrPostFunction(req, res, categoryController.createCategory);
});

// list category
app.post(config.base_url + apiRequest.post.listCategory.url, (req, res) => {
  console.log("[ list category called]");
  putOrPostFunction(req, res, categoryController.listCategory);
});

// list active category
app.post(
  config.base_url + apiRequest.post.listActiveCategory.url,
  (req, res) => {
    console.log("[ list category called]");
    putOrPostFunction(req, res, categoryController.listActiveCategory);
  }
);

// del category
app.post(config.base_url + apiRequest.post.delCategory.url, (req, res) => {
  console.log("[ del category called]");
  putOrPostFunction(req, res, categoryController.deleteCategory);
});

// undo category
app.post(config.base_url + apiRequest.post.undoCategory.url, (req, res) => {
  console.log("[ undo category called]");
  putOrPostFunction(req, res, categoryController.undoCategory);
});

// removeCategory
app.post(config.base_url + apiRequest.post.removeCategory.url, (req, res) => {
  console.log("[ del category called]");
  putOrPostFunction(req, res, categoryController.removeCategory);
});

//----------------------------------------------------------------
//Dashboard Requests
//----------------------------------------------------------------

// addExpense
app.post(config.base_url + apiRequest.post.addExpense.url, (req, res) => {
  console.log("[ dashbord  called]");
  putOrPostFunction(req, res, dashboardController.addExpense);
});

// editExpense
app.post(config.base_url + apiRequest.post.editExpense.url, (req, res) => {
  console.log("[ editExpense  called]");
  putOrPostFunction(req, res, dashboardController.editExpense);
});

// deleteExpense
app.post(config.base_url + apiRequest.post.deleteExpense.url, (req, res) => {
  console.log("[ dashbord  called]");
  putOrPostFunction(req, res, dashboardController.deleteExpense);
});

// updateExpense
app.post(config.base_url + apiRequest.post.updateExpense.url, (req, res) => {
  console.log("[ dashbord  called]");
  putOrPostFunction(req, res, dashboardController.undoExpense);
});

// undoExpense
app.post(config.base_url + apiRequest.post.undoExpense.url, (req, res) => {
  console.log("[ dashbord  called]");
  putOrPostFunction(req, res, dashboardController.undoExpense);
});

// listExpense
app.post(config.base_url + apiRequest.post.listExpense.url, (req, res) => {
  console.log("[ listExpense  called]");
  putOrPostFunction(req, res, dashboardController.listExpense);
});
// initiliz settings page
app.post(config.base_url + apiRequest.post.getSettings.url, (req, res) => {
  console.log("[ listExpense  called]");
  putOrPostFunction(req, res, settingController.getSettings);
});

// get exp by id
app.post(config.base_url + apiRequest.post.getExpenseById.url, (req, res) => {
  console.log("[ getExpenseById  called]");
  putOrPostFunction(req, res, dashboardController.getExpenseById);
});

//-----------------------GET CALLS

//get budget
app.get(config.base_url + apiRequest.get.getBudget.url, (req, res) => {
  console.log("[invoked get budget]");
  putOrPostFunction(req, res, settingController.getBudget);
});
