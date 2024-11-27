var connect = require('../database/connect');
const sql = require('mssql');

function WebappRespository(){
    function searchCus (req,res){
        let idcard = req.params.idcard;
        
        if (idcard == null || idcard == undefined || idcard == ''){
            return res.status(200).json({
                status: false,
                message: 'กรุณาระบุเลขบัตรประชาชน',
                d: ''
            });
        }else{
            sql.connect(connect.myconfig, function (err) {
        
                if (err) {
                    return res.status(200).json({
                        status: false,
                        message: 'Error',
                        d: err
                    });
    
                }else{
                    // create Request object
                    var request = new sql.Request();
                    request.input('cus_id', sql.VarChar, idcard)
                    var cmd = request.template`select top 1 ROW_NUMBER() over(order by register_date) as row_number, 
                                id,      
                                case when  register_date is null      
                                then 'ไม่พบข้อมูล'      
                                else right(isnull(register_date,''),2)+'/'+SUBSTRING(isnull(register_date,''),5,2)+'/'+LEFT(isnull(register_date,''),4) end as register_date , 
                                ISNULL(cus_id,'ไม่พบข้อมูล') cus_id, 
                                ISNULL(cus_cif,'ไม่พบข้อมูล') cus_cif, 
                                ISNULL(cus_title,'ไม่พบข้อมูล') cus_title, 
                                ISNULL(cus_firstname,'ไม่พบข้อมูล') cus_firstname, 
                                ISNULL(cus_lastname,'ไม่พบข้อมูล') cus_lastname, 
                                ISNULL(cus_title,'ไม่พบข้อมูล')+ISNULL(cus_firstname,'ไม่พบข้อมูล')+' '+ISNULL(cus_lastname,'ไม่พบข้อมูล') as fullname, 
                                ISNULL(cus_tel,'ไม่พบข้อมูล') cus_tel, 
                                ISNULL(cus_email,'ไม่พบข้อมูล') cus_email, 
                                ISNULL(festival_name,'ไม่พบข้อมูล') festival_name, 
                                ISNULL(product_name,'ไม่พบข้อมูล') product_name, 
                                ISNULL(branch_name,'ไม่พบข้อมูล') branch_name, 
                                case when  date_contract_branch is null      
                                then 'ไม่พบข้อมูล'      
                                else right(isnull(date_contract_branch,''),2)+'/'+SUBSTRING(isnull(date_contract_branch,''),5,2)+'/'+LEFT(isnull(date_contract_branch,''),4) end as date_contract_branch , 
                                ISNULL(status_name,'ไม่พบข้อมูล') status_name, 
                                case when approve_date is null or approve_date = '' 
                                then 
                                case when  save_date is null      
                                then 'ไม่พบข้อมูล'  
                                else right(isnull(save_date,''),2)+'/'+SUBSTRING(isnull(save_date,''),5,2)+'/'+LEFT(isnull(save_date,''),4) end 
                                else  
                                case when  approve_date is null  
                                then 'ไม่พบข้อมูล'     
                                else right(isnull(approve_date,''),2)+'/'+SUBSTRING(isnull(approve_date,''),5,2)+'/'+LEFT(isnull(approve_date,''),4) end end as save_date,   
                                enquiry_date_ncb = isnull((select top 1    
                                    Case when  enquiry_date Is null   
                                    then 'ไม่พบข้อมูล'    
                                    Else right(isnull(enquiry_date,''),2)+'/'+SUBSTRING(isnull(enquiry_date,''),5,2)+'/'+LEFT(isnull(enquiry_date,''),4) end as enquiry_date1 
                                    From TBLCcps Where ID_NUMBER = a.cus_id Order By enquiry_date desc),'ไม่พบข้อมูล'), 
                                ccps_data_date = isnull((select top 1    
                                    Case when  NCB_DATA_DATE Is null   
                                    then 'ไม่พบข้อมูล'    
                                    Else right(isnull(NCB_DATA_DATE,''),2)+'/'+SUBSTRING(isnull(NCB_DATA_DATE,''),5,2)+'/'+LEFT(isnull(NCB_DATA_DATE,''),4) end as NCB_DATA_DATE1 
                                    From TBLCcps Where ID_NUMBER = a.cus_id Order By NCB_DATA_DATE desc),'ไม่พบข้อมูล') 
                                from TBLCustomerLoanRegister a 
                                left join mas_branch b on a.cost_center = b.cost_center 
                                left join mas_status c on a.status_code = c.status_code 
                            where 1=1 and cus_id = @cus_id
                            order by 
                                case when a.status_code = '09' then 1 
                                when a.status_code = '10' then 2 
                                when a.status_code = '16' then 3 
                                when a.status_code = '15' then 4 
                                when a.status_code = '14' then 5 
                                when a.status_code = '00' then 6 
                                when a.status_code = '11' then 7 
                                when a.status_code = '12' then 8 
                                when a.status_code = '13' then 9 
                                when a.status_code = '01' then 10  else 11 end asc, id desc `;
                    // query to the database and get the records
                    request.query(cmd,function (err, result) {
                        
                        if (err) {
                            return res.status(200).json({
                                status: false,
                                message: 'Error',
                                d: err
                            });
                        
                        }else{
                            return res.status(200).json({
                                status: true,
                                message: 'OK',
                                d: result.recordsets
                            });
                        }
    
                        
                    });
                }
    
    
            });           
        }
        

    }

    return {
        searchCus: searchCus
    }
}

module.exports = WebappRespository;