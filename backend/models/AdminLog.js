const mongoose = require("mongoose");

const adminLogSchema = new mongoose.Schema(
  {
    action: { type: String, required: true }, // Örn: 'SİPARİŞ DURUMU GÜNCELLENDİ'
    details: { type: String }, // Açıklama
    adminUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const AdminLog = mongoose.model("AdminLog", adminLogSchema);
module.exports = AdminLog;
