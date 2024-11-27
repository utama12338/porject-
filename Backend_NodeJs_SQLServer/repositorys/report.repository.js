const dbContext = require("../database/dbContext");

async function rptCashRequestByDocno(params) {
  const query = `EXEC rpt_cash_request_by_docno @1 ;`;
  let result = await dbContext.executeSpRpt(query, params);
  return result;
}

async function rptCashRequestCashCenter(params) {
  const query = `rpt_cash_request_cash_center @1, @2, @3 ;`;
  let result = await dbContext.executeSpRpt(query, params);
  return result;
}

async function rptSendCashConfirmByDocno(params) {
  const query = `EXEC rpt_send_cash_confirm_by_docno @1 ;`;
  let result = await dbContext.executeSpRpt(query, params);
  return result;
}

async function rptReceiveCashConfirmByDocno(params) {
  const query = `EXEC rpt_receive_cash_confirm_by_docno @1 ;`;
  let result = await dbContext.executeSpRpt(query, params);
  return result;
}

async function rptSendCashConfirmByFillter(params) {
  const query = `EXEC rpt_send_cash_confirm_by_fillter @1, @2 ;`;
  let result = await dbContext.executeSpRpt(query, params);
  return result;
}

async function rptReceiveCashConfirmByFillter(params) {
  const query = `EXEC rpt_receive_cash_confirm_by_fillter @1, @2 ;`;
  let result = await dbContext.executeSpRpt(query, params);
  return result;
}

async function rptCashRequestSummary(params) {
  const query = `EXEC rpt_cash_request_summary @1, @2, @3 ;`;
  let result = await dbContext.executeSpRpt(query, params);
  return result;
}

async function rptBranchCashFailedSummary(params) {
  const query = `EXEC rpt_branch_cash_failed_summary @1, @2, @3 ;`;
  let result = await dbContext.executeSpRpt(query, params);
  return result;
}

async function rptCenterCashFailedSummary(params) {
  const query = `EXEC rpt_center_cash_failed_summary @1, @2, @3 ;`;
  let result = await dbContext.executeSpRpt(query, params);
  return result;
}

async function rptUserSystem(params) {
  const query = `EXEC rpt_user_system @1 ;`;
  let result = await dbContext.executeSpRpt(query, params);
  return result;
}

async function rptCashDiff(params) {
  const query = `EXEC rpt_cash_diff @1, @2, @3 ;`;
  let result = await dbContext.executeSpRpt(query, params);
  return result;
}

async function rptDocumentCashRequestWithdrawDeposit(params) {
  const query = `EXEC rpt_document_cash_request_withdraw_deposit @1, @2, @3 ;`;
  let result = await dbContext.executeSpRpt(query, params);
  return result;
}

async function rptCashFake(params) {
  const query = `EXEC rpt_cash_fake @1, @2, @3 ;`;
  let result = await dbContext.executeSpRpt(query, params);
  return result;
}

async function selectDocumentNoForExport(params) {
  const query = `select top 1 cfh.document_no as documentNo from TBLCashConfirm_H cfh 
    left join TBLCashRequest_H crh on crh.id = cfh.cash_req_h_id 
    where cfh.status_id in (6,7,8)
    and convert(varchar,crh.rec_send_date,112) = @1
    and cfh.unit_id = @2 order by cfh.id desc;`;
  let result = await dbContext.executeListWithParam(query, params);
  return result;
}

async function selectCashCenterName(params) {
  const query = `select cashCenter.cash_center_name  as cashCenter  
    from TBLUnitInformation unit
    left join TBLCashCenter cashCenter on cashCenter.cash_center_code = unit.cash_center and cashCenter.cash_center_active = 1
    where unit.id = @1 ;`;
  let result = await dbContext.executeListWithParam(query, params);
  return result;
}
module.exports = {
  rptCashRequestByDocno,
  rptSendCashConfirmByDocno,
  rptReceiveCashConfirmByDocno,
  rptSendCashConfirmByFillter,
  rptReceiveCashConfirmByFillter,
  rptCashRequestCashCenter,
  rptCashRequestSummary,
  rptBranchCashFailedSummary,
  rptCenterCashFailedSummary,
  rptUserSystem,
  rptCashDiff,
  rptDocumentCashRequestWithdrawDeposit,
  rptCashFake,
  selectDocumentNoForExport,
  selectCashCenterName,
};
