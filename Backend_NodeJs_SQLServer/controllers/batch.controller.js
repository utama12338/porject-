const _batchService = require("../services/batch.service");

module.exports = function (router) {
  const batchService = _batchService();

  router.route("/batch/cbs").post(batchService.getCashTotalCbsBatch);

  router.route("/batch/base24").post(batchService.getCashTotalBase24Batch);

  router.route("/batch/fis").post(batchService.postCashTotalFISBatch);

  router
    .route("/batch/moveToCashConfirmDay1")
    .post(batchService.moveCashReqToCashConf);

  router.route("/batch/event").post(batchService.deleteFileEventExpire)
};
