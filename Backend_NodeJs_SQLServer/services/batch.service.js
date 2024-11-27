const dotenv = require("dotenv");
dotenv.config();
const axios = require("axios");
const { format, addYears } = require("date-fns");
const helperService = require("./helper.service");
const ftpRepo = require("../repositorys/ftp.respository");
const cashConfRepo = require("../repositorys/cashConfirm.repository");
const cashConfirmRepo = require("../repositorys/cashConfirm.repository");
const masterRepo = require("../repositorys/master.respository");
const { getFtpFile } = require("./ftp.service");
const { deleteFile } = require("./file.service");

function BatchService() {
  async function getCashTotalCbsBatch(req, res) {
    let token = req.headers.token;
    if (token != process.env.API_KEY) {
      console.error("error unauthorization");
      return res.status(401).json({
        code: 401,
        status: false,
        massage: "unauthorization",
      });
    } else {
      req.setTimeout(0);
      let date = req.query.date
        ? format(new Date(req.query.date), process.env.CBS_FILE_DATE_FORMAT)
        : format(new Date(), process.env.CBS_FILE_DATE_FORMAT);
      let date2 = format(
        req.query.date ? new Date(req.query.date) : new Date(),
        "yyyy-MM-dd"
      );
      let fileName =
        process.env.CBS_FILE_NAME + `${date}.${process.env.CBS_FILE_TYPE}`;
      let filePath = process.env.FTP_CBS_PATH;

      getFtpFile(filePath, fileName, async (ftp) => {
        let data = ftp.toString().split("\n");

        let cbsResult = [];
        for (let index = 0; index < data.length; index++) {
          const element = data[index];

          if (element != "") {
            let dataPipe = element.split(",");
            cbsResult.push([date2].concat(fileName, dataPipe));
          }
        }

        if (cbsResult.length > 0) {
          const result = await ftpRepo.cbsImport(cbsResult);
          if (result.status === "success") {
            return res.status(200).json(result);
          } else {
            console.error("Error import cbs data " + result);
            return res
              .status(200)
              .json(
                helperService.responseResult(
                  "error",
                  "นำเข้าข้อมูล CBS ไม่สำเร็จ",
                  0,
                  []
                )
              );
          }
        } else {
          console.log("data from icom_cbs file is empty");
          return res
            .status(200)
            .json(
              helperService.responseResult(
                "error",
                "data from icom_cbs file is empty",
                cbsResult.length,
                []
              )
            );
        }
      });
    }
  }

  async function getCashTotalBase24Batch(req, res) {
    let token = req.headers.token;
    if (token != process.env.API_KEY) {
      console.error("error error");
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    } else {
      req.setTimeout(0);
      let date = req.query.date
        ? format(
            addYears(new Date(req.query.date), 543),
            process.env.BASE24_FILE_DATE_FORMAT
          )
        : format(
            addYears(new Date(), 543),
            process.env.BASE24_FILE_DATE_FORMAT
          );
      let date2 = format(
        req.query.date ? new Date(req.query.date) : new Date(),
        "yyyy-MM-dd"
      );
      let fileName =
        process.env.BASE24_FILE_NAME +
        `${date}.${process.env.BASE24_FILE_TYPE}`;
      let filePath = process.env.FTP_BASE24_PATH;

      getFtpFile(filePath, fileName, async (ftp) => {
        let data = ftp.toString().split("\n");

        let b24Result = [];
        for (let index = 0; index < data.length; index++) {
          const element = data[index];

          if (element != "") {
            let dataPipe = element.split(",");
            b24Result.push([date2].concat(fileName, dataPipe));
          }
        }

        if (b24Result.length > 0) {
          const result = await ftpRepo.b24Import(b24Result);

          if (result.status === "success") {
            return res.status(200).json(result);
          } else {
            console.error("Error import b24 data " + result);
            return res
              .status(200)
              .json(
                helperService.responseResult(
                  "error",
                  "นำเข้าข้อมูล Base24 ไม่สำเร็จ",
                  0,
                  []
                )
              );
          }
        } else {
          console.log("data from b24 file is empty");
          return res
            .status(200)
            .json(
              helperService.responseResult(
                "error",
                "data from b24 file is empty",
                0,
                []
              )
            );
        }
      });
    }
  }

  async function postCashTotalFISBatch(req, res) {}

  async function moveCashReqToCashConf(req, res) {
    let token = req.headers.token;
    if (token != process.env.API_KEY) {
      console.error("error unauthorization");
      return res.status(401).json({
        code: 401,
        status: false,
        massage: "unauthorization",
      });
    } else {
      req.setTimeout(0);
      let dateNow = format(
        req.query.date ? new Date(req.query.date) : new Date(),
        "yyyyMMdd"
      );
      let params = {
        statusId: 3,
        recSendDate: dateNow,
      };

      const result = await cashConfRepo.batchCashConfirm(params);
      if (result.status === "success") {
        let checkSuccess = 0;
        const yyMM = format(addYears(new Date(), 543), "yyMM");
        for (var obj of result.data) {
          const unitCode = await helperService.convertIdTo4Code(obj.unitId);
          let paramsCheck = {
            unitId: obj.unitId,
            dateDoc: yyMM + "-" + unitCode,
          };

          let lastNo = await cashConfirmRepo.getLastRunningNo(paramsCheck);
          let autoNo =
            lastNo.data <= 0
              ? 1
              : parseInt(lastNo.data.substring(lastNo.data.length - 3)) + 1;
          let genNo = await helperService.convertIdTo3Code(autoNo);

          let paramsSave = {
            documentNo: yyMM + "-" + unitCode + "-" + genNo,
            unitId: obj.unitId,
          };
          let result = await cashConfirmRepo.saveLogDocumentNo(paramsSave);

          if (result.status === "success") {
            let paramsCreateCashConf = {
              documentNo: yyMM + "-" + unitCode + "-" + genNo,
              unitId: obj.unitId,
              unitTypeId: obj.unitTypeId,
              cashReqIdH: obj.cashReqIdH,
              statusId: 5,
              createBy: "SYSTEM",
            };

            let resutlCreateCashConf = await cashConfRepo.createCashConfirm(
              paramsCreateCashConf
            );
            if (resutlCreateCashConf.status === "success") {
              checkSuccess += 1;
            } else {
              console.error(
                "Error create cash confirm :",
                resutlCreateCashConf
              );
            }
          } else {
            console.error(
              "Error generate document no for cash confirm " + result.message
            );
          }
        }

        if (checkSuccess > 0) {
          return res
            .status(200)
            .json(
              helperService.responseResult(
                "sucees",
                "สร้างเอกสารยืนยันการรับส่งเงินสำเร็จ",
                checkSuccess,
                checkSuccess
              )
            );
        } else {
          return res
            .status(200)
            .json(
              helperService.responseResult(
                "error",
                "ไม่สามารถสร้างเอกสารยืนยันการรับส่งเงินได้",
                0,
                []
              )
            );
        }
      } else {
        console.error(
          "Error get cash request for move to waiting confirm " + result
        );
        return res
          .status(200)
          .json(
            helperService.responseResult(
              "error",
              "ดึงข้อมูลรายการแจ้งความต้องการไม่สำเร็จ",
              0,
              []
            )
          );
      }
    }
  }

  async function deleteFileEventExpire(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }
    req.setTimeout(0);
    const result = await masterRepo.getEventExpire();
    if (result.status === "success") {
      let successRow = 0;
      for (var obj of result.data) {
        if (obj.filePath) {
          const headers = {
            "Content-Type": "application/json",
            token: req.headers.token,
          };
          axios
            .post(
              "http://localhost/cash-api/file/delete",
              { filePath: obj.filePath },
              { headers: headers }
            )
            .then((result) => {
              if (result.status === "success") {
                successRow += 1;
              }
            });
        }
      }
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "success",
            "ลบไฟล์รูปภาพประชาสัมพันธ์ที่เกินเวลาที่กำหนดสำเร็จ"
          ),
          successRow,
          {}
        );
    } else {
      console.error("Error get event expire " + result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ดึงข้อมูลประชาสัมพันธ์ที่เกินเวลาที่กำหนดไม่สำเร็จ",
            0,
            []
          )
        );
    }
  }

  return {
    getCashTotalCbsBatch,
    getCashTotalBase24Batch,
    postCashTotalFISBatch,
    moveCashReqToCashConf,
    deleteFileEventExpire,
  };
}

module.exports = BatchService;
