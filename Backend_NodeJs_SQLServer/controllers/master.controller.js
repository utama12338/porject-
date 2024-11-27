const _masterService = require("../services/master.service");

module.exports = function (router) {
  const masterService = _masterService();

  router.route("/findCash").post(masterService.getCash);

  router.route("/findCashType").post(masterService.getCashType);

  router.route("/findCashTypeByCashAndTransType").post(masterService.getCashTypeByCashAndTransType);

  router.route("/findTransType").post(masterService.getTransactionType);

  router.route("/findTransTypeByUnitType").post(masterService.getTransTypeByUnitType);

  router.route("/findUnitInfo").post(masterService.getUnitInformation);

  router.route("/findUnnitInfoType").post(masterService.getUnitInformationType);

  router.route("/findStatus").post(masterService.getStatus);

  router.route("/findUnitInformationByUnitType").post(masterService.getUnitInformationByUnitType);

  router.route("/findCashCenter").get(masterService.getCashCenter);

  router.route("/master/cashcenter/add").post(masterService.addCashCenter);

  router.route("/master/cashcenter/edit").post(masterService.editCashCenter);

  router.route("/master/cashcenter/delete").post(masterService.deleteCashCenter);

  router.route("/master/cashcenter/findByName").post(masterService.getCashCenterByName);

  router.route("/master/check/cashAmount").get(masterService.checkCashAmount);

  router.route("/master/unitInfo/add").post(masterService.addUnitInformation);

  router.route("/master/unitInfo/edit").post(masterService.editUnitInformation);

  router.route("/master/unitInfo/delete").post(masterService.deleteUnitInformation);

  router.route("/master/gsb/findRegion").get(masterService.getRegion);

  router.route("/master/gsb/findZone").get(masterService.getZone);

  router.route("/master/gsb/findProvince").get(masterService.getProvince);

  router.route("/master/unitInfo/findWorkDay").get(masterService.getWorkDay);

  router.route("/master/unitInfo/findCutOffTime").get(masterService.getCutOffTime);

  router.route("/master/unitInfo/findUnitInfoDeatil").post(masterService.getUnitInformationDetail);

  router.route("/master/cash/find").post(masterService.getCashSearch);

  router.route("/master/cash/add").post(masterService.addCash);

  router.route("/master/cash/edit").post(masterService.editCash);

  router.route("/master/cash/delete").post(masterService.deleteCash);

  router.route("/master/otherCash/find").get(masterService.getOthCashTypeAll);

  router.route("/master/otherCash/add").post(masterService.addOthCashType);

  router.route("/master/otherCash/edit").post(masterService.updateOthCashType);

  router.route("/master/otherCash/delete").post(masterService.deleteOthCashType);

  router.route("/master/cashAsset/find").post(masterService.getCashAsset);

  router.route("/master/cashAsset/add").post(masterService.getCashAsset);

  router.route("/master/cashAsset/edit").post(masterService.updateCashAsset);

  router.route("/master/cashAsset/delete").post(masterService.deleteCashAsset);

  router.route("/master/holiday/find").post(masterService.getHoliday);

  router.route("/master/holiday/add").post(masterService.addHoliday);

  router.route("/master/holiday/edit").post(masterService.updateHoliday);

  router.route("/master/holiday/delete").post(masterService.deleteHoliday);

  router.route("/master/event/find").get(masterService.getEvent);

  router.route("/master/event/add").post(masterService.addEvent);

  router.route("/master/event/edit").post(masterService.updateEvent);

  router.route("/master/event/delete").post(masterService.deleteEvent);

  router.route("/master/event/show").get(masterService.showEvent);

  router.route("/master/event/lastId").get(masterService.getLastIdEvent);


};
 