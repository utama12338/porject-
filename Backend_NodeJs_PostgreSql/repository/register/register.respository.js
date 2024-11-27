var connect = require('../database/connect');
const sql = require('mssql');

function RegisterRespository() {

    function getData(req, res){
        let idcard = req.params.idcard;
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
                request.input('cus_id', sql.VarChar, idcard)
                var cmd = request.template`select * from TBLCustomerLoanRegister where cus_id = @cus_id order by status_code desc`;
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

    function getALLDtiLessZero(req,res){
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
                var cmd = request.template`select id,cus_id,status_code,dti from TBLCustomerLoanRegister where dti < 0`;
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

    function getDtiLessZero(req,res){
        let idcard = req.params.idcard;
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
                request.input('cus_id', sql.VarChar, idcard)
                var cmd = request.template`select id,cus_id,status_code,dti  from TBLCustomerLoanRegister where dti < 0 and cus_id = @cus_id`;
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

    function checkALlBranchCodeNull (req,res){
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
                var cmd = request.template`select id,cus_id,status_code,branch_code,cost_center from TBLCustomerLoanRegister where branch_code = '' or branch_code is null`;
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
 
    function checkBranchCodeNull (req,res){
        let idcard = req.params.idcard;
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
               request.input('cus_id', sql.VarChar, idcard)
               var cmd = request.template`select id,cus_id,status_code,branch_code,cost_center from TBLCustomerLoanRegister where (branch_code = '' or branch_code is null) and cus_id = @cus_id`;
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

   function checkAllObjCode(req,res){
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
                var cmd = request.template`select id,cus_id,status_code,obj_code from TBLCustomerLoanRegister where obj_code not in ('01','02')`;
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

   function checkObjCode(req,res){
        let idcard = req.params.idcard;
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
               request.input('cus_id', sql.VarChar, idcard)
               var cmd = request.template`select id,cus_id,status_code,obj_code from TBLCustomerLoanRegister where obj_code not in ('01','02') and cus_id = @cus_id`;
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

      function checkObjCode(req,res){
        let idcard = req.params.idcard;
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
               request.input('cus_id', sql.VarChar, idcard)
               var cmd = request.template`select id,cus_id,status_code,obj_code from TBLCustomerLoanRegister where obj_code not in ('01','02') and cus_id = @cus_id`;
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

    function checkExportMymo(req,res){
        let idcard = req.params.idcard;
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
               request.input('cus_id', sql.VarChar, idcard)
               var cmd = request.template`select id,cus_id,status_code,is_export_mymo,export_mymo_date,export_mymo_time,approve_date,approve_time from TBLCustomerLoanRegister where cus_id = @cus_id`;
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

    function checkDataNull1516(req,res){
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
               var cmd = request.template`select id,cus_id,status_code from TBLCustomerLoanRegister where cus_birthday is null and status_code in ('15','16')`;
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
    
    function updateDataNull1516 (req,res){
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
                var cmd = request.template`update TBLCustomerLoanRegister 
                    set status_code = '00',
                    is_white_list = null, is_warning_list = null, is_emp_gsb = null,
                    is_ccps = null, ccps_check_date = null, ccps_data_date = null,
                    ccps_credit_bureau_score = null, ccps_overdue_in_current_month = null, 
                    ccps_status = null, ccps_status_desc = null, ccps_debt_amt = null, dti = null,approve_credit_limit = null,
                    is_black_list = null, is_th_list = null, is_nega_file = null, is_emp_gsb_1 = null, is_out_cbs = null
                    where cus_birthday is null 
                    and status_code in ('15','16')`;
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
                            detail: 'Updated !!'
                        });
                    }
    
                        
                });
            }
    
    
        }); 
    }
    function updateBranchCodeNull (req,res){
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
                var cmd = request.template`UPDATE reg
                    SET 
                    reg.branch_code = b.branch_code
                    FROM TBLCustomerLoanRegister reg
                    INNER JOIN
                    mas_branch b
                    ON reg.cost_center = b.cost_center 
                    and (reg.branch_code = '' or reg.branch_code is null)
                    and reg.cost_center is not null`;
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
                            detail: 'Updated !!'
                        });
                    }
    
                        
                });
            }
    
    
        }); 
    }

    function updateObj01(req,res){
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
                var cmd = request.template`update TBLCustomerLoanRegister 
                    set obj_code = '01'
                    where obj_code not in ('01','02')
                    and obj_isic_code_1 is null
                    and obj_isic_code_2 is null
                    and obj_isic_code_3 is null`;
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
                            detail: 'Updated !!'
                        });
                    }
    
                        
                });
            }
    
    
        });      
    }

    function updateObj02(req,res){
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
                var cmd = request.template`update TBLCustomerLoanRegister 
                    set obj_code = '02'
                    where obj_code not in ('01','02')
                    and obj_isic_code_1 is not null
                    and obj_isic_code_2 is not null
                    and obj_isic_code_3 is not null`;
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
                            detail: 'Updated !!'
                        });
                    }
    
                        
                });
            }
    
 
        });      
    }    

    return {
        getData,
        getALLDtiLessZero,
        getDtiLessZero,
        checkALlBranchCodeNull,
        checkBranchCodeNull,
        checkAllObjCode,
        checkObjCode,
        checkExportMymo,
        checkDataNull1516,
        updateDataNull1516,
        updateBranchCodeNull,
        updateObj01,
        updateObj02
      
    }
}

module.exports = RegisterRespository;