const helperService = require("../services/helper.service");
const cashRepo = require("../repositorys/cash.repository");
const { format, addYears } = require("date-fns");

function CashService() {
  async function saveCashRequest(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (
      !req.body.documentNo ||
      !req.body.unitTypeId ||
      !req.body.unitId ||
      !req.body.recSendDate ||
      !req.body.createBy ||
      !req.body.details
    ) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    }

    let timeTransaction = format(new Date(), "HH:mm");
    let paramsH = {
      documentNo: req.body.documentNo,
      unitTypeId: req.body.unitTypeId,
      unitId: req.body.unitId,
      recSendDate: req.body.recSendDate,
      createBy: req.body.createBy,
      documentType: req.body.documentType,
      documentRemark: req.body.documentRemark,
      timeTransaction: timeTransaction,
      userTransaction: req.body.createBy,
    };

    let resultH = await cashRepo.saveHeader(paramsH);
    if (resultH.status === "success") {
      let idH = await cashRepo.getLastId();
      let paramsD = {
        idH: idH.data.id,
        details: req.body.details,
      };

      let resultD = await cashRepo.saveDetail(paramsD);
      if (resultD.status === "success") {
        return res.status(200).json(resultD);
      } else {
        console.error(resultD.message);
        return res
          .status(200)
          .json(helperService.responseResult("error", resultD.message, 0, []));
      }
    } else {
      console.error(resultH.message);
      return res
        .status(200)
        .json(helperService.responseResult("error", resultH.message, 0, []));
    }
  }

  async function getDocumentNo(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (!req.body.unitId) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    }

    const yyMM = format(addYears(new Date(), 543), "yyMM");
    const unitCode = await helperService.convertIdTo4Code(req.body.unitId);
    let paramsCheck = {
      unitId: req.body.unitId,
      dateDoc: yyMM + "-" + unitCode,
    };

    let lastNo = await cashRepo.getLastRunningNo(paramsCheck);
    let autoNo =
      lastNo.data <= 0
        ? 1
        : parseInt(lastNo.data.substring(lastNo.data.length - 3)) + 1;
    let genNo = await helperService.convertIdTo3Code(autoNo);

    let paramsSave = {
      documentNo: yyMM + "-" + unitCode + "-" + genNo,
      unitId: req.body.unitId,
    };
    let result = await cashRepo.saveLogDocumentNo(paramsSave);
    if (result.status === "success") {
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "succss",
            "OK",
            1,
            yyMM + "-" + unitCode + "-" + genNo
          )
        );
    } else {
      console.error("Error can't generate document no ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถ generate เลขที่เอกสารได้",
            0,
            []
          )
        );
    }
  }

  async function getLastId(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }
    let result = await cashRepo.getLastId();
    if (result.status === "success") {
      return res
        .status(200)
        .json(
          helperService.responseResult(
            result.status,
            result.message,
            result.size,
            result.data.id
          )
        );
    } else {
      console.error(
        "Error can't get last header id from TBLCashRequest_H ",
        result
      );
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "can't get last header id from TBLCashRequest_H",
            0,
            []
          )
        );
    }
  }

  async function updateStatusPendingToWaitApprove(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (
      !req.body.idH ||
      !req.body.updateBy ||
      !req.body.beforeStatusId ||
      !req.body.afterStatusId
    ) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    } else {
      if (req.body.beforeStatusId === 1 && req.body.afterStatusId === 2) {
        let params = {
          afterStatusId: req.body.afterStatusId,
          updateBy: req.body.updateBy,
          idH: req.body.idH,
          beforeStatusId: req.body.beforeStatusId,
        };
        let result = await cashRepo.updateStatus(params);
        if (result.status === "success") {
          return res.status(200).json(result);
        } else {
          console.error(
            "Error can't update status 1 to 2 idH: " + req.body.idH
          );
          return res
            .status(200)
            .json(
              helperService.responseResult(
                "error",
                "ไม่สามารถอัพเดตเป็นสถานะ รออนุมัติ ได้",
                0,
                []
              )
            );
        }
      } else {
        console.error("Error can't update status 1 to 2 idH: " + req.body.idH);
        return res
          .status(200)
          .json(
            helperService.responseResult(
              "error",
              "สถานะไม่ถูกต้อง ไม่สามารถอัพเดตเป็นสถานะ รออนุมัติ ได้",
              0,
              []
            )
          );
      }
    }
  }

  async function cancelCash(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }
    if (!req.body.cancelBy || !req.body.cancelRemark || !req.body.idH) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    } else {
      let params = {
        cancelBy: req.body.cancelBy,
        cancelRemark: req.body.cancelRemark,
        statusId: 4,
        idH: req.body.idH,
      };

      let result = await cashRepo.cancelCash(params);
      if (result.status === "success") {
        return res.status(200).json(result);
      } else {
        console.error("can't cancel cash request", result);
        return res
          .status(200)
          .json(
            helperService.responseResult(
              "error",
              "ไม่สามารถยกเลิกเอกสารฉบับนี้ได้",
              0,
              []
            )
          );
      }
    }
  }

  async function findCash(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (
      !req.body.startDate ||
      !req.body.endDate ||
      !req.body.unitId ||
      !req.body.statusId
    ) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    } else {
      let params = {
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        unitId: req.body.unitId,
        unitName: req.body.unitName,
        statusId: req.body.statusId,
      };

      let result = await cashRepo.findCashRequest(params);
      if (result.status === "success") {
        return res.status(200).json(result);
      } else {
        console.error("Error can't find cash request data. ", result);
        return res
          .status(200)
          .json(
            helperService.responseResult(
              "error",
              "can't find cash request data.",
              0,
              []
            )
          );
      }
    }
  }

  async function findCashHeader(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (
      !req.body.startDate ||
      !req.body.endDate ||
      !req.body.unitId ||
      !req.body.statusId
    ) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    } else {
      let params = {
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        unitId: req.body.unitId,
        unitName: req.body.unitName,
        statusId: req.body.statusId,
      };

      let result = await cashRepo.findCashHeader(params);
      if (result.status === "success") {
        return res.status(200).json(result);
      } else {
        console.error("Error can't find cash request data. ", result);
        return res
          .status(200)
          .json(
            helperService.responseResult(
              "error",
              "can't find cash request data.",
              0,
              []
            )
          );
      }
    }
  }

  async function findCashDetail(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }
    if (!req.body.idH) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    } else {
      let params = {
        idH: req.body.idH,
      };

      let result = await cashRepo.findCashDetail(params);
      if (result.status === "success") {
        return res.status(200).json(result);
      } else {
        console.error("Error can't find cash request data. ", result);
        return res
          .status(200)
          .json(
            helperService.responseResult(
              "error",
              "can't find cash request data.",
              0,
              []
            )
          );
      }
    }
  }

  async function updateCash(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (!req.body.idH || !req.body.updateBy || !req.body.recSendDate  || !req.body.details) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    } else {
      let paramsDelete = { idH: req.body.idH };
      let resultDelete = await cashRepo.deleteDetail(paramsDelete);

      if (resultDelete.status === "success") {
        let paramsD = {
          idH: req.body.idH,
          details: req.body.details,
        };

        let resultD = await cashRepo.saveDetail(paramsD);

        if (resultD.status === "success") {
          let paramsH = {
            updateBy: req.body.updateBy,
            idH: req.body.idH,
            recSendDate: req.body.recSendDate,
            documentRemark: req.body.documentRemark
          };

          let resultH = await cashRepo.updateCashHeader(paramsH);
          if (resultH.status === "success") {
            return res.status(200).json(resultH);
          } else {
            return res
              .status(200)
              .json(
                helperService.responseResult(
                  "error",
                  "แก้ไขข้อมูลไม่สำเร็จ กรุณายกเลิกเอกสารฉบับนี้",
                  0,
                  []
                )
              );
          }
        } else {
          return res
            .status(200)
            .json(
              helperService.responseResult(
                "error",
                "แก้ไขข้อมูลไม่สำเร็จ กรุณายกเลิกเอกสารฉบับนี้",
                0,
                []
              )
            );
        }
      } else {
        return res
          .status(200)
          .json(
            helperService.responseResult("error", "แก้ไขข้อมูลไม่สำเร็จ", 0, [])
          );
      }
    }
  }

  async function approveCash(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (!req.body.idH || !req.body.approveBy) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    } else {
      let paramsD = {
        idH: req.body.idH,
      };
      let resultD = await cashRepo.approveCashDetail(paramsD);

      if (resultD.status === "success") {
        let paramsH = {
          statusId: 3,
          approveBy: req.body.approveBy,
          idH: req.body.idH,
        };
        let resultH = await cashRepo.approveCashHeader(paramsH);

        if (resultH.status === "success") {
          return res.status(200).json(resultH);
        } else {
          console.error("Error approve cash " + resultH);
          return res
            .status(200)
            .json(
              helperService.responseResult(
                "error",
                "อนุมัติเอกสารบันทึกความต้องการไม่สำเร็จ",
                0,
                []
              )
            );
        }
      } else {
        console.error("Error approve cash " + resultD);
        return res
          .status(200)
          .json(
            helperService.responseResult(
              "error",
              "อนุมัติเอกสารบันทึกความต้องการไม่สำเร็จ",
              0,
              []
            )
          );
      }
    }
  }

  async function resetCash(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (!req.body.idH || !req.body.resetBy || !req.body.resetRemark) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    } else {
      let params = {
        statusId: 1,
        resetBy: req.body.resetBy,
        resetRemark: req.body.resetRemark,
        idH: req.body.idH,
      };
      let result = await cashRepo.resetCash(params);

      if(result.status === "success"){
        return res.status(200).json(result);
      }else{
        console.error("Error reset cash " + result);
        return res
          .status(200)
          .json(
            helperService.responseResult(
              "error",
              "ปลดล็อคเอกสารบันทึกความต้องการไม่สำเร็จ",
              0,
              []
            )
          );
      }
    }
  }

  return {
    saveCashRequest,
    getDocumentNo,
    getLastId,
    updateStatusPendingToWaitApprove,
    cancelCash,
    findCash,
    findCashHeader,
    findCashDetail,
    updateCash,
    approveCash,
    resetCash,
  };
}

module.exports = CashService;
