import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import MenuItem from '@mui/material/MenuItem';
import CustomSelect from "@/widgets/select/CustomSelect";
import {
    dateData,
    monthData,
} from "@/data";
import {
    validIdCard,
    validCharater,
    validEmail,
    validNumber,
    validMobileNo,
    validLength,
    calculateYearByAge,
    validDate,
    encryptWithKey,
    decryptWithKey
} from "@/utils";
import { DialogCustom } from "@/widgets/dialog";
import {
    getTitleName,
    getMarital,
    getEducation,
    checkDuplicateRegister,
    checkWarningListNew,
    checkGsbEmployee,
    accessToken,
} from "@/services";

export function RegisterPersonInfo() {
    React.useEffect(() => {
        loadTitleName();
        loadMarital();
        loadEducation();
    }, [])

    const navigate = useNavigate();
    const location = useLocation();
    const props = location.state;
    const yearOfBirthData = calculateYearByAge(props.productLoanMaxAge, props.productLoanMinAge);

    const [isOpen, setIsOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [citizenIdCust, setCitizenIdCust] = React.useState(props != null ? props.citizenId ? props.citizenId : "" : "");
    const [titleNameCust, setTitleNameCust] = React.useState(props != null ? props.titleName ? props.titleName : "-" : "-");
    const [titleNameCustDesc, setTitleNameCustDesc] = React.useState("");
    const [nameCust, setNameCsut] = React.useState(props != null ? props.name ? props.name : "" : "");
    const [lastNameCust, setLastNameCust] = React.useState(props != null ? props.lastName ? props.lastName : "" : "");
    const [dobCust, setDobCust] = React.useState(props != null ? props.dateOfBirth ? props.dateOfBirth.split("-")[2] : "-" : "-");
    const [mobCust, setMobCust] = React.useState(props != null ? props.dateOfBirth ? props.dateOfBirth.split("-")[1] : "-" : "-");
    const [yobCust, setyobCust] = React.useState(props != null ? props.dateOfBirth ? props.dateOfBirth.split("-")[0] : "-" : "-");
    const [telCust, setTelCust] = React.useState(props != null ? props.telNo ? props.telNo : "" : "");
    const [emailCust, setEmailCust] = React.useState(props != null ? props.email ? props.email : "" : "");
    const [edctCust, setEdctCust] = React.useState(props != null ? props.educationCode ? props.educationCode : "-" : "-");
    const [mrsCust, setMrsCust] = React.useState(props != null ? props.marital ? props.marital : "-" : "-");
    const [nocCust, setNocCust] = React.useState(props != null ? props.child ? props.child : 0 : 0);

    const [validCitizenId, setValidCitizenId] = React.useState(false);
    const [validName, setValidName] = React.useState(false);
    const [validLastName, setValidLastName] = React.useState(false);
    const [validTel, setValidTel] = React.useState(false);
    const [validEmailCust, setValidEmailCust] = React.useState(false);
    const [validNumOfChild, setValidNumOfChild] = React.useState(false);
    const [validDateOfBirth, setValidDateOfBirth] = React.useState(false);


    const [titleNameData, setTitleNameData] = React.useState([]);
    const [maritalData, setMaritalData] = React.useState([]);
    const [educationData, setEducationData] = React.useState([]);

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

    const loadTitleName = async () => {
        try {
            const response = await getTitleName();
            if (response.code === '000') {
                setTitleNameData(response.data.titleNames.sort((a, b) => (a.descriptionTh > b.descriptionTh ? 1 : -1)));
            }
        } catch (err) {
            console.error(err);
        }
    }

    const loadMarital = async () => {
        try {
            const response = await getMarital();
            if (response.code === '000') {
                setMaritalData(response.data.maritalStatus.sort((a, b) => (a.descriptionTh > b.descriptionTh ? 1 : -1)));
            }
        } catch (err) {
            console.error(err);
        }
    }

    const loadEducation = async () => {
        try {
            const response = await getEducation();
            if (response.code === '000') {
                setEducationData(response.data.educations.sort((a, b) => (a.code > b.code ? 1 : -1)));
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
                var searchList =[
                    {
                        key_search: citizenId,
                        Name: "",
                        CIF_Number: "",
                        CustType: "1"
                    }
                ]
                var dataEncrypted = encryptWithKey(JSON.stringify(searchList), import.meta.env.VITE_SECRET_KEY);
                console.debug(dataEncrypted);
                var payload ={
                        data: dataEncrypted
                }
                
                const response = await checkWarningListNew(payload, responseToken.data.token_type + ' ' + responseToken.data.access_token);
                if (response.code === '000') {
                    var dataDecrypted = decryptWithKey(response.data, import.meta.env.VITE_SECRET_KEY);
                    console.debug(dataDecrypted);
                    var result = JSON.parse(dataDecrypted);
                    if(result){
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
                }else{
                    console.error(response.description);
                }
            }else{
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

    const handleOnClickToRegisterWorkInfo = (e) => {
        e.preventDefault();

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

        // Check ชี้เป้า สำหรับสินเชื่อที่มีชี้เป้า

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

        // Next Step
        if (citizenIdCust && titleNameCust && nameCust && lastNameCust &&
            dobCust && mobCust && yobCust && telCust && edctCust && mrsCust) {
            const data = {
                requestAmount: props.requestAmount,
                opjectiveLoan: props.opjectiveLoan,
                productLoan: props.productLoan,
                productLoanName: props.productLoanName,
                consent: props.consent,
                citizenId: citizenIdCust,
                titleName: titleNameCust,
                gender: titleNameCustDesc === "นาย" ? "M" : titleNameCustDesc === "นาง" || titleNameCustDesc === "นางสาว" ? "F" : "X",
                name: nameCust,
                lastName: lastNameCust,
                dateOfBirth: yobCust + "-" + mobCust + "-" + dobCust,
                telNo: telCust,
                email: emailCust,
                educationCode: edctCust,
                marital: mrsCust,
                child: nocCust,
                occupationCode: null,
                occupationCodeDesc: null,
                subOccupationCode: null,
                workTimeYear: null,
                workTimeMonth: null,
                incomeFromSalary: null,
                incomeFromBusiness: null,
                otherIncome: null,
                expressFromBusiness: null,
                monthlyExpense: null

            }
            console.debug(data);
            navigate("/register-work-info", { state: data });
        } else {
            setIsOpen(true);
            setMessage("กรุณาระบุข้อมูลให้ครบถ้วน");
        }


    }
    const handleChangeCitizenIdCust = (e) => {
        e.preventDefault();
        setValidCitizenId(validIdCard(e.target.value));
        setCitizenIdCust(e.target.value);
        
        if(e.target.value.length == 13){
            getWarningList(e.target.value);
            getGsbEmployee(e.target.value);
            getDuplicateRegister(e.target.value, props.productLoan.substring(11, props.productLoan.length));
        }

    }
    const handleChangeTitleNameCust = (e) => {
        e.preventDefault();
        setTitleNameCust(e.target.value);
        const name = titleNameData.find(({ code }) => code === e.target.value);
        setTitleNameCustDesc(name.descriptionTh)
    }
    const handleChangeNameCust = (e) => {
        e.preventDefault();
        setValidName(validCharater(e.target.value));
        setNameCsut(e.target.value);
    }
    const handleChangeLastNameCust = (e) => {
        e.preventDefault();
        setValidLastName(validCharater(e.target.value));
        setLastNameCust(e.target.value);
    }
    const handleChangeDobCust = (e) => {
        e.preventDefault();
        setValidDateOfBirth(validDate(yobCust + "-" + mobCust + "-" + e.target.value, "YYYY-MM-DD"));
        setDobCust(e.target.value);
    }

    const handleChangeMobCust = (e) => {
        e.preventDefault();
        setValidDateOfBirth(validDate(yobCust + "-" + e.target.value + "-" + dobCust, "YYYY-MM-DD"));
        setMobCust(e.target.value);
    }
    const handleChangeYobCust = (e) => {
        e.preventDefault();

        setValidDateOfBirth(validDate(e.target.value + "-" + mobCust + "-" + dobCust, "YYYY-MM-DD"));
        setyobCust(e.target.value);
    }
    const handleChangeTelCust = (e) => {
        e.preventDefault();
        setValidTel(validMobileNo(e.target.value));
        setTelCust(e.target.value);
    }
    const handleChangeEmailCust = (e) => {
        e.preventDefault();
        setValidEmailCust(validEmail(e.target.value));
        setEmailCust(e.target.value);
    }
    const handleChangeEdctCust = (e) => {
        e.preventDefault();
        setEdctCust(e.target.value);
    }
    const handleChangeMrsCust = (e) => {
        e.preventDefault();
        setMrsCust(e.target.value);
    }
    const handleChangeNocCust = (e) => {
        e.preventDefault();
        let isNumber = validNumber(e.target.value);
        let isLength = validLength(e.target.value, 2)
        setValidNumOfChild(isNumber || isLength ? true : false);
        setNocCust(e.target.value);
    }
    const handleOnClose = (e) => {
        e.preventDefault();
        setIsOpen(false);
        setMessage("");
    }
    return (
        <>
            <section className="relative bg-white py-20 px-4" />
            <section className="relative block h-[50vh] ">
                <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/background-2.jpg')] bg-cover bg-center scale-105" />
            </section>
            <section className="container mx-auto bg-white py-10 p-10">
                {isOpen ? <DialogCustom action={isOpen} headermsg="แจ้งเตือน" bodyMsg={message} onClose={handleOnClose} /> : null}
                <div className="container">
                    <Typography variant="h6">ข้อมูลส่วนตัว</Typography>
                    <hr className="mx-auto w-full border-black-700" />
                </div>
                <form className="mt-2 mx-auto w-full ">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 py-8">
                        <div>
                            <Typography variant="small" color="gray">
                                เลขบัตรประชาชน / Citizen Id
                            </Typography>
                            <Input
                                color={validCitizenId ? "red" : "green"}
                                value={citizenIdCust}
                                error={validCitizenId}
                                onChange={handleChangeCitizenIdCust}
                                maxLength={13}
                            />
                            {validCitizenId
                                ?
                                <Typography variant="small" color="red">
                                    กรุณาระบุเลขบัตรประชาชนให้ครบถ้วน (13 หลัก)
                                </Typography>
                                : null
                            }

                        </div>
                        <div className="mx-auto w-full mt-6 lg:w-5/12">

                        </div>
                        <div>&nbsp;</div>
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 py-2">
                        <div>
                            <Typography variant="small" color="gray">
                                คำนำหน้าชื่อ / Title
                            </Typography>
                            <CustomSelect
                                fullWidth
                                size="small"
                                variant="outlined"
                                color="pink"
                                value={titleNameCust}
                                onChange={handleChangeTitleNameCust}>
                                <MenuItem value="-">เลือก</MenuItem>
                                {titleNameData.map((option) => (
                                    <MenuItem key={option.code} value={option.code}>
                                        {option.descriptionTh}
                                    </MenuItem>
                                ))}
                            </CustomSelect>
                        </div>
                        <div>
                            <Typography variant="small" color="gray">
                                ชื่อ / Name
                            </Typography>
                            <Input
                                color={validName ? "red" : "green"}
                                value={nameCust}
                                error={validName}
                                onChange={handleChangeNameCust}
                            />
                            {validName
                                ?
                                <Typography variant="small" color="red">
                                    กรุณาระบุชื่อให้ถูกต้อง
                                </Typography>
                                : null
                            }
                        </div>
                        <div>
                            <Typography variant="small" color="gray">
                                นามสกุล / lastname
                            </Typography>
                            <Input
                                color={validLastName ? "red" : "green"}
                                value={lastNameCust}
                                error={validLastName}
                                onChange={handleChangeLastNameCust}
                            />
                            {validLastName
                                ?
                                <Typography variant="small" color="red">
                                    กรุณาระบุนามสกุลให้ถูกต้อง
                                </Typography>
                                : null
                            }
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 py-2">
                        <div>
                            <Typography variant="small" color="gray">
                                วันเกิด / Date
                            </Typography>
                            <CustomSelect
                                fullWidth
                                size="small"
                                variant="outlined"
                                color="pink"
                                value={dobCust}
                                onChange={handleChangeDobCust}
                            >
                                <MenuItem value="-">เลือก</MenuItem>
                                {dateData.map(({ date }) => (
                                    <MenuItem key={date} value={date}>{date}</MenuItem>
                                ))}
                            </CustomSelect>
                            {validDateOfBirth
                                ?
                                <Typography variant="small" color="red">
                                    กรุณาระบุวัน เดือน ปีเกิด ให้ถูกต้อง
                                </Typography>
                                : null
                            }
                        </div>
                        <div>
                            <Typography variant="small" color="gray">
                                เดือนเกิด / Month
                            </Typography>
                            <CustomSelect
                                fullWidth
                                size="small"
                                variant="outlined"
                                color="pink"
                                value={mobCust}
                                onChange={handleChangeMobCust}
                            >
                                <MenuItem value="-">เลือก</MenuItem>
                                {monthData.map(({ id, thM }) => (
                                    <MenuItem key={id} value={id}>{thM}</MenuItem>
                                ))}
                            </CustomSelect>
                        </div>
                        <div>
                            <Typography variant="small" color="gray">
                                ปีเกิด / Month
                            </Typography>
                            <CustomSelect
                                fullWidth
                                size="small"
                                variant="outlined"
                                color="pink"
                                value={yobCust}
                                onChange={handleChangeYobCust}
                            >
                                <MenuItem key="" value="-">เลือก</MenuItem>
                                {yearOfBirthData.map((option) => (
                                    <MenuItem key={option.toString()} value={option.toString()}>
                                        {(option + 543).toString()}
                                    </MenuItem>
                                ))}
                            </CustomSelect>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 py-2">
                        <div>
                            <Typography variant="small" color="gray">
                                เบอร์มือถือ / Mobile phone
                            </Typography>
                            <Input
                                color={validTel ? "red" : "green"}
                                value={telCust}
                                error={validTel}
                                onChange={handleChangeTelCust}
                                maxLength={10}
                            />
                            {validTel
                                ?
                                <Typography variant="small" color="red">
                                    กรุณาระบุเบอร์มือถือให้ถูกต้อง (ครบ 10 หลัก)
                                </Typography>
                                : null
                            }
                        </div>
                        <div>
                            <Typography variant="small" color="gray">
                                อีเมล / Email
                            </Typography>
                            <Input
                                color={validEmailCust ? "red" : "green"}
                                value={emailCust}
                                error={validEmailCust}
                                onChange={handleChangeEmailCust}
                            />
                            {validEmailCust
                                ?
                                <Typography variant="small" color="red">
                                    กรุณาระบุอีเมลให้ถูกต้อง
                                </Typography>
                                : null
                            }
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 py-2">
                        <div>
                            <Typography variant="small" color="gray">
                                ระดับการศึกษา / Education
                            </Typography>
                            <CustomSelect
                                fullWidth
                                size="small"
                                variant="outlined"
                                color="pink"
                                value={edctCust}
                                onChange={handleChangeEdctCust}
                            >
                                <MenuItem key="" value="-">เลือก</MenuItem>
                                {educationData.map((option) => (
                                    <MenuItem key={option.code} value={option.code}>
                                        {option.descriptionTh}
                                    </MenuItem>
                                ))}

                            </CustomSelect>
                        </div>
                        <div>
                            <Typography variant="small" color="gray">
                                สถานภาพสมรส / Marital Status
                            </Typography>
                            <CustomSelect
                                fullWidth
                                size="small"
                                variant="outlined"
                                color="pink"
                                value={mrsCust}
                                onChange={handleChangeMrsCust}
                            >
                                <MenuItem key="" value="-">เลือก</MenuItem>
                                {maritalData.map((option) => (
                                    <MenuItem key={option.code} value={option.code}>
                                        {option.descriptionTh}
                                    </MenuItem>
                                ))}
                            </CustomSelect>
                        </div>
                        <div>
                            <Typography variant="small" color="gray">
                                จำนวนบุตร / Number of children
                            </Typography>
                            <Input
                                color={validNumOfChild ? "red" : "green"}
                                value={nocCust}
                                error={validNumOfChild}
                                onChange={handleChangeNocCust}
                                maxLength={2}
                            />
                            {validNumOfChild
                                ?
                                <Typography variant="small" color="red">
                                    กรุณาระบุจำนวนบุตรให้ถูกต้อง
                                </Typography>
                                : null
                            }
                        </div>
                    </div>
                </form>
                <div className="mx-auto w-full mt-12 lg:w-5/12 grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
                    <div>
                        <Button
                            id="backBtn"
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
                                    productLoanMaxAge: props.productLoanMaxAge,
                                    productLoanMinAge: props.productLoanMinAge
                                }
                                navigate("/register-product", { state: data })
                            }}
                            fullWidth>
                            ย้อนกลับ
                        </Button>
                    </div>
                    <div>
                        <Button
                            id="nextRegisWorkInfoBtn"
                            className="mt-8 rounded-full"
                            color="pink"
                            size="lg"
                            onClick={handleOnClickToRegisterWorkInfo}
                            fullWidth
                            disabled={validCitizenId || validName ||
                                validLastName || validTel ||
                                validEmailCust || validNumOfChild ? true : false}
                        >
                            {'ถัดไป >'}
                        </Button>
                    </div>

                </div>
            </section>

        </>
    );
}

export default RegisterPersonInfo;
