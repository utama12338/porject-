const _webappRespository = require('./webapp.respository');
module.exports = function (router) {
    const webappRespository = _webappRespository();

    router.route('/webApp/searchCus/:idcard')
    .get(webappRespository.searchCus);
}