const _registerRespository = require('./register.respository');
module.exports = function (router) {
    const registerRespository = _registerRespository();

    router.route('/register/checkData/:idcard')
    .get(registerRespository.getData);

    router.route('/register/getALLDtiLessZero')
    .get(registerRespository.getALLDtiLessZero);

    router.route('/register/getDtiLessZero/:idcard')
    .get(registerRespository.getDtiLessZero);

    router.route('/register/checkALlBranchCodeNull')
    .get(registerRespository.checkALlBranchCodeNull);

    router.route('/register/checkBranchCodeNull/:idcard')
    .get(registerRespository.checkBranchCodeNull);

    router.route('/register/checkAllObjCode')
    .get(registerRespository.checkAllObjCode);

    router.route('/register/checkObjCode/:idcard')
    .get(registerRespository.checkObjCode);

    router.route('/register/checkExportMymo/:idcard')
    .get(registerRespository.checkExportMymo);

    router.route('/register/checkDataNull1516')
    .get(registerRespository.checkDataNull1516);

    router.route('/register/updateDataNull1516')
    .post(registerRespository.updateDataNull1516);

    router.route('/register/updateBranchCodeNull')
    .post(registerRespository.updateBranchCodeNull);

    router.route('/register/updateObj01')
    .post(registerRespository.updateObj01);
    
    router.route('/register/updateObj02')
    .post(registerRespository.updateObj02);


}