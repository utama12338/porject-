const _reportService = require("../services/report.service");

module.exports = function (router){
    const reportService = _reportService();

    router.route("/report/rptCashRequestByDocno").post(reportService.rptCashRequestByDocno);

    router.route("/report/rptCashRequestCashCenter").post(reportService.rptCashRequestCashCenter);

    router.route("/report/rptSendCashConfirmByDocno").post(reportService.rptSendCashConfirmByDocno);

    router.route("/report/rptReceiveCashConfirmByDocno").post(reportService.rptReceiveCashConfirmByDocno);

    router.route("/report/rptSendCashConfirmByFillter").post(reportService.rptSendCashConfirmByFillter);

    router.route("/report/rptReceiveCashConfirmByFillter").post(reportService.rptReceiveCashConfirmByFillter);

    router.route("/report/rptCashRequestSummary").post(reportService.rptCashRequestSummary);

    router.route("/report/rptBranchCashFailedSummary").post(reportService.rptBranchCashFailedSummary);

    router.route("/report/rptCenterCashFailedSummary").post(reportService.rptCenterCashFailedSummary);

    router.route("/report/rptUserSystem").post(reportService.rptUserSystem);

    router.route("/report/rptCashDiff").post(reportService.rptCashDiff);

    router.route("/report/rptDocumentCashRequestWithdrawDeposit").post(reportService.rptDocumentCashRequestWithdrawDeposit);

    router.route("/report/rptCashFake").post(reportService.rptCashFake);

    router.route("/report/rptSendAndReceiveCashConfirmByFillter").post(reportService.rptSendAndReceiveCashConfirmByFillter);

}