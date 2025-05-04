const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
  salesGoal: {
    type: Number,
    required: true,
    default: 20000,
  },
});

const Setting = mongoose.model("Setting", settingSchema);
module.exports = Setting;
