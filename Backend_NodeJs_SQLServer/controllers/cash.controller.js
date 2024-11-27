const _cashService = require("../services/cash.service");

module.exports = function (router) {
    const cashService = _cashService();

    router.route("/saveCash").post(cashService.saveCashRequest);

    router.route("/getDocNo").post(cashService.getDocumentNo);

    router.route("/getLastId").post(cashService.getLastId);

    router.route("/pendingToWaitApprove").post(cashService.updateStatusPendingToWaitApprove);

    router.route("/findCashRequest").post(cashService.findCash);

    router.route("/findCashHeader").post(cashService.findCashHeader);

    router.route("/findCashDetail").post(cashService.findCashDetail);

    router.route("/updateCash").post(cashService.updateCash);

    router.route("/cancelCash").post(cashService.cancelCash);

    router.route("/approveCash").post(cashService.approveCash);

    router.route("/resetCash").post(cashService.resetCash);

    


    
}