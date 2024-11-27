const _webServiceController = require('./webService.controller');

module.exports = function (router) {
    const webServiceController = _webServiceController();


    router.route('/cbs/cif/:cid')
        .get(webServiceController.getCif);


    router.route('/warninglist/watchList/:cid/')
        .get(webServiceController.watchList);


    router.route('/warninglist/blackList/:cid/')
        .get(webServiceController.blackList);


    router.route('/warninglist/fraudList/:cid/')
        .get(webServiceController.fraudList);      

    
    router.route('/whiteList/whiteList/:cid')
        .get(webServiceController.whiteList);


}