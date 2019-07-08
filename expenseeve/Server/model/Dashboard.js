let mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
let Schema = mongoose.Schema;
let dashboardSchema = new Schema({
  categoryName: String,
  iteamName: String,
  amount: Number,
  userId: String,
  deleted: { type: Boolean, required: true, default: false },
  expenseDate: { type: Date, required: true, default: Date.now },
  createdDate: { type: Date, required: true, default: Date.now }
});

const Dashboard = mongoose.model("Dashboard", dashboardSchema);
module.exports = Dashboard;
