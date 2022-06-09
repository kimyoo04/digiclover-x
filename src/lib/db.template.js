const mysql = require("mysql");
let db = mysql.createConnection({
  host: "",
  user: "",
  password: "",
  database: "",
});
db.connect();
module.exports = db;
