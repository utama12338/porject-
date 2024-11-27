var connect = require('../database/connect');
const sql = require('mssql');

function CcpsRepository() {

        function getAll(req, res){
            // connect to your database
            sql.connect(connect.myconfig, function (err) {
                if (err) {
                    return res.status(200).json({
                        status: false,
                        message: 'Error',
                        detail: err
                    });

                }else{
                    // create Request object
                    var request = new sql.Request();
                    var cmd = 'select * from TBLCcps order by NCB_DATA_DATE asc';
                    // query to the database and get the records
                    request.query(cmd,function (err, result) {
                        
                        if (err) {
                            return res.status(200).json({
                                status: false,
                                message: 'Error',
                                detail: err
                            });
                        
                        }else{
                            return res.status(200).json({
                                status: true,
                                message: 'OK',
                                detail: result.recordsets
                            });
                        }

                        
                    });
                }


            });
        }

        function getByDateTxt(req, res){
            let datetxt = req.params.datetxt;
            // connect to your database
            sql.connect(connect.myconfig, function (err) {
            
                if (err) {
                    return res.status(200).json({
                        status: false,
                        message: 'Error',
                        detail: err
                    });

                }else{
                    // create Request object
                    var request = new sql.Request();
                    request.input('NCB_DATA_DATE', sql.VarChar, datetxt)
                    var cmd = request.template`select * from TBLCcps where NCB_DATA_DATE = @NCB_DATA_DATE order by NCB_DATA_DATE asc`;
                    // query to the database and get the records
                    request.query(cmd,function (err, result) {
                        
                        if (err) {
                            return res.status(200).json({
                                status: false,
                                message: 'Error',
                                detail: err
                            });
                        
                        }else{
                            return res.status(200).json({
                                status: true,
                                message: 'OK',
                                detail: result.recordsets
                            });
                        }

                        
                    });
                }


            });
        }

        return {
            getAll,
            getByDateTxt
          
        }

}
module.exports = CcpsRepository;