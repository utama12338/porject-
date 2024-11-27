import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import {
    Input,
    Textarea,
    Button,
    Typography,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import MenuItem from '@mui/material/MenuItem';
import CustomSelect from "@/widgets/select/CustomSelect";
import {
    dateData,
    monthData,
    yearContractData,
} from "@/data";
import {
    validNumber,
    validLength,
    calculateAge,
    monthTh,
    yearTh,
    validDate,
    encryptWithKey,
    decryptWithKey
} from "@/utils";
import { DialogCustom } from "@/widgets/dialog";
import { SpinnerCustom } from "@/widgets/spinner";
import {
    accessToken,
    addRegister,
    getBranch,
    getDistrict,
    getSubDistrict,
    getProvince,
    getResidentialStatus,
    getResidentialType,
    checkWarningListNew,
    generateAppNo,
    checkGsbEmployee,
    getProvinceForBranch,
    getDistrictForBranch,
    checkDuplicateRegister,
} from "@/services";

export function RegisterAddrInfo() {
    React.useEffect(() => {
        loadBranch("", "");
        loadDistrict("");
        loadDistrictBranch("");
        loadProvince();
        loadProvinceBranch();
        loadResStatus();
        loadResType();
        loadSubDistrict("");
        getWarningList(props.citizenId);
        getGsbEmployee(props.citizenId);
        generateApplicationNo();
        getDuplicateRegister(props.citizenId, props.productLoan.substring(11, props.productLoan.length));
    }, [])


    const navigate = useNavigate();
    const location = useLocation();
    const props = location.state;

    const [loading, setLoading] = React.useState(false);
    const [isOpenConfirm, setIsOpenConfirm] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const [messageHeader, setMessageHeader] = React.useState("");
    const [message, setMessage] = React.useState("");

    const [appNo, setAppNo] = React.useState("");
    const [resStatusData, setResStatusData] = React.useState([]);
    const [resTypeData, setResTypeData] = React.useState([]);
    const [provinceData, setProvinceData] = React.useState([]);
    const [provinceBranchData, setProvinceBranchData] = React.useState([]);
    const [districtData, setDistrictData] = React.useState([]);
    const [districtBranchData, setDistrictBranchData] = React.useState([]);
    const [subDistrictData, setSubDistrictData] = React.useState([]);
    const [branchData, setBranchData] = React.useState([]);

    const [addrCust, setAddrsCust] = React.useState("");
    const [provAddrCust, setProvAddrCust] = React.useState("-");
    const [distAddrCust, setDistAddrCust] = React.useState("-");
    const [subDistAddrCust, setSubDistAddrCust] = React.useState("-");
    const [postCodeAddrCust, setPostCodeAddrCust] = React.useState("");
    const [residentialTypeCust, setResidentialTypeCust] = React.useState("-");
    const [periodResYearCust, setPeriodResYearCust] = React.useState(0);
    const [periodResMonthCust, setPeriodResMonthCust] = React.useState(0);
    const [residentialStatusCust, setResidentialStatusCust] = React.useState("-");
    const [provContractCust, setProvContractCust] = React.useState("-");
    const [distContractCust, setDistContractCust] = React.useState("-");
    const [brchContractCust, setBrchContractCust] = React.useState("-");
    const [brchContractCustName, setBrchContractCustName] = React.useState("-");
    const [contractDayBranch, setContractDayBranch] = React.useState("-");
    const [contractMonthBranch, setContractMonthBranch] = React.useState("-");
    const [contractYearBranch, setContractYearBranch] = React.useState("-");
    const [blackListFlag, setBlackListFlag] = React.useState("");
    const [whiteListFlag, setWhiteListFlag] = React.useState("");
    const [negativeFlag, setNegativeFlag] = React.useState("");
    const [thListFlag, setThListFlag] = React.useState("");
    const [unListFlag, setUnListFlag] = React.useState("");
    const [hr031Flag, setHr031Flag] = React.useState("");
    const [hr032Flag, setHr032Flag] = React.useState("");
    const [hrDgFlag, setHrDgFlag] = React.useState("");
    const [hrLgFlag, setHrLgFlag] = React.useState("");
    const [isGsbEmployee, setIsGsbEmployee] = React.useState("");
    const [isDuplicateRegister, setIsDuplicateRegister] = React.useState("");


    const [validPostCodeAddrCust, setValidPostCodeAddrCust] = React.useState(false);
    const [validPeriodResYearCust, setValidPeriodResYearCust] = React.useState(false);
    const [validPeriodResMonthCust, setValidPeriodResMonthCust] = React.useState(false);
    const [validContractBranchDate, setValidContractBranchDate] = React.useState(false);

    const loadResStatus = async () => {
        try {
            const response = await getResidentialStatus();
            if (response.code === '000') {
                setResStatusData(response.data.residentialStatuses.sort((a, b) => (a.descriptionTh > b.descriptionTh ? 1 : -1)));
            }
        } catch (err) {
            console.error(err);
        }
    }

    const loadResType = async () => {
        try {
            const response = await getResidentialType();
            if (response.code === '000') {
                setResTypeData(response.data.residentials.sort((a, b) => (a.descriptionTh > b.descriptionTh ? 1 : -1)));
            }
        } catch (err) {
            console.error(err);
        }
    }

    const loadDistrict = async (provinceCode) => {
        try {
            const response = await getDistrict(provinceCode);
            if (response.code === '000') {
                setDistrictData(response.data.districts.sort((a, b) => (a.districtName > b.districtName ? 1 : -1)));
            }
        } catch (err) {
            console.error(err);
        }
    }

    const loadDistrictBranch = async (provinceCode) => {
        try {
            const response = await getDistrictForBranch(provinceCode);
            if (response.code === '000') {
                setDistrictBranchData(response.data.branchDistricts.sort((a, b) => (a.districtName > b.districtName ? 1 : -1)));
            }
        } catch (err) {
            console.error(err);
        }
    }

    const loadSubDistrict = async (districtCode) => {
        try {
            const response = await getSubDistrict(districtCode);
            if (response.code === '000') {
                setSubDistrictData(response.data.subDistricts.sort((a, b) => (a.subDistrictName > b.subDistrictName ? 1 : -1)));
            }
        } catch (err) {
            console.error(err);
        }
    }

    const loadBranch = async (branchProvince, branchDistict) => {
        try {
            const response = await getBranch(branchProvince, branchDistict);
            if (response.code === '000') {
                setBranchData(response.data.branches.sort((a, b) => (a.branchName > b.branchName ? 1 : -1)));
            }
        } catch (err) {
            console.error(err);
        }
    }

    const loadProvince = async () => {
        try {
            const response = await getProvince();
            if (response.code === '000') {
                setProvinceData(response.data.provinces.sort((a, b) => (a.provinceNameTh > b.provinceNameTh ? 1 : -1)));
            }
        } catch (err) {
            console.error(err);
        }
    }

    const loadProvinceBranch = async () => {
        try {
            const response = await getProvinceForBranch();
            if (response.code === '000') {
                setProvinceBranchData(response.data.branchProvinces.sort((a, b) => (a.provinceName > b.provinceName ? 1 : -1)));
            }
        } catch (err) {
            console.error(err);
        }
    }

    const generateApplicationNo = async () => {
        try {
            const payload = {
                channelCode: import.meta.env.VITE_CLIENT_ID.toString().substring(0, 4),
                marketCode: props.productLoan.substring(11, props.productLoan.length)
            }
            const response = await generateAppNo(payload);
            if (response.code === '000') {
                setAppNo(response.data.applicationNo);
            }
        } catch (err) {
            console.error(err);
        }
    }

    const getWarningList = async (citizenId) => {
        try {
            // var payload = {
            //     citizenID: citizenId
            // }
            // const response = await checkWarningList(payload, import.meta.env.VITE_WARNING_LIST_KEY);

            // setBlackListFlag(response.blackList);
            // setWhiteListFlag(response.whiteList);
            // setNegativeFlag(response.fraudList);
            const responseToken = await accessToken(import.meta.env.VITE_CLIENT_ID, import.meta.env.VITE_CLIENT_SECRET);
            if (responseToken.code === '000') {
                var searchList = [
                    {
                        key_search: citizenId,
                        Name: "",
                        CIF_Number: "",
                        CustType: "1"
                    }
                ]
                var dataEncrypted = encryptWithKey(JSON.stringify(searchList), import.meta.env.VITE_SECRET_KEY);
                console.debug(dataEncrypted);
                var payload = {
                    data: dataEncrypted
                }

                const response = await checkWarningListNew(payload, responseToken.data.token_type + ' ' + responseToken.data.access_token);
                if (response.code === '000') {
                    var dataDecrypted = decryptWithKey(response.data, import.meta.env.VITE_SECRET_KEY);
                    console.debug(dataDecrypted);
                    var result = JSON.parse(dataDecrypted);
                    if (result) {
                        setBlackListFlag(result.responseDetail.blacklist);
                        setWhiteListFlag(result.responseDetail.whiteList);
                        setNegativeFlag(result.responseDetail.fraudList);
                        setThListFlag(result.responseDetail.watchList === 'Y' && ["TH list"].includes(result.responseDetail.watchlist_sublist) ? result.responseDetail.watchList : 'N');
                        setUnListFlag(result.responseDetail.watchList === 'Y' && ["UN list"].includes(result.responseDetail.watchlist_sublist) ? result.responseDetail.watchList : 'N');
                        setHr031Flag(result.responseDetail.watchList === 'Y' && ["HR-03-1"].includes(result.responseDetail.watchlist_sublist) ? result.responseDetail.watchList : 'N');
                        setHr032Flag(result.responseDetail.watchList === 'Y' && ["HR-03-2"].includes(result.responseDetail.watchlist_sublist) ? result.responseDetail.watchList : 'N');
                        setHrDgFlag(result.responseDetail.watchList === 'Y' && ["HR-DG"].includes(result.responseDetail.watchlist_sublist) ? result.responseDetail.watchList : 'N');
                        setHrLgFlag(result.responseDetail.watchList === 'Y' && ["HR-LG"].includes(result.responseDetail.watchlist_sublist) ? result.responseDetail.watchList : 'N');
                    }
                } else {
                    console.error(response.description);
                }
            } else {
                console.error(responseToken);
            }

        } catch (err) {
            console.error(err);
        }
    }

    const getGsbEmployee = async (citizenId) => {
        try {
            const payload = {
                idCard: citizenId
            }
            const response = await checkGsbEmployee(payload);
            if (response.code === '0') {
                setIsGsbEmployee(response.data.employeeStatus ? 'Y' : 'N');
            }
        } catch (err) {
            console.error(err);
        }
    }

    const getDuplicateRegister = async (citizenId, marketCode) => {
        try {
            const payload = {
                citizenId: citizenId,
                marketCode: marketCode
            }
            const response = await checkDuplicateRegister(payload);
            if (response.code === '0') {
                setIsDuplicateRegister(response.data.dupFlag ? 'Y' : 'N');
            }
        } catch (err) {
            console.error(err);
        }
    }

    const addrCustChange = (e) => {
        e.preventDefault();
        setAddrsCust(e.target.value);
    }

    const provAddrCustChange = (e) => {
        setDistrictData([]);
        setSubDistrictData([]);
        e.preventDefault();
        setProvAddrCust(e.target.value);
        loadDistrict(e.target.value);
    }

    const distAddrCustChange = (e) => {
        setSubDistrictData([]);
        e.preventDefault();
        setDistAddrCust(e.target.value);
        loadSubDistrict(e.target.value);
    }

    const subDistAddrCustChange = (e) => {
        e.preventDefault();
        setSubDistAddrCust(e.target.value);
    }

    const postCodeAddrCustChange = (e) => {
        e.preventDefault();
        let isNumber = validNumber(e.target.value);
        let isLength = validLength(e.target.value, 5);
        setValidPostCodeAddrCust(isNumber || isLength ? true : false);
        setPostCodeAddrCust(e.target.value);
    }

    const residentialTypeCustChange = (e) => {
        e.preventDefault();
        setResidentialTypeCust(e.target.value);
    }

    const periodResYearCustChange = (e) => {
        e.preventDefault();
        let isNumber = validNumber(e.target.value);
        let isLength = validLength(e.target.value, 2);
        setValidPeriodResYearCust(isNumber || isLength ? true : false);
        setPeriodResYearCust(e.target.value);
    }

    const periodResMonthCustChange = (e) => {
        e.preventDefault();
        let isNumber = validNumber(e.target.value);
        let isLength = validLength(e.target.value, 2);
        let isMorthan12 = e.target.value >= 0 && e.target.value <= 12 ? false : true;
        setValidPeriodResMonthCust(isNumber || isLength || isMorthan12 ? true : false);
        setPeriodResMonthCust(e.target.value);
    }

    const residentialStatusCustChange = (e) => {
        e.preventDefault();
        setResidentialStatusCust(e.target.value);
    }

    const provContractCustChange = (e) => {
        setDistrictBranchData([]);
        setBranchData([]);
        e.preventDefault();
        setProvContractCust(e.target.value);
        loadDistrictBranch(e.target.value);
    }

    const distContractCustChange = (e) => {
        setBranchData([]);
        e.preventDefault();
        setDistContractCust(e.target.value);
        loadBranch(provContractCust, provContractCust + e.target.value)
    }

    const brchContractCustChange = (e) => {
        e.preventDefault();
        setBrchContractCust(e.target.value);
        const obj = branchData.find(({ branchCode }) => branchCode === (e.target.value));
        setBrchContractCustName(obj.branchName);
    }

    const contractDayBranchChange = (e) => {
        e.preventDefault();

        setValidContractBranchDate(validDate(contractYearBranch + "-" + contractMonthBranch + "-" + e.target.value, 'YYYY-MM-DD'));
        setContractDayBranch(e.target.value);
    }

    const contractMonthBranchChange = (e) => {
        e.preventDefault();

        setValidContractBranchDate(validDate(contractYearBranch + "-" + e.target.value + "-" + contractDayBranch, 'YYYY-MM-DD'));
        setContractMonthBranch(e.target.value);
    }
    const contractYearBranchChange = (e) => {
        e.preventDefault();

        setValidContractBranchDate(validDate(e.target.value + "-" + contractMonthBranch + "-" + contractDayBranch, 'YYYY-MM-DD'));
        setContractYearBranch(e.target.value);


    }

    const handleOnClickRegister = (e) => {
        e.preventDefault();
        setIsOpenConfirm(true);
    }



    const handleConfirmAddRegister = async (e) => {
        e.preventDefault();
        setIsOpenConfirm(false);
        setLoading(true);

        //check dateContract
        if (dayjs(contractYearBranch + '-' + contractMonthBranch + '-' + contractDayBranch).isAfter(dayjs().add(30, 'day'))) {
            setLoading(false);
            setMessageHeader("Warning");
            setMessage("กรุณาเลือกวันที่นัดหมายล่วงหน้าได้ไม่เกิน 30 วัน");
            setIsOpen(true);
        }



        // Check Register Duplicate
        if (isDuplicateRegister === 'Y') {
            const data = {
                messageHeaders: "ธนาคารได้ตรวจสอบคุณสมบัติของท่านเบื้องต้นเรียบร้อยแล้ว",
                messageDetails: "เลขบัตรประชาชนนี้ ได้สมัครสินเชื่อประเภท" + props.productLoanName + "แล้ว คลิกเพื่อตรวจสอบสถานะ"
            }
            navigate("/register-failed", { state: data });
        }

        // Check GSB Employee
        if (isGsbEmployee === 'Y') {
            const data = {
                messageHeaders: "ธนาคารได้ตรวจสอบคุณสมบัติของท่านเบื้องต้นเรียบร้อยแล้ว",
                messageDetails: "ขออภัย ไม่สามารถสมัครสินเชื่อได้ เนื่องจากท่านเป็นพนักงาน/ลูกจ้าง ธนาคารออมสิน"
            }
            navigate("/register-failed", { state: data });
        }

        // Check WarningList
        if (blackListFlag === 'Y' || whiteListFlag === 'Y' || negativeFlag === 'Y'
            || unListFlag === 'Y' || thListFlag === 'Y' || hr031Flag === 'Y'
            || hr032Flag === 'Y' || hrDgFlag === 'Y' || hrLgFlag === 'Y') {
            const data = {
                messageHeaders: "ธนาคารได้ตรวจสอบคุณสมบัติของท่านเบื้องต้นเรียบร้อยแล้ว",
                messageDetails: "ขออภัย ไม่สามารถสมัครสินเชื่อได้ เนื่องจากคุณสมบัติของท่านไม่ตรงตามหลักเกณฑ์ของธนาคาร"
            }
            navigate("/register-failed", { state: data });
        }

        // Check ชี้เป้า สำหรับสินเชื่อที่มีชี้เป้า

        //valid Data
        if (addrCust && provAddrCust && distAddrCust && subDistAddrCust && postCodeAddrCust &&
            residentialTypeCust && residentialStatusCust && provContractCust && distContractCust && brchContractCust &&
            contractDayBranch && contractMonthBranch && contractYearBranch) {

            const dataRequestDetail = {
                rowNumber: "1",
                appNo: appNo,
                transDateTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
                cifNo: null,
                citizenId: props.citizenId,
                transRef: null,
                titleCodeName: props.titleName,
                name: props.name,
                lastName: props.lastName,
                dopaStatus: "0 : สถานะปกติ",
                custIdentificationFlag: "N",
                age: calculateAge(props.dateOfBirth, dayjs().format("YYYY-MM-DD HH:mm:ss")),
                dateOfBirth: props.dateOfBirth,
                telNo: props.telNo,
                email: props.email,
                occupationCode: props.occupationCode + " : " + props.occupationCodeDesc,
                restrictionCode: "",
                blackListFlag: blackListFlag,
                whiteListFlag: whiteListFlag,
                loanSharkFlag: "N",
                tdrFlag: "N",
                negativeFlag: negativeFlag,
                writeOffFlag: "N",
                custQualificationFlag: "N",
                requestedAmountCode: props.requestAmount,
                ncbEConsentFlag: "N",
                bureauScore: "0",
                accountStatus: "N",
                npl: "N",
                ncbRef: "",
                accountType: props.productLoan.substring(0, 2),
                productLoanType: props.productLoan.substring(2, 6),
                subType: props.productLoan.substring(6, 11),
                marketCode: props.productLoan.substring(11, props.productLoan.length),
                loanObjectiveCode: props.opjectiveLoan,
                personalConsumptionCode: "",
                gender: props.gender,
                marital: props.marital,
                occupationMainCode: props.occupationCode,
                occupationSubCode: props.subOccupationCode,
                educationCode: props.educationCode,
                income: props.incomeFromSalary,
                otherIncome: props.otherIncome,
                totalOtherIncome: "0",
                incomeFromBusiness: props.incomeFromBusiness,
                child: props.child,
                workChild: '0',
                monthlyExpense: props.monthlyExpense,
                liabilityExpense: props.liabilityExpense,
                expressFromBusiness: props.expressFromBusiness,
                totalExpressFromBusiness: "0",
                residentialCode: residentialStatusCust,
                totalWorkTimeYear: props.workTimeYear,
                totalWorkTimeMonth: props.workTimeMonth,
                preWorkTimeMonth: "0",
                preAddressTime: "0",
                address: addrCust,
                proviceAddress: provAddrCust,
                districtAddress: distAddrCust,
                subDistrictAddress: subDistAddrCust,
                preAddressTimeMonth: periodResMonthCust,
                preAddressTimeYear: periodResYearCust,
                residentialType: residentialTypeCust,
                cbsPayStatus: null,
                loanTerm: "0",
                netIncomeFromSalary: "0",
                totalOtherIncomeOfEvidence: "0",
                proportionShareHolders: "0",
                otherIncomeFromBusiness: "0",
                salary: "0",
                branchCode: brchContractCust,
                regionCode: "",
                branchProvince: provContractCust,
                branchDistict: distContractCust,
                branchContractDate: contractYearBranch + "-" + contractMonthBranch + "-" + contractDayBranch,
                propertyRightCode: "",
                businessTypeCode: "",
                collTypeCode: "",
                collSubTypeCode: "",
                postCode: postCodeAddrCust,
                requestIdGatewayOnUs: "",
                referentIdOnUs: "",
                requestIdGatewayOffUs: "",
                referentIdOffUs: "",
                consentFlag: props.consent
            }

            const registersData = [];
            registersData.push(dataRequestDetail);
            const dataRequest = {
                requestId: uuidv4(),
                channelId: import.meta.env.VITE_CLIENT_ID,
                registers: registersData
            }
            //Access Token
            try {

                const responseToken = await accessToken(import.meta.env.VITE_CLIENT_ID, import.meta.env.VITE_CLIENT_SECRET);
                if (responseToken.code === '000') {
                    //Add Register
                    try {
                        const responseRegister = await addRegister(dataRequest, responseToken.data.token_type + ' ' + responseToken.data.access_token);
                        if (responseRegister.code === '0' && responseRegister.data.rowCount !== 0) {
                            setLoading(false);
                            let dataState = {
                                productName: props.productLoanName,
                                branchName: brchContractCustName,
                                branchContract: contractDayBranch + " " + monthTh(contractMonthBranch) + " " + yearTh(contractYearBranch),
                            }
                            navigate("/register-success", { state: dataState });
                        } else {
                            console.error("Add Reigster Error !!");
                            console.error(responseToken);
                            setLoading(false);
                            setMessageHeader("Warning");
                            setMessage("ไม่สามารถลงทะเบียนสมัครสินเชื่อได้");
                            setIsOpen(true);

                        }
                    } catch (err) {
                        console.error("Add Reigster Error !!");
                        console.error(err);
                        setLoading(false);
                        setMessageHeader("Warning");
                        setMessage("ไม่สามารถลงทะเบียนสมัครสินเชื่อได้");
                        setIsOpen(true);
                    }

                } else {
                    console.error("Access Token Error !!");
                    console.error(responseToken);
                    setLoading(false);
                    setMessageHeader("Warning");
                    setMessage("ไม่สามารถบันทึกข้อมูลได้");
                    setIsOpen(true);
                }

            } catch (err) {
                console.error("Access Token Error !!");
                console.error(err);
                setLoading(false);
                setMessageHeader("Warning");
                setMessage("ไม่สามารถบันทึกข้อมูลได้");
                setIsOpen(true);
            }

        } else {
            setMessageHeader("Warning");
            setMessage("กรุณาระบุข้อมูลให้ครบถ้วน");
            setIsOpen(true);
        }
    }
    const handleOnClose = (e) => {
        e.preventDefault();
        setIsOpen(false);
        setMessage("");
    }
    return (
        <>
            <section className="relative bg-white py-20 px-4" />
            <section className="container mx-auto bg-white py-10 p-10">
                <div className="container">
                    <Typography variant="h6">ข้อมูลที่อยู่ปัจจุบัน</Typography>
                    <hr className="mx-auto w-full border-black-700" />
                </div>
                <div className="grid grid-cols-1 gap-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 py-8">
                    {isOpen ? <DialogCustom action={isOpen} headermsg={messageHeader} bodyMsg={message} onClose={handleOnClose} /> : null}
                    {isOpenConfirm ?
                        <>
                            <Dialog
                                open={isOpenConfirm}
                                handler={() => setIsOpenConfirm(!isOpenConfirm)}
                                animate={{
                                    mount: { scale: 1, y: 0 },
                                    unmount: { scale: 0.9, y: -100 },
                                }}
                            >
                                <DialogHeader>ยืนยันสมัครใช้บริการสินเชื่อธนาคารออมสิน</DialogHeader>
                                <DialogBody>

                                </DialogBody>
                                <DialogFooter>
                                    <Button
                                        variant="text"
                                        color="red"
                                        onClick={() => setIsOpenConfirm(false)}
                                        className="mr-1"
                                    >
                                        <span>กลับไปแก้ไข</span>
                                    </Button>
                                    <Button variant="gradient" color="pink" onClick={handleConfirmAddRegister}>
                                        <span>ยืนยัน</span>
                                    </Button>
                                </DialogFooter>
                            </Dialog>
                        </> : null}
                    <div>
                        <Typography variant="small" color="gray">
                            ที่อยู่ / Address
                        </Typography>
                        <Textarea
                            color="green"
                            value={addrCust}
                            onChange={addrCustChange}
                            disabled={loading}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-2">
                    <div>
                        <Typography variant="small" color="gray">
                            จังหวัด / Province
                        </Typography>
                        <CustomSelect
                            fullWidth
                            size="small"
                            variant="outlined"
                            color="pink"
                            value={provAddrCust}
                            onChange={provAddrCustChange}
                            disabled={loading}
                        >
                            <MenuItem value="-">เลือก</MenuItem>
                            {provinceData.map((option) => (
                                <MenuItem key={option.provinceCode} value={option.provinceCode}>
                                    {option.provinceNameTh}
                                </MenuItem>
                            ))}
                        </CustomSelect>
                    </div>
                    <div>
                        <Typography variant="small" color="gray">
                            อำเภอ / District
                        </Typography>
                        <CustomSelect
                            fullWidth
                            size="small"
                            variant="outlined"
                            color="pink"
                            value={distAddrCust}
                            onChange={distAddrCustChange}
                            disabled={loading}
                        >
                            <MenuItem value="-">เลือก</MenuItem>
                            {districtData.map((option) => (
                                <MenuItem key={option.districtCode} value={option.districtCode}>
                                    {option.districtName}
                                </MenuItem>
                            ))}
                        </CustomSelect>
                    </div>
                    <div>
                        <Typography variant="small" color="gray">
                            ตำบล / Sub District
                        </Typography>
                        <CustomSelect
                            fullWidth
                            size="small"
                            variant="outlined"
                            color="pink"
                            value={subDistAddrCust}
                            onChange={subDistAddrCustChange}
                            disabled={loading}
                        >
                            <MenuItem value="-">เลือก</MenuItem>
                            {subDistrictData.map((option) => (
                                <MenuItem key={option.subDistrictCode} value={option.subDistrictCode}>
                                    {option.subDistrictName}
                                </MenuItem>
                            ))}
                        </CustomSelect>
                    </div>
                    <div>
                        <Typography variant="small" color="gray">
                            รหัสไปรษณีย์
                        </Typography>
                        <Input
                            color={validPostCodeAddrCust ? "red" : "green"}
                            value={postCodeAddrCust}
                            error={validPostCodeAddrCust}
                            onChange={postCodeAddrCustChange}
                            disabled={loading}
                            maxLength={5}
                        />
                        {validPostCodeAddrCust
                            ?
                            <Typography variant="small" color="red">
                                กรุณาระบุรหัสไปรษณีย์ให้ถูกต้อง
                            </Typography>
                            : null
                        }
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-2">
                    <div>
                        <Typography variant="small" color="gray">
                            ประเภทที่พักอาศัย
                        </Typography>
                        <CustomSelect
                            fullWidth
                            size="small"
                            variant="outlined"
                            color="pink"
                            value={residentialTypeCust}
                            onChange={residentialTypeCustChange}
                            disabled={loading}
                        >
                            <MenuItem value="-">เลือก</MenuItem>
                            {resTypeData.map((option) => (
                                <MenuItem key={option.code} value={option.code}>
                                    {option.descriptionTh}
                                </MenuItem>
                            ))}
                        </CustomSelect>
                    </div>
                    <div>
                        <Typography variant="small" color="gray">
                            ระยะเวลาที่พักอาศัย (ที่อยู่ปัจจุบัน) - ปี
                        </Typography>
                        <Input
                            type="number"
                            color={validPeriodResYearCust ? "red" : "green"}
                            value={periodResYearCust}
                            error={validPeriodResYearCust}
                            onChange={periodResYearCustChange}
                            disabled={loading}
                            maxLength={2}
                            max={99}
                            min={0}
                        />
                        {validPeriodResYearCust
                            ?
                            <Typography variant="small" color="red">
                                กรุณาระบุรระยะเวลาที่พักอาศัย (ปี) ให้ถูกต้อง
                            </Typography>
                            : null
                        }
                    </div>
                    <div>
                        <Typography variant="small" color="gray">
                            ระยะเวลาที่พักอาศัย (ที่อยู่ปัจจุบัน) - เดือน
                        </Typography>
                        <Input
                            type="number"
                            color={validPeriodResMonthCust ? "red" : "green"}
                            value={periodResMonthCust}
                            error={validPeriodResMonthCust}
                            onChange={periodResMonthCustChange}
                            disabled={loading}
                            maxLength={2}
                            max={11}
                            min={0}
                        />
                        {validPeriodResMonthCust
                            ?
                            <Typography variant="small" color="red">
                                กรุณาระบุระยะเวลาที่พักอาศัย (เดือน) ให้ถูกต้อง
                            </Typography>
                            : null
                        }
                    </div>
                    <div>
                        <Typography variant="small" color="gray">
                            สถานะการอาศัย
                        </Typography>
                        <CustomSelect
                            fullWidth
                            size="small"
                            variant="outlined"
                            color="pink"
                            value={residentialStatusCust}
                            onChange={residentialStatusCustChange}
                            disabled={loading}
                        >
                            <MenuItem value="-">เลือก</MenuItem>
                            {resStatusData.map((option) => (
                                <MenuItem key={option.code} value={option.code}>
                                    {option.descriptionTh}
                                </MenuItem>
                            ))}
                        </CustomSelect>
                    </div>
                </div>
            </section>
            <section className="container mx-auto bg-white py-10 p-10">
                <div className="container">
                    <Typography variant="h6">เลือกสาขาที่สะดวกติดต่อ</Typography>
                    <hr className="mx-auto w-full border-black-700" />
                </div>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-1 lg:grid-cols-3 py-8">
                    <div>
                        <Typography variant="small" color="gray">
                            จังหวัด / Province
                        </Typography>
                        <CustomSelect
                            fullWidth
                            size="small"
                            variant="outlined"
                            color="pink"
                            value={provContractCust}
                            onChange={provContractCustChange}
                            disabled={loading}
                        >
                            <MenuItem value="-">เลือก</MenuItem>
                            {provinceBranchData.map((option) => (
                                <MenuItem key={option.provinceCode} value={option.provinceCode}>
                                    {option.provinceName}
                                </MenuItem>
                            ))}
                        </CustomSelect>
                    </div>
                    <div>
                        <Typography variant="small" color="gray">
                            อำเภอ / District
                        </Typography>
                        <CustomSelect
                            fullWidth
                            size="small"
                            variant="outlined"
                            color="pink"
                            value={distContractCust}
                            onChange={distContractCustChange}
                            disabled={loading}
                        >
                            <MenuItem value="-">เลือก</MenuItem>
                            {districtBranchData.map((option) => (
                                <MenuItem key={option.districtCode} value={option.districtCode}>
                                    {option.districtName}
                                </MenuItem>
                            ))}
                        </CustomSelect>
                    </div>
                    <div>
                        <Typography variant="small" color="gray">
                            สาขา / Branch
                        </Typography>
                        <CustomSelect
                            fullWidth
                            size="small"
                            variant="outlined"
                            color="pink"
                            value={brchContractCust}
                            onChange={brchContractCustChange}
                            disabled={loading}
                        >
                            <MenuItem value="-">เลือก</MenuItem>
                            {branchData.map((option) => (
                                <MenuItem key={option.branchCode} value={option.branchCode}>
                                    {option.branchName}
                                </MenuItem>
                            ))}
                        </CustomSelect>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-1 lg:grid-cols-3 py-2">
                    <div>
                        <Typography variant="small" color="gray">
                            วันที่สะดวกติดต่อสาขา
                        </Typography>
                        <CustomSelect
                            fullWidth
                            size="small"
                            variant="outlined"
                            color="pink"
                            value={contractDayBranch}
                            onChange={contractDayBranchChange}
                            disabled={loading}
                        >
                            <MenuItem value="-">เลือก</MenuItem>
                            {dateData.map(({ id, date }) => (
                                <MenuItem key={date} value={date}>{date}</MenuItem>
                            ))}
                        </CustomSelect>
                        {validContractBranchDate
                            ?
                            <Typography variant="small" color="red">
                                กรุณาระบุวันที่สะดวกติดต่อสาขา ให้ถูกต้อง
                            </Typography>
                            : null
                        }
                    </div>
                    <div>
                        <Typography variant="small" color="gray">
                            เดือนที่สะดวกติดต่อสาขา
                        </Typography>
                        <CustomSelect
                            fullWidth
                            size="small"
                            variant="outlined"
                            color="pink"
                            value={contractMonthBranch}
                            onChange={contractMonthBranchChange}
                            disabled={loading}
                        >
                            <MenuItem value="-">เลือก</MenuItem>
                            {monthData.map(({ id, thM }) => (
                                <MenuItem key={id} value={id}>{thM}</MenuItem>
                            ))}
                        </CustomSelect>
                    </div>
                    <div>
                        <Typography variant="small" color="gray">
                            ปีที่สะดวกติดต่อสาขา
                        </Typography>
                        <CustomSelect
                            fullWidth
                            size="small"
                            variant="outlined"
                            color="pink"
                            value={contractYearBranch}
                            onChange={contractYearBranchChange}
                            disabled={loading}
                        >
                            <MenuItem value="-">เลือก</MenuItem>
                            {yearContractData.map((option) => (
                                <MenuItem key={option.toString()} value={option.toString()}>
                                    {(option + 543).toString()}
                                </MenuItem>
                            ))}
                        </CustomSelect>
                    </div>
                </div>
                <div className="mx-auto w-full mt-12 lg:w-5/12 grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
                    <div>
                        <br />
                        <Button
                            id="backHomePageBtn"
                            className="mt-8 rounded-full"
                            variant="filled"
                            color='gray'
                            size="lg"
                            onClick={(e) => {
                                e.preventDefault;
                                const data = {
                                    requestAmount: props.requestAmount,
                                    opjectiveLoan: props.opjectiveLoan,
                                    productLoan: props.productLoan,
                                    productLoanName: props.productLoanName,
                                    consent: props.consent,
                                    citizenId: props.citizenId,
                                    titleName: props.titleName,
                                    name: props.name,
                                    lastName: props.lastName,
                                    dateOfBirth: props.dateOfBirth,
                                    telNo: props.telNo,
                                    email: props.email,
                                    educationCode: props.educationCode,
                                    marital: props.marital,
                                    child: props.child,
                                    occupationCode: props.occupationCode,
                                    occupationCodeDesc: props.occupationCodeDesc,
                                    subOccupationCode: props.subOccupationCode,
                                    workTimeYear: props.workTimeYear,
                                    workTimeMonth: props.workTimeMonth,
                                    incomeFromSalary: props.incomeFromSalary,
                                    incomeFromBusiness: props.incomeFromBusiness,
                                    otherIncome: props.otherIncome,
                                    expressFromBusiness: props.expressFromBusiness,
                                    monthlyExpense: props.monthlyExpense

                                }
                                navigate("/register-work-info", { state: data })
                            }}
                            fullWidth>
                            ย้อนกลับ
                        </Button>
                    </div>
                    <div>
                        {loading ? <SpinnerCustom /> : null}
                        <br />
                        <Button
                            id="registerBtn"
                            className="mt-8 rounded-full"
                            color="pink"
                            size="lg"
                            onClick={handleOnClickRegister}
                            fullWidth
                            disabled={validPeriodResMonthCust || validPeriodResYearCust || validPostCodeAddrCust || validContractBranchDate || loading ? true : false}
                        >
                            ยืนยันสมัคร
                        </Button>
                    </div>
                    <div>

                    </div>

                </div>
            </section>
        </>
    )
}
export default RegisterAddrInfo;