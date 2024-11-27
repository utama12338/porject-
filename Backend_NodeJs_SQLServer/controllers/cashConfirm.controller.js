const _cashConfirmService = require('../services/cashConfirm.service');

module.exports = function(router){
    const cashConfirmService = _cashConfirmService();

    router.route('/getDocCashConfirm').post(cashConfirmService.getDocNo);

    router.route("/findCashConfHeader").post(cashConfirmService.findCashHeader);

    router.route("/findCashConfDetail").post(cashConfirmService.findCashDetail);

    router.route("/confirmCash").post(cashConfirmService.confirmCash);

    router.route("/updateCashConfirm").post(cashConfirmService.updateCash);

    router.route("/resetCashConfirm").post(cashConfirmService.resetCash);

}