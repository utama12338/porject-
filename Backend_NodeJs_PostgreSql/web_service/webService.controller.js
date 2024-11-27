const constant = require('../config');
const axios = require('axios');
const soapRequest = require('easy-soap-request');
var xml2js = require('xml2js');


function WebServiceController() {

    function getCif(req, res) {
        let cid = req.params.cid
        let url;
        let channel;

        if (cid == null) {
            return res.status(200).json({
                status_flag: false,
                status_message: 'ข้อมูลไม่ถูกต้อง'

            });
        } else {
            url= constant.DEPOSIT_URL;
            channel= constant.CHANNEL;

            const depUrl = url + `?channel=${channel}&citizenId=${cid}`

            axios.get(depUrl)
            .then(result => {
                let data= result.data
                if(data.responseCode=='0'){
                    return res.status(200).json({
                        status_flag: true,
                        status_message: 'OK',
                        person:data.person
                       
                    });
                }else{
                    return res.status(200).json({
                        status_flag: false,
                        status_message: data.responseDesc,
                        person:{}
                    });
                }
            })
            .catch(error => {
                return res.status(200).json({
                    status_flag: false,
                    status_message: error,
                });
            })    
        }
    }

    function watchList(req,res){
        let cid = req.params.cid;
        let taxid = req.params.cid;
        if (cid == null || taxid == null ) {
            return res.status(200).json({
                status_flag: false,
                status_message: 'ข้อมูลไม่ถูกต้อง'

            });
        } else {
      
            const headers = {
                'Authorization': constant.AUTH_KEY,
                'Content-Type': 'application/json;charset=UTF-8'

            }
            const reqdata = {
                ID: cid,
                TAX_ID: ""
            };

            axios.post(constant.WRN_WATCHLIST_URL, reqdata,{headers})
            .then(result => {
                let data = result.data;
                if(data != null){
                    return res.status(200).json({
                        status_flag: true,
                        status_message: 'OK',
                        rsBody: data,

                       
                    });
                }else{
                    return res.status(200).json({
                        status_flag: false,
                        status_message: 'ERROR',
                        rsBody:{}
                    });
                }
            })
            .catch(error => {
                return res.status(200).json({
                    status_flag: false,
                    status_message: error,
                });
            })              
        } 
    }

    function blackList(req,res){
        let cid = req.params.cid;
        if (cid == null) {
            return res.status(200).json({
                status_flag: false,
                status_message: 'ข้อมูลไม่ถูกต้อง'

            });
        } else {

            const headers = {
                'Authorization': constant.AUTH_KEY,
                'Content-Type': 'application/json;charset=UTF-8'

            }

            const reqdata = {
                ID: cid,
                CustType: '1'
            };

            axios.post(constant.WRN_BACKLIST_URL, reqdata,{headers})
            .then(result => {
                let data = result.data;
                if(data != null){
                    return res.status(200).json({
                        status_flag: true,
                        status_message: 'OK',
                        rsBody: data,

                       
                    });
                }else{
                    return res.status(200).json({
                        status_flag: false,
                        status_message: 'ERROR',
                        rsBody:{}
                    });
                }
            })
            .catch(error => {
                return res.status(200).json({
                    status_flag: false,
                    status_message: error,
                });
            })              
        }
    }

    function fraudList(req,res){
        let cid = req.params.cid;
        if (cid == null) {
            return res.status(200).json({
                status_flag: false,
                status_message: 'ข้อมูลไม่ถูกต้อง'

            });
        } else {
            const headers = {
                'Authorization': constant.AUTH_KEY,
                'Content-Type': 'application/json;charset=UTF-8'

            }

            const reqdata = {
                key_search: cid
            };

            axios.post(constant.WRN_FRAUDLIST_URL, reqdata,{headers})
            .then(result => {
                let data = result.data;
                if(data != null){
                    return res.status(200).json({
                        status_flag: true,
                        status_message: 'OK',
                        rsBody: data,

                       
                    });
                }else{
                    return res.status(200).json({
                        status_flag: false,
                        status_message: 'ERROR',
                        rsBody:{}
                    });
                }
            })
            .catch(error => {
                return res.status(200).json({
                    status_flag: false,
                    status_message: error,
                });
            })              
        }      
    }

    function whiteList(req, res) {
        let cid = req.params.cid;
        if (cid == null) {
            return res.status(200).json({
                status_flag: false,
                status_message: 'ข้อมูลไม่ถูกต้อง'

            });
        } else {
            var date = new Date().toLocaleDateString();
            var time = new Date().toLocaleTimeString();
          
            var templates = {
                    xmlList: '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><CheckCOIStatus xmlns="http://www.gsb.or.th/CheckCOIStatus"><CheckCOIStatusRq><RqHeader><AppId>[AppId]</AppId><TranDate>[TranDate]</TranDate><TranTime>[TranTime]</TranTime></RqHeader><ListNID><ListNIDType><NID>[NID]</NID><CustType>[CustType]</CustType></ListNIDType></ListNID></CheckCOIStatusRq></CheckCOIStatus></soap:Body></soap:Envelope>'
            };
            var message = templates.xmlList;
            message = message.replace("[AppId]", "SPGV-CAIN");
            message = message.replace("[TranDate]", date);
            message = message.replace("[TranTime]", time);
            message = message.replace("[NID]", cid);
            message = message.replace("[CustType]", "1");

            const sampleHeaders = {
                'Content-Type': 'text/xml; charset=utf-8'

            };

            (async () => { 
                const { response } = await soapRequest({ url: constant.WHITELIST_URL, headers: sampleHeaders, xml: message, timeout: 1000 }); // Optional timeout parameter(milliseconds)
                const { headers, body, statusCode } = response;
                               
                if(body != null){
                    var parser = new xml2js.Parser({ ignoreAttrs: false, mergeAttrs: true });
                    parser.parseString(body, function (err, result) {
                        if (result != null) {
                            var resultBody = result['soap:Envelope']['soap:Body'][0];
                            var resultResponse = resultBody['CheckCOIStatusResponse'][0];
                            var resultDetail = resultResponse['CheckCOIStatusResult'][0];
                            var resultCheckStatus = resultDetail['ListCheckCOIStatus'][0];
                            var resultCheckStatusDeatil = resultCheckStatus['ListCheckCOIStatusType'][0];
    
                            return res.status(200).json({
                                status: true,
                                message: 'OK',
                                statusCode: statusCode,
                                rsBody: resultCheckStatusDeatil
                            });   
                        }else{
                            return res.status(200).json({
                                status: false,
                                message: 'ไม่พบข้อมูล',
                                statusCode: statusCode,
                                rsBody: result
                            });                        
                        }

                    });
       
                                          
                }else{
                    return res.status(200).json({
                        status: false,
                        message: 'ไม่พบข้อมูล',
                        statusCode: statusCode,
                        rsBody: body
                    });
                }   
            }) ();

        }
    }
    return {
        getCif,
        watchList,
        blackList,
        fraudList,
        whiteList
    }
}

module.exports = WebServiceController;
