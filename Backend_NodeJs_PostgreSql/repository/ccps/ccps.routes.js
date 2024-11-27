const _ccpsRespository = require('./ccps.respository');
module.exports = function (router) {
    const ccpsRespository = _ccpsRespository();

    router.route('/ccps/checkAll')
    .get(ccpsRespository.getAll);

    router.route('/ccps/checkByDateTxt/:datetxt')
    .get(ccpsRespository.getByDateTxt);

}