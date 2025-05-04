const fs = require("fs");
const path = require("path");
const AdminLog = require("../models/AdminLog");

const logAdminAction = async (user, action, details = "") => {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    userId: user._id,
    userName: user.name || "unknown",
    action,
    details,
  };

  // 📝 1. Dosyaya yaz
  const logDir = path.join(__dirname, "../logs");
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  const logLine = JSON.stringify(logEntry) + "\n";
  const logFilePath = path.join(logDir, "admin-actions.log");

  fs.appendFile(logFilePath, logLine, (err) => {
    if (err) {
      console.error("Log dosyasına yazılamadı:", err);
    }
  });

  // 🗂️ 2. MongoDB'ye yaz
  try {
    const newLog = new AdminLog({
      adminUser: user._id,
      action,
      details,
    });
    await newLog.save();
  } catch (err) {
    console.error("MongoDB log kaydı başarısız:", err.message);
  }
};

module.exports = logAdminAction;
