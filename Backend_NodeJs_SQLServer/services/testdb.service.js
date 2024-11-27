const testdb = require('../repositorys/testdb.repository');


function TestDbService() {
    function testConnect(req,res){
        testdb.getTestConnect().then(result => {
            console.log(result);
            res.json(result);
        }).catch(error => {
            res.json(error);
        });
    }

    return {
        testConnect : testConnect
    }
}


module.exports = TestDbService;