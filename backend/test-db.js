require("dotenv").config();
const mysql = require("mysql2/promise");

(async () => {
  try {
    const conn = await mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "YOUR_ACTUAL_MYSQL_PASSWORD",
        database: "codesync",
    });

    console.log("✅ Connected successfully!");
    await conn.end();
  } catch (err) {
    console.error("❌", err);
  }
})();