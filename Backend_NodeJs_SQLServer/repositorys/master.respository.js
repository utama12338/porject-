var config = require("../database/dbconfig");
const sql = require("mssql");
const dbContext = require("../database/dbContext");

async function getCashType() {
  try {
    let pool = await sql.connect(config);
    let user = await pool
      .request()
      .query(
        `select id as cashTyeId, cash_type as cashTypeName from TBLCashType where cash_active = 1 order by cash_type;`
      );

    // return product.recordsets;
    return user.recordsets;
  } catch (error) {
    console.log("Find user is error : ", errorr);
  }
}

async function getCash() {
  try {
    let pool = await sql.connect(config);
    let user = await pool.request().query(
      `select c.id as cashId , concat(c.cash_amt, ' ', cu.cash_unit) as cashName  from TBLCash c left join TBLCashUnitType cu on c.cash_unit = cu.id
          where c.cash_active = 1 order by c.id;`
    );

    // return product.recordsets;
    return user.recordsets;
  } catch (error) {
    console.log("Find user is error : ", errorr);
  }
}

async function getTransactionType() {
  try {
    let pool = await sql.connect(config);
    let user = await pool
      .request()
      .query(
        `select id as transTypeId, trans_type as transTypeName from TBLTransactionType;`
      );

    // return product.recordsets;
    return user.recordsets;
  } catch (error) {
    console.log("Find user is error : ", errorr);
  }
}

async function getUnitInformation() {
  const query = `select id as value, unit_name as name from TBLUnitInformation where unit_active = 1 order by unit_name;`;
  let result = await dbContext.executeList(query);
  return result;
}

async function getUnitInformationType() {
  const query = `select id as value, unit_name as unitType from TBLUnitType where unit_active = 1 order by id;`;
  let result = await dbContext.executeList(query);
  return result;
}

async function getStatus() {
  const query = `select id as value, status_name as name from TBLStatus where status_active = 1 order by id;`;
  let result = await dbContext.executeList(query);
  return result;
}

async function getUnitInformationByUnitType(param) {
  const query = `select id as value, unit_name as name from TBLUnitInformation 
  where unit_active = 1 and convert(int,unit_type_id) = @1 order by unit_name;`;
  let result = await dbContext.executeListWithParam(query, param);
  return result;
}

async function getCashCenter() {
  const query = `select cash_center_code as value, cash_center_name as name from TBLCashCenter 
  where cash_center_active = 1 order by cash_center_name;`;
  let result = await dbContext.executeList(query);
  return result;
}

async function checkCashCenterDupplicate(param) {
  const query = `select cash_center_code from TBLCashCenter 
  where cash_center_active = 1 and cash_center_code = @1 ;`;
  let result = await dbContext.executeWihtParams(query, param);
  return result;
}

async function addCashCenter(param) {
  const query = `insert into TBLCashCenter(cash_center_code,cash_center_name,cash_center_active)
  values(@1,@2,1);`;
  let result = await dbContext.executeInsert(query, param);
  return result;
}

async function editCashCenter(param) {
  const query = `update TBLCashCenter set cash_center_name = @2, cash_center_active = @3
  where cash_center_code = @1;`;
  let result = await dbContext.executeUpdate(query, param);
  return result;
}

async function deleteCashCenter(param) {
  const query = `delete from TBLCashCenter where cash_center_code = @1;`;
  let result = await dbContext.executeDelete(query, param);
  return result;
}

async function getCashCenterByName(param) {
  const query = `select id as cashCenterId, cash_center_code as cashCerterCode ,cash_center_name as cashCenterName, cash_center_active as cashCenterActive 
  from TBLCashCenter where cash_center_name like '%' + @1+ '%' `;
  let result = await dbContext.executeListWithParam(query, param);
  return result;
}

async function checkCashAmount(param) {
  const query = `select cash_save_limit as cashLimitAmount from TBLUnitInformation where id = @1;`;
  let result = await dbContext.executeWihtParams(query, param);
  return result;
}

async function addUnitInformation(param) {
  const query = `insert into TBLUnitInformation (unit_name,unit_type_id,region_code,zone_code,cost_center,cash_center,unit_province,unit_address,
    work_day_id,work_time_start,work_time_end,cut_off_time_id,cash_save_limit,tier,
    ip_phone,service_day,remark,unit_active) values (@1,@2,@3,@4,@5,@6,@7,@8,@9,
    @10,@11,@12,@13,@14,@15,
    @16,@17,1);`;

  let result = await dbContext.executeInsert(query, param);
  return result;
}

async function editUnitInformation(param) {
  const query = `update TBLUnitInformation set unit_name = @2, unit_type_id = @3, region_code = @4,
	zone_code =  @5, cost_center = @6, cash_center = @7, unit_province = @8, unit_address = @9,
	work_day_id = @10, work_time_start = @11, work_time_end = @12, cut_off_time_id = @13,
	cash_save_limit = @14, tier = @15, ip_phone = @16, service_day = @17, remark = @18, unit_active = @19
	where id = @1;`;
  let result = await dbContext.executeUpdate(query, param);
  return result;
}

async function deleteUnitInformation(param) {
  const query = `delete from TBLUnitInformation where id = @1;`;
  let result = await dbContext.executeDelete(query, param);
  return result;
}

async function getRegion() {
  const query = `select region_code as value, region_name as name from TBLRegion where active_status = 1;`;
  let result = await dbContext.executeList(query);
  return result;
}

async function getZone() {
  const query = `select zone_code as value, zone_name as name from TBLZone where active_status = 1;`;
  let result = await dbContext.executeList(query);
  return result;
}

async function getProvince() {
  const query = `select id as value, province_name as name from TBLProvince where active_status = 1;`;
  let result = await dbContext.executeList(query);
  return result;
}

async function getWorkDay() {
  const query = `select id as value, day as name from TBLWorkDay where day_active = 1;`;
  let result = await dbContext.executeList(query);
  return result;
}

async function getCutOffTime() {
  const query = `select id as value, cut_off_time as name from TBLCutOffTime where cut_off_time_active = 1;`;
  let result = await dbContext.executeList(query);
  return result;
}

async function getUnitInformationDetail(param) {
  var query = `select 
                unit.id as unitId, unit.unit_name as unitName, unitType.id as unitTypeId, unitType.unit_name as unitTypeName,
                unit.branch_org64 as org64, region.region_code as regionCode, region.region_name as regionName, unit.unit_address as unitAddress, 
                zone.zone_code as zoneCode, zone.zone_name as zoneName, province.id as provinceId, province.province_name as provinceName,
                unit.cost_center as costCenter, cashCenter.cash_center_code as cashCenterCode, cashCenter.cash_center_name as cashCenterName,
                workday.id as workDayId, workday.day as workDayName, unit.work_time_start as workTimeStart, unit.work_time_end as workTimeEnd,
                cutofftime.id as cutOffTimeId, cutofftime.cut_off_time as cutOffTimeName, unit.cash_save_limit as cashSaveLimit,
                unit.tier, unit.ip_phone as ipPhone, unit.service_day as serviceDay, unit.remark, unit.unit_active as unitActive
              from TBLUnitInformation unit
              left join TBLUnitType unitType on unitType.id = unit.unit_type_id and unitType.unit_active = 1
              left join TBLCashCenter cashCenter on cashCenter.cash_center_code = unit.cash_center and cashCenter.cash_center_active = 1
              left join TBLRegion region on region.region_code = unit.region_code and region.active_status = 1
              left join TBLZone zone on zone.zone_code = unit.zone_code and zone.active_status = 1
              left join TBLProvince province on province.id = unit.unit_province and province.active_status = 1
              left join TBLWorkDay workday on workday.id = unit.work_day_id and workday.day_active = 1
              left join TBLCutOffTime cutofftime on cutofftime.id = unit.cut_off_time_id and cutofftime.cut_off_time_active = 1
              where 1=1 `;

  if (param.unitName) {
    query += `and unit.unit_name like '%${param.unitName}%' `;
  }
  console.log(param.unitName);
  console.log(query);

  if (param.zoneCode) {
    query += `and zone.zone_code = '${param.zoneCode}' `;
  }

  if (param.regionCode) {
    query += `and region.region_code = '${param.regionCode}' `;
  }

  if (param.cashCenterCode) {
    query += `and cashCenter.cash_center_code = '${param.cashCenterCode}' `;
  }

  if (param.unitTypeId) {
    query += `and unit.unit_type_id = ${param.unitTypeId} `;
  }

  let result = await dbContext.executeList(query);
  return result;
}

async function getCashTypeByCashAndTransType(param) {
  const query = `select ct.id as cashTyeId, ct.cash_type as cashTypeName
  from TBLCashXCashType cxct
  left join TBLCash c on c.id  = cxct.cash_id and c.cash_active = 1
  left join TBLCashType ct on ct.id  = cxct.cash_type_id and ct.cash_active = 1
  left join TBLUnitType ut on ut.id = cxct.unit_type_id and ut.unit_active = 1
  left join TBLTransactionType trt on trt.id  = cxct.trans_type_id
  where cxct.active = 1 and ut.id = @1  and c.id = @2  and trt.id = @3 ;`;
  let result = await dbContext.executeListWithParam(query, param);
  return result;
}

async function getTransTypeByUnitType(param) {
  const query = `select  tt.id as transTypeId, tt.trans_type as transTypeName 
  from TBLUnitTypeXTrans utxt
  left join TBLTransactionType tt  on tt.id  = utxt.trans_type_id
  where utxt.active = 1 and utxt.unit_type_id  = @1 ;`;
  let result = await dbContext.executeListWithParam(query, param);
  return result;
}

async function getCashSearch(param) {
  let query = `select c.id as cashId , concat(c.cash_amt, ' ', cu.cash_unit) as cashName, 
  c.cash_per_amt as cashPerAmt, c.cash_active as cashActive 
  from TBLCash c 
  left join TBLCashUnitType cu on c.cash_unit = cu.id
  where c.cash_active = 1 `;
  if (param.cashId) {
    query += `and c.id = ${param.cashId} `;
  }
  query += `order by c.id;`;
  let result = await dbContext.executeList(query);
  return result;
}

async function addCash(param) {
  const query = `insert into TBLCash (cash_amt, cash_unit, cash_per_amt, cash_active)
  values (@1, 1, @2, 1);`;
  let result = await dbContext.executeInsert(query, param);
  return result;
}

async function editCash(param) {
  const query = `update TBLCash set cash_amt = @2, cash_unit = 1, cash_per_amt = @3, cash_active = @4
  where id = @1;`;
  let result = await dbContext.executeUpdate(query, param);
  return result;
}

async function deleteCash(param) {
  const query = `update TBLCash set cash_active = 0 where id = @1;`;
  let result = await dbContext.executeDelete(query, param);
  return result;
}

async function getOthCashTypeAll() {
  const query = `select id as othCashTypeId, other_cash_type as othCashTypeName, other_cash_type_active as othCashTypeActive 
  from TBLOtherCashType
  where other_cash_type_active = 1;`;
  let result = await dbContext.executeList(query);
  return result;
}

async function addOthCashType(param) {
  const query = `insert into TBLOtherCashType (other_cash_type, other_cash_type_active)
  values (@1, 1);`;
  let result = await dbContext.executeInsert(query, param);
  return result;
}

async function updateOthCashType(param) {
  const query = `update TBLOtherCashType set other_cash_type = @2, other_cash_type_active = @3
  where id = @1;`;
  let result = await dbContext.executeUpdate(query, param);
  return result;
}

async function deleteOthCashType(param) {
  const query = `update TBLOtherCashType set other_cash_type_active = 0
  where id = @1;`;
  let result = await dbContext.executeUpdate(query, param);
  return result;
}

async function getCashAsset(param) {
  let query = `select c.id as cashId, c.cash_amt as cashName,
  ct.id as cashTypeId, ct.cash_type as cashTypeName,
  trt.id as transTypeId, trt.trans_type as trnasTypeName,
  ut.id as unitId, ut.unit_name as unitTypeName, cxct.id as cashXCashTypeId,
  cxct.active as cashXCashTypeActive, cxct.cash_per_amount as cashPerAmount
  from TBLCashXCashType cxct
  left join TBLCash c on c.id  = cxct.cash_id and c.cash_active = 1
  left join TBLCashType ct on ct.id  = cxct.cash_type_id and ct.cash_active = 1
  left join TBLUnitType ut on ut.id = cxct.unit_type_id and ut.unit_active = 1
  left join TBLTransactionType trt on trt.id  = cxct.trans_type_id
  where cxct.active = 1 `;

  if (param.unitTypeId) {
    query += ` and ut.id = ${param.unitTypeId}`;
  }

  let result = await dbContext.executeList(query);
  return result;
}

async function addCashAsset(param) {
  const query = `insert into TBLCashXCashType (cash_id, cash_type_id, cash_per_amount, unit_type_id, trans_type_id, active)
  values (@1, @2, @3, @4, @5, 1);`;
  let result = await dbContext.executeInsert(query, param);
  return result;
}

async function updateCashAsset(param) {
  const query = `update TBLCashXCashType set cash_id = @2, cash_type_id = @3, cash_per_amount = @4,
  unit_type_id = @5, trans_type_id = @6, active = @7 where id = @1;`;
  let result = await dbContext.executeUpdate(query, param);
  return result;
}

async function deleteCashAsset(param) {
  const query = `update TBLCashXCashType set active = 0 where id = @1;`;
  let result = await dbContext.executeUpdate(query, param);
  return result;
}

async function getHoliday(param) {
  let query = `select id as holidayId, holiday_date as holidayDate, holiday_name as holidayName,
  holiday_active as holidayActive  
  from TBLHolidays
  where holiday_active = 1 `;

  if (param.holidayYear) {
    query += `and holiday_year = ${param.holidayYear} `;
  }

  query += `order by holiday_date desc;`;

  let result = await dbContext.executeList(query);
  return result;
}

async function addHoliday(param) {
  const query = `insert into TBLHolidays (holiday_date,holiday_name,holiday_day,holiday_year,holiday_active)
  values(@1, @2, @3, @4, 1);`;
  let result = await dbContext.executeInsert(query, param);
  return result;
}

async function updateHoliday(param) {
  const query = `update TBLHolidays set holiday_date = @2, holiday_name = @3, holiday_day = @4,
  holiday_year = @5, holiday_active = @6 where id = @1;`;
  let result = await dbContext.executeUpdate(query, param);
  return result;
}

async function deleteHoliday(param) {
  const query = `update TBLHolidays set holiday_active = 0 where id = @1;`;
  let result = await dbContext.executeUpdate(query, param);
  return result;
}

async function getEvent(){
  const query = `select e.id as eventId, e.event_title as eventTitle, e.event_name as eventDesc,
  e.alltime_active as isShowAllTime, e.event_date_start as eventDateStart,
  e.event_date_end as eventDateEnd, e.event_time_start as eventTimeStart,
  e.event_time_end as eventTimeEnd, e.role_id_view as roleView, e.file_path as filePath, e.file_name as fileName
  from TBLEvent e order by e.id desc;`
  let result = await dbContext.executeList(query);
  return result;
}

async function addEvent(params){
  const query = `insert into TBLEvent(event_title, event_name, alltime_active, event_date_start, event_date_end, event_time_start, event_time_end, role_id_view, file_path, file_name)
  values (@1,@2,@3,@4,@5,@6,@7,@8,@9,@10);`
  let result = await dbContext.executeInsert(query,params);
  return result;  
}

async function updateEvent(params){
  const query = `update TBLEvent set event_title = @2, event_name = @3, alltime_active = @4, 
  event_date_start = @5, event_date_end = @6, 
  event_time_start = @7, event_time_end = @8, 
  role_id_view = @9, file_path = @10, file_name = @11 where id = @1 ;`
  let result = await dbContext.executeUpdate(query,params);
  return result;  
}

async function deleteEvent(params){
  const query = `delete from TBLEvent where id = @1 ;`
  let result = await dbContext.executeDelete(query,params);
  return result;  
}

async function showEvent(){
  const query = `select e.id as eventId, e.event_title as eventTitle, e.event_name as eventDesc,
  e.alltime_active as isShowAllTime, e.event_date_start as eventDateStart,
  e.event_date_end as eventDateEnd, e.event_time_start as eventTimeStart,
  e.event_time_end as eventTimeEnd, e.role_id_view as roleView, e.file_path as filePath, e.file_name as fileName
  from TBLEvent e 
  where e.alltime_active = 1 or 
  (convert(int,event_date_start) >= convert(int,FORMAT(GETDATE(),'yyyyMMdd')) and convert(int,event_date_end) <= convert(int,FORMAT(GETDATE(),'yyyyMMdd')) 
  and convert(int,e.event_time_start) >= convert(int,FORMAT(GETDATE(),'HHmm')) and convert(int,e.event_time_end) <= convert(int,FORMAT(GETDATE(),'HHmm'))) `;

  let result = await dbContext.executeList(query);
  return result;  
}

async function getLastIdEvent(){
  const query = `select top 1 id from TBLEvent order by id desc;`;
  let result = await dbContext.execute(query);
  return result;
}

async function  getEventExpire(){
  const query = `select e.file_path as filePath
  from TBLEvent e 
  where e.alltime_active = 0 or convert(int,e.event_time_end) < convert(int,FORMAT(GETDATE(),'HHmm'));`
  let result = await dbContext.executeList(query);
  return result;
}

module.exports = {
  getCash,
  getCashType,
  getTransactionType,
  getUnitInformation,
  getUnitInformationType,
  getStatus,
  getUnitInformationByUnitType,
  getCashCenter,
  addCashCenter,
  editCashCenter,
  checkCashCenterDupplicate,
  deleteCashCenter,
  getCashCenterByName,
  checkCashAmount,
  addUnitInformation,
  editUnitInformation,
  deleteUnitInformation,
  getRegion,
  getZone,
  getProvince,
  getWorkDay,
  getCutOffTime,
  getUnitInformationDetail,
  getCashTypeByCashAndTransType,
  getTransTypeByUnitType,
  getCashSearch,
  addCash,
  editCash,
  deleteCash,
  getOthCashTypeAll,
  addOthCashType,
  updateOthCashType,
  deleteOthCashType,
  getCashAsset,
  addCashAsset,
  updateCashAsset,
  deleteCashAsset,
  getHoliday,
  addHoliday,
  updateHoliday,
  deleteHoliday,
  getEvent,
  showEvent,
  addEvent,
  updateEvent,
  deleteEvent,
  getLastIdEvent,
  getEventExpire
};
