const fs = require("fs");
const multer = require("multer");
const ba64 = require("ba64");
const dotenv = require("dotenv");
dotenv.config();
const helperService = require("./helper.service");

module.exports = {
  downloadFile,
  downloadFilePdf,
  deleteFile,
  uploadFileBase64,
  uploadFile,
};

function downloadFile(res, filePath, fileName) {
  fs.readFile(filePath, function (err, data) {
    if (err) throw err; // Fail if the file can't be read.
    else {
      res.writeHead(200, {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment;filename=${encodeURIComponent(
          fileName
        )}`,
      });

      res.end(data); // Send the file data to the browser.
    }
  });
}

function downloadFilePdf(res, filePath, fileName) {
  fs.readFile(filePath, function (err, data) {
    if (err) throw err; // Fail if the file can't be read.
    else {
      res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment;filename=${encodeURIComponent(
          fileName
        )}`,
      });

      res.end(data); // Send the file data to the browser.
    }
  });
}

function deleteFile(filePath) {
  fs.unlink(filePath, function (err) {
    if (err && err.code == "ENOENT") {
      // file doens't exist
      console.log(err, "File doesn't exist, won't remove it.");
    } else if (err) {
      // other errors, e.g. maybe we don't have enough permission
      console.log(err, "Error occurred while trying to remove file");
    } else {
      console.log(filePath, "unlink");
    }
  });
}

function uploadFileBase64(req, res) {
  let filePath = req.body.filePath;
  let base64 = req.body.base64;

  if (base64 == undefined || base64 == "" || base64 == null) {
    return res
      .status(200)
      .json(helperService.responseResult("error", "ไม่พบไฟล์", 0, {}));
  } else {
    let mimeType = base64.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0];
    let mimeType2 = base64.match(/[^:/]\w+(?=;|,)/)[0];
    let fileName = req.body.fileName;

    if (fileName == undefined || fileName == "" || fileName == null) {
      fileName = "file-" + Date.now();
    }

    ba64.writeImage(
      `${process.env.BASE_FILE_PATH}/${filePath}/${fileName}`,
      base64,
      function (err) {
        if (err) {
          console.error(err);
          return res
            .status(200)
            .json(helperService.responseResult("error", err, 0, {}));
        } else {
          let file = {
            fieldname: "base64",
            originalname: "-",
            encoding: "utf8",
            mimetype: `${mimeType}`,
            destination: `${process.env.BASE_FILE_PATH}/${filePath}`,
            filename: `${fileName}.${mimeType2}`,
            path: `${process.env.BASE_FILE_PATH}/${filePath}/${fileName}.${mimeType2}`,
          };
          return res
            .status(200)
            .json(
              helperService.responseResult(
                "success",
                "อัปโหลดสำเร็จ",
                base64.length,
                file
              )
            );
        }
      }
    );
  }
}

function uploadFile(req, res) {
  let filePath = req.params.filePath;
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `${process.env.BASE_FILE_PATH}/${filePath}`);
    },
    filename: (req, file, cb) => {
      cb(
        null,
        "file-" +
          Date.now() +
          "." +
          file.originalname.split(".")[file.originalname.split(".").length - 1]
      );
    },
  });
  const upload = multer({ storage: storage });

  upload.single("file")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.error("MulterError " + err);
      return res
        .status(200)
        .json(
          helperService.responseResult("error", "MulterError " + err, 0, {})
        );
    } else if (err) {
      // An unknown error occurred when uploading.
      console.error(err);
      return res
        .status(200)
        .json(helperService.responseResult("error", err, 0, {}));
    }

    let file = req.file;
    if (file == undefined) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ไม่พบไฟล์", 0, {}));
    } else {
      return res
        .status(200)
        .json(
          helperService.responseResult("success", "อัปโหลดสำเร็จ", 0, file)
        );
    }
  });
}
