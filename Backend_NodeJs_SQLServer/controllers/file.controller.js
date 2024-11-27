const _fileService = require("../services/file.service");

module.exports = function (router){
    const fileService = _fileService();

    router.route("/file/uploadBase64").post(fileService.uploadBase64);

    router.route("/file/upload/:filePath").post(fileService.upload);

    router.route("/file/delete").post(fileService.deleteFile);
}