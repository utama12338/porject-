var config = require("../database/dbconfig");
const sql = require("mssql");



async function getTestConnect() {
  // Create a connection pool
  const pool = new sql.ConnectionPool(config);

  // Connect to the database
  pool
    .connect()
    .then(() => {
      console.log("Connected to MSSQL database");
    })
    .catch((err) => {
      console.error("Error connecting to MSSQL database:", err);
    });
}


module.exports = {
  testConnect: getTestConnect,
};
