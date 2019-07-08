let mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
let Schema = mongoose.Schema;
let CategorySchema = new Schema({
  _id: Schema.Types.ObjectId,
  userId: String,
  name: String,
  deleted: Boolean,
  createdAt: { type: Date, required: true, default: Date.now },
  user: [{ type: Schema.Types.ObjectId, ref: "Setting" }]
});

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;
