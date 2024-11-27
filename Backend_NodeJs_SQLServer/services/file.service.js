const helperService = require("./helper.service");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const { uploadFileBase64, uploadFile } = require("./file.manager.service");

function FileService() {
  async function uploadBase64(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    let filePath = req.body.filePath;
    fs.access(`${process.env.BASE_FILE_PATH}/${filePath}`, (error) => {
      if (!error) {
        // The check succeeded
        uploadFileBase64(req, res);
      } else {
        // The check failed
        fs.mkdir(
          `${process.env.BASE_FILE_PATH}/${filePath}`,
          { recursive: true },
          (e) => {
            if (e) {
              return res
                .status(200)
                .json(helperService.responseResult("error", e, 0, {}));
            } else {
              uploadFileBase64(req, res);
            }
          }
        );
      }
    });
  }

  async function upload(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    let filePath = req.params.filePath;

    fs.access(`${process.env.BASE_FILE_PATH}/${filePath}`, (error) => {
      if (!error) {
        // The check succeeded
        uploadFile(req, res);
      } else {
        // The check failed
        fs.mkdir(
          `${process.env.BASE_FILE_PATH}/${filePath}`,
          { recursive: true },
          (e) => {
            if (e) {
              return res
                .status(200)
                .json(helperService.responseResult("error", e, 0, {}));
            } else {
              uploadFile(req, res);
            }
          }
        );
      }
    });
  }

  async function deleteFile(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    let filePath = req.body.filePath;
    fs.rmdir(`${process.env.BASE_FILE_PATH}/${filePath}`, function (err) {
      if (err && err.code == "ENOENT") {
        // file doens't exist
        return res
          .status(200)
          .json(
            helperService.responseResult(
              "error",
              "File doesn't exist, won't remove it.",
              0,
              {}
            )
          );
      } else if (err) {
        // other errors, e.g. maybe we don't have enough permission
        return res
          .status(200)
          .json(
            helperService.responseResult(
              "error",
              "Error occurred while trying to remove file",
              0,
              {}
            )
          );
      } else {
        return res
          .status(200)
          .json(helperService.responseResult("success", "ลบสำเร็จ", 0, {}));
      }
    });
  }

  return {
    upload,
    uploadBase64,
    deleteFile,
  };
}

module.exports = FileService;
