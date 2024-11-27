var config = require("../database/dbconfig");
const sql = require("mssql");
const helperService = require("../services/helper.service");
const dbContext = require("../database/dbContext");

async function saveHeader(params) {
  const query = `insert into TBLCashRequest_H (document_no, document_date, unit_type_id, unit_id,
            rec_send_date, create_by, create_date, document_type, document_remark,
            time_transaction, user_transaction,document_status_id)
            values (@1,GETDATE(),@2,@3,
            CONVERT(datetime,@4,112), @5, GETDATE(), @6, @7,
            @8,@9,1);
            `;
  let result = await dbContext.executeInsert(query, params);
  return result;
}
async function saveDetail(params) {
  try {
    // Create a connection pool
    const pool = await new sql.ConnectionPool(config).connect();

    // Loop through the data and perform insert queries
    let i = 0;
    for (const item of params.details) {
      const result = await pool
        .request()
        .input("1", sql.Int, params.idH)
        .input("2", sql.Int, item.cashId)
        .input("3", sql.Int, item.transType)
        .input("4", sql.Int, item.cashTypeId)
        .input("5", sql.Decimal, item.cashAmount)
        .input("6", sql.VarChar, item.ortherCashType)
        .input("7", sql.Int, item.peopleAmount)
        .input("8", sql.Int, item.collectCash)
        .query(`INSERT INTO TBLCashRequest_D
        (h_id, cash_id, trans_type, cash_tpye_id, cash_amount, other_cash_type, people_amount, collect_cash_amount)
        VALUES(@1, @2, @3, @4, @5, @6, @7, @8)`);

      console.log(
        `Insert INTO TBLCashRequest_D is Rows affected: ${result.rowsAffected}`
      );
      i += parseInt(result.rowsAffected);
    }

    // Close the connection pool
    await pool.close();

    // Pass the result to another function
    return helperService.responseResult("success", "OK", i, i);
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

async function getLastId() {
  const query = `select top 1 id from TBLCashRequest_H order by id desc;`;
  let result = await dbContext.execute(query);
  return result;
}

async function getLastRunningNo(params) {
  try {
    // Create a connection pool
    const pool = await new sql.ConnectionPool(config).connect();

    const query = `select top 1 document_no as documentNo from TBLLogDocumentNo 
    where unit_id = @1 and document_no like @2
    order by document_no desc;`;
    const request = pool.request();
    const result = await request
      .input("1", sql.Int, params.unitId)
      .input("2", sql.VarChar, params.dateDoc + "%")
      .query(query);

    // Close the connection pool
    pool.close();

    // Pass the result to another function
    return helperService.responseResult(
      "success",
      "OK",
      result.recordset.length,
      result.recordset.length > 0 ? result.recordset[0].documentNo : 0
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

async function saveLogDocumentNo(params) {
  const query = `insert into TBLLogDocumentNo (document_no,unit_id ,generate_datetime) values (@1,@2,GETDATE())`;
  let result = await dbContext.executeInsert(query, params);
  return result;
}

async function updateStatus(params) {
  const query = `UPDATE TBLCashRequest_H 
  SET document_status_id = @1, update_by = @2, update_date = GETDATE() 
  WHERE id = @3 AND document_status_id = @4;`;
  let result = await dbContext.executeUpdate(query, params);
  return result;
}

async function findCashRequest(params) {
  const query = `EXEC sel_cash_request @1, @2, @3, @4, @5 ;`;
  let result = await dbContext.executeSp(query, params);
  return result;
}

async function findCashHeader(params) {
  const query = `EXEC sel_cash_request_header @1, @2, @3, @4, @5 ;`;
  let result = await dbContext.executeSp(query, params);
  return result;
}

async function findCashDetail(params) {
  const query = `EXEC sel_cash_request_detail @1 ;`;
  let result = await dbContext.executeSp(query, params);
  return result;
}

async function deleteDetail(params) {
  const query = `DELETE FROM TBLCashRequest_D WHERE h_id = @1;`;
  let result = await dbContext.executeDelete(query, params);
  return result;
}

async function updateCashHeader(params) {
  const query = `UPDATE TBLCashRequest_H SET update_by = @1, rec_send_date = @3, 
  document_remark = @4, update_date = GETDATE() 
  WHERE id = @2;`;
  let result = await dbContext.executeUpdate(query, params);
  return result;
}

async function cancelCash(params) {
  const query = `UPDATE TBLCashRequest_H SET cancel_by  = @1, cancel_datetime  = GETDATE(), cancel_remark = @2, document_status_id = @3 WHERE id = @4;`;
  let result = await dbContext.executeUpdate(query, params);
  return result;
}

async function approveCashDetail(params) {
  const query = `UPDATE TBLCashRequest_D set approve_cash_amount = cash_amount , approve_collect_cash_amount = collect_cash_amount,
  approve_other_cash_type = other_cash_type , approve_people_amount = people_amount 
  WHERE h_id = @1;`;
  let result = await dbContext.executeUpdate(query, params);
  return result;
}

async function approveCashHeader(params) {
  const query = `UPDATE TBLCashRequest_H set document_status_id = @1, approve_by = @2, approve_date = GETDATE()
  WHERE id = @3;`;
  let result = await dbContext.executeUpdate(query, params);
  return result;
}

async function resetCash(params) {
  const query = `UPDATE TBLCashRequest_H set document_status_id = @1, reset_by  = @2, reset_datetime  = GETDATE(),
  reset_remark = @3 WHERE id = @4;`;
  let result = await dbContext.executeUpdate(query, params);
  return result;
}

module.exports = {
  saveHeader,
  saveDetail,
  getLastId,
  getLastRunningNo,
  saveLogDocumentNo,
  updateStatus,
  findCashRequest,
  findCashHeader,
  findCashDetail,
  deleteDetail,
  updateCashHeader,
  cancelCash,
  approveCashDetail,
  approveCashHeader,
  resetCash,
};
