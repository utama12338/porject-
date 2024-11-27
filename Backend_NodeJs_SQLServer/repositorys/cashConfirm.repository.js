var config = require("../database/dbconfig");
const sql = require("mssql");
const helperService = require("../services/helper.service");
const dbContext = require("../database/dbContext");

async function getLastRunningNo(params) {
  try {
    // Create a connection pool
    const pool = await new sql.ConnectionPool(config).connect();

    const query = `select top 1 document_no as documentNo from TBLLogDocumentNoCashConfirm 
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
  const query = `insert into TBLLogDocumentNoCashConfirm (document_no,unit_id ,generate_datetime) values (@1,@2,GETDATE())`;
  let result = await dbContext.executeInsert(query, params);
  return result;
}

async function batchCashConfirm(params){
  const query = `select id as cashReqIdH, unit_id as unitId, unit_type_id as unitTypeId from TBLCashRequest_H h 
  where h.document_status_id = @1
  and convert(varchar,rec_send_date,112) = @2;`
  let result = await dbContext.executeListWithParam(query, params);
  return result;
}

async function createCashConfirm(params){
  const query = `insert into TBLCashConfirm_H (document_no,document_date,unit_id,unit_type_id,cash_req_h_id,status_id,create_by,create_date)
  values(@1,GETDATE(),@2,@3,@4,@5,@6,GETDATE());`
  let result = await dbContext.executeInsert(query, params);
  return result;
}

async function findCashHeader(params) {
  const query = `EXEC sel_cash_confirm_header @1, @2, @3, @4, @5 ;`;
  let result = await dbContext.executeSp(query, params);
  return result;
}

async function findCashDetail(params) {
  const query = `EXEC sel_cash_confirm_detail @1 ;`;
  let result = await dbContext.executeSp(query, params);
  return result;
}

async function confirmHeader(params){
  const query = `EXEC update_confirm_cash_header @1, @2, @3, @4, @5, @6, @7, @8, @9 ;`
  let result = await dbContext.executeSp(query, params);
  return result;
}

async function confirmDetail(params){
  const query = `EXEC add_confirm_cash_details @1, @2, @3, @4, @5, @6, @7, @8, @9, @10 ;`
  let result = await dbContext.executeSpListForConfirmCashDetail(query, params);
  return result;
}

async function deleteDetail(params) {
  const query = `DELETE FROM TBLCashConfirm_D WHERE h_id = @1;`;
  let result = await dbContext.executeDelete(query, params);
  return result;
}

async function updateCashHeader(params){
  const query = `update TBLCashConfirm_H set update_by = @1, update_date = GETDATE() 
  where id = @2; `;
  let result = await dbContext.executeUpdate(query, params);
  return result;
}

async function resetCash(params){
  const query = `EXEC reset_cash_confirm @1, @2, @3, @4 ;`
  let result = await dbContext.executeSp(query, params);
  return result;
}


module.exports = { 
    getLastRunningNo,
    saveLogDocumentNo,
    batchCashConfirm,
    createCashConfirm,
    findCashHeader,
    findCashDetail,
    confirmDetail,
    confirmHeader,
    updateCashHeader,
    deleteDetail,
    resetCash

}