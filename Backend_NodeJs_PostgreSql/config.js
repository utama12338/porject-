
//UAT
const WHITELIST_URL='http://10.22.51.201:81/CheckCOIStatus/CheckCOIstatus.asmx?WSDL';
const WRN_WATCHLIST_URL = 'https://10.22.51.176:443/warninglist_webservices/api/WatchList';
const WRN_FRAUDLIST_URL = 'https://10.22.51.176:443/warninglist_webservices/api/FraudList';
const WRN_BACKLIST_URL = 'https://10.22.51.176:443/warninglist_webservices/api/BlackList';
const DEPOSIT_URL='http://10.82.88.50:8080/GSBAPIWebService/GetPersonDepositByCitizenId';
const PERSON_URL='http://10.82.88.50:8080/GSBAPIWebService/GetPerson';
const CHANNEL='89ac32a6e23f1b998e22164695348d5c'
const AUTH_KEY = 'Basic RHVra2llX0FQSTpQQHNzdzByZA==';

//PROD
//const WHITELIST_URL='http://10.50.17.17:81/CheckCOIStatus/CheckCOIStatus.asmx?WSDL';
//const WRN_WATCHLIST_URL = 'https://wrnlweb.gsb.or.th/warninglist_webservices/api/WatchList';
//const WRN_FRAUDLIST_URL = 'https://wrnlweb.gsb.or.th/warninglist_webservices/api/FraudList';
//const WRN_BACKLIST_URL = 'https://wrnlweb.gsb.or.th/warninglist_webservices/api/BlackList';
//const DEPOSIT_URL='http://cbsws.gsb.or.th:8080/GSBAPIWebService/GetPersonDepositByCitizenId';
//const PERSON_URL='http://cbsws.gsb.or.th:8080/GSBAPIWebService/GetPerson';
//const CHANNEL='89ac32a6e23f1b998e22164695348d5c'
//const AUTH_KEY = 'Basic QXBpX0NBSU46QXBpX0NBSU4==';

module.exports = {

    WHITELIST_URL,
    WRN_WATCHLIST_URL,
    WRN_FRAUDLIST_URL,
    WRN_BACKLIST_URL,
    DEPOSIT_URL,
    PERSON_URL,
    CHANNEL,
    AUTH_KEY

};
