const sql = require("mssql");
var config = require("./dbconfig");
const helperService = require("../services/helper.service");

async function execute(query) {
  try {
    // Create a connection pool
    const pool = await new sql.ConnectionPool(config).connect();

    const request = pool.request();
    const result = await request.query(query);

    // Close the connection pool
    pool.close();
    console.log(result);
    // Pass the result to another function
    return helperService.responseResult(
      "success",
      "OK",
      result.recordset.length,
      result.recordset[0]
    );
  } catch (error) {
    console.error("Error executing select query:", error);
    return helperService.responseResult(
      "error",
      "Database error executing select query:" + error,
      0,
      []
    );
  }
}

async function executeInsert(query, params) {
  try {
    const pool = await new sql.ConnectionPool(config).connect();
    const request = pool.request();
    let i = 1;
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const value = params[key];

        request.input(
          i.toString(),
          typeof value === "number"
            ? value % 1 != 0
              ? sql.Decimal
              : sql.Int
            : sql.VarChar,
          value
        );
        i++;
      }
    }
    const result = await request.query(query);

    // Close the connection pool
    pool.close();

    return helperService.responseResult(
      "success",
      "OK",
      result.rowsAffected.length,
      result.rowsAffected[0]
    );
  } catch (error) {
    console.error("Error executing insert query:", error);
    return helperService.responseResult(
      "error",
      "Database error executing insert query:" + error,
      0,
      []
    );
  }
}

async function executeUpdate(query, params) {
  try {
    const pool = await new sql.ConnectionPool(config).connect();
    const request = pool.request();
    let i = 1;
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const value = params[key];

        request.input(
          i.toString(),
          typeof value === "number"
            ? value % 1 != 0
              ? sql.Decimal
              : sql.Int
            : sql.VarChar,
          value
        );
        i++;
      }
    }
    const result = await request.query(query);

    // Close the connection pool
    pool.close();

    return helperService.responseResult(
      "success",
      "OK",
      result.rowsAffected.length,
      result.rowsAffected[0]
    );
  } catch (error) {
    console.error("Error executing update query:", error);
    return helperService.responseResult(
      "error",
      "Database error executing update query:" + error,
      0,
      []
    );
  }
}

async function executeDelete(query, params) {
  try {
    const pool = await new sql.ConnectionPool(config).connect();
    const request = pool.request();
    let i = 1;
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const value = params[key];

        request.input(
          i.toString(),
          typeof value === "number"
            ? value % 1 != 0
              ? sql.Decimal
              : sql.Int
            : sql.VarChar,
          value
        );
        i++;
      }
    }
    const result = await request.query(query);

    // Close the connection pool
    pool.close();

    return helperService.responseResult(
      "success",
      "OK",
      result.rowsAffected.length,
      result.rowsAffected[0]
    );
  } catch (error) {
    console.error("Error executing delete query:", error);
    return helperService.responseResult(
      "error",
      "Database error executing delete query:" + error,
      0,
      []
    );
  }
}

async function executeSp(query, params) {
  try {
    const pool = await new sql.ConnectionPool(config).connect();
    const request = pool.request();
    let i = 1;
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const value = params[key];

        request.input(
          i.toString(),
          typeof value === "number"
            ? value % 1 != 0
              ? sql.Decimal
              : sql.Int
            : sql.VarChar,
          value
        );
        i++;
      }
    }
    const result = await request.query(query);

    // Close the connection pool
    pool.close();

    return helperService.responseResult(
      "success",
      "OK",
      result.recordsets.length,
      result.recordsets
    );
  } catch (error) {
    console.error("Error executing stored procedure:", error);
    return helperService.responseResult(
      "error",
      "Database error executing stored procedure:" + error,
      0,
      []
    );
  }
}

async function executeSpRpt(query, params) {
  try {
    const pool = await new sql.ConnectionPool(config).connect();
    const request = pool.request();
    let i = 1;
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const value = params[key];

        request.input(
          i.toString(),
          typeof value === "number"
            ? value % 1 != 0
              ? sql.Decimal
              : sql.Int
            : sql.VarChar,
          value
        );
        i++;
      }
    }
    const result = await request.query(query);

    // Close the connection pool
    pool.close();

    return helperService.responseResult(
      "success",
      "OK",
      result.recordsets[0].length,
      result.recordsets[0]
    );
  } catch (error) {
    console.error("Error executing stored procedure:", error);
    return helperService.responseResult(
      "error",
      "Database error executing stored procedure:" + error,
      0,
      []
    );
  }
}

async function executeSpListForConfirmCashDetail(query, params) {
  try {
    const pool = await new sql.ConnectionPool(config).connect();


        // Loop through the data and perform insert queries
        let rowsuccess = 0;
        for (const item of params.details) {
          const result = await pool
            .request()
            .input("1", sql.Int, params.idH)
            .input("2", sql.VarChar, params.confirmFlag)
            .input("3", sql.VarChar, params.confirmType)
            .input("4", sql.Int, item.cashId)
            .input("5", sql.Int, item.cashTypeId)
            .input("6", sql.Int, item.transType)
            .input("7", sql.Decimal, item.cashAmount)
            .input("8", sql.VarChar, item.ortherCashType)
            .input("9", sql.Int, !item.peopleAmount ? 0 : pareseInt(item.peopleAmount))
            .input("10", sql.Int, item.collectCash)
            .query(query);
    
          console.log(
            `Insert INTO TBLCashConfirm_D is Rows affected: ${result.rowsAffected}`
          );
          rowsuccess += parseInt(result.rowsAffected);
        }

    // }

    // Close the connection pool
    pool.close();

    return helperService.responseResult(
      "success",
      "OK",
      rowsuccess,
      rowsuccess
    );
  } catch (error) {
    console.error("Error executing stored procedure list:", error);
    return helperService.responseResult(
      "error",
      "Database error executing stored procedure list:" + error,
      0,
      []
    );
  }
}

async function executeBulk(table) {
  try {
    const pool = await new sql.ConnectionPool(config).connect();
    const request = pool.request();
    const result = await request.bulk(table);
    pool.close();

    return helperService.responseResult(
      "success",
      "OK",
      result.rowsAffected.length,
      result.rowsAffected[0]
    );
  } catch (error) {
    console.error("Error bulk data to table :", error);
    return helperService.responseResult(
      "error",
      "Database error bulk data to table:" + error,
      0,
      []
    );
  }
}

async function executeWihtParams(query, params) {
  try {
    const pool = await new sql.ConnectionPool(config).connect();
    const request = pool.request();
    let i = 1;
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const value = params[key];

        request.input(
          i.toString(),
          typeof value === "number"
            ? value % 1 != 0
              ? sql.Decimal
              : sql.Int
            : sql.VarChar,
          value
        );
        i++;
      }
    }
    const result = await request.query(query);

    // Close the connection pool
    pool.close();

    return helperService.responseResult(
      "success",
      "OK",
      result.recordset.length,
      result.recordset[0]
    );
  } catch (error) {
    console.error("Error executing select query:", error);
    return helperService.responseResult(
      "error",
      "Database error executing select query:" + error,
      0,
      []
    );
  }
}

async function executeList(query) {
  try {
    // Create a connection pool
    const pool = await new sql.ConnectionPool(config).connect();

    const request = pool.request();
    const result = await request.query(query);

    // Close the connection pool
    pool.close();
    console.log(result);
    // Pass the result to another function
    return helperService.responseResult(
      "success",
      "OK",
      result.recordset.length,
      result.recordset
    );
  } catch (error) {
    console.error("Error executing select query:", error);
    return helperService.responseResult(
      "error",
      "Database error executing select query:" + error,
      0,
      []
    );
  }
}

async function executeListWithParam(query,params) {
  try {
    // Create a connection pool
    const pool = await new sql.ConnectionPool(config).connect();

    const request = pool.request();
    let i = 1;
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const value = params[key];

        request.input(
          i.toString(),
          typeof value === "number"
            ? value % 1 != 0
              ? sql.Decimal
              : sql.Int
            : sql.VarChar,
          value
        );
        i++;
      }
    }
    const result = await request.query(query);

    // Close the connection pool
    pool.close();
    console.log(result);
    // Pass the result to another function
    return helperService.responseResult(
      "success",
      "OK",
      result.recordset.length,
      result.recordset
    );
  } catch (error) {
    console.error("Error executing select query:", error);
    return helperService.responseResult(
      "error",
      "Database error executing select query:" + error,
      0,
      []
    );
  }
}
module.exports = {
  execute,
  executeInsert,
  executeUpdate,
  executeDelete,
  executeSp,
  executeSpRpt,
  executeSpListForConfirmCashDetail,
  executeBulk,
  executeWihtParams,
  executeList,
  executeListWithParam
};
