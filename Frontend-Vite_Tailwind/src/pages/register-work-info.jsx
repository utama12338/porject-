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
    validNumber,
    validLength
} from "@/utils";
import { DialogCustom } from "@/widgets/dialog";
import { getOccupation, getSubOccupation } from "@/services";

export function RegisterWorkInfo() {
    React.useEffect(() => {
        loadOccupation();
        loadSubOccupation("");
    }, [])

    const navigate = useNavigate();
    const location = useLocation();
    const props = location.state;

    const [isOpen, setIsOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");

    const [occupationCode, setOccupataionCode] = React.useState(props != null ? props.occupationCode ? props.occupationCode : "-" : "-");
    const [occupationCodeDesc, setOccupationCodeDesc] = React.useState(props != null ? props.occupationCodeDesc ? props.occupationCodeDesc : "" : "");
    const [subOccupationCode, setSubOccupationCode] = React.useState(props != null ? props.subOccupationCode ? props.subOccupationCode : "-" : "-");
    const [workTimeYear, setWorkTimeYear] = React.useState(props != null ? props.workTimeYear ? props.workTimeYear : 0 : 0);
    const [workTimeMonth, setWorkTimeMonth] = React.useState(props != null ? props.workTimeMonth ? props.workTimeMonth : 0 : 0);
    const [incomeFromSalary, setIncomeFromSalary] = React.useState(props != null ? props.incomeFromSalary ? props.incomeFromSalary : null : null);
    const [incomeFromBusiness, setIncomeFromBusiness] = React.useState(props != null ? props.incomeFromBusiness ? props.incomeFromBusiness : null : null);
    const [otherIncome, setOtherIncome] = React.useState(props != null ? props.otherIncome ? props.otherIncome : null : null);
    const [expressFromBusiness, setExpressFromBusiness] = React.useState(props != null ? props.expressFromBusiness ? props.expressFromBusiness : null : null);
    const [monthlyExpense, setMonthlyExpense] = React.useState(props != null ? props.monthlyExpense ? props.monthlyExpense : null : null);

    const [validWorkTimeYear, setValidWorkTimeYear] = React.useState(false);
    const [vaildWorkTimeMonth, setValidWorkTimeMonth] = React.useState(false);
    const [validIncomeFromSalary, setValidIncomeFromSalary] = React.useState(false);
    const [validIncomeFromBusiness, setValidIncomeFromBusiness] = React.useState(false);
    const [validOtherIncome, setValidOtherIncome] = React.useState(false);
    const [validExpressFromBusiness, setValidExpressFromBusiness] = React.useState(false);
    const [validMonthlyExpense, setValidMonthlyExpense] = React.useState(false);

    const [isRegular, setIsRegular] = React.useState(props != null ? props.incomeFromSalary ? true : false : false);
    const [isFreelance, setIsFreelance] = React.useState(props != null ? props.incomeFromBusiness ? true : false : false);

    const [occupationData, setOccupationData] = React.useState([]);
    const [subOccupationData, setSubOccupationData] = React.useState([]);

    const handleOnClickToRegisterAddrInfo = (e) => {
        e.preventDefault();
        setIsOpen(false);
        setMessage("");

        const data = {
            requestAmount: props.requestAmount,
            opjectiveLoan: props.opjectiveLoan,
            productLoan: props.productLoan,
            productLoanName: props.productLoanName,
            consent: props.consent,
            citizenId: props.citizenId,
            titleName: props.titleName,
            gender: props.gender,
            name: props.name,
            lastName: props.lastName,
            dateOfBirth: props.dateOfBirth,
            telNo: props.telNo,
            email: props.email,
            educationCode: props.educationCode,
            marital: props.marital,
            child: props.child,
            occupationCode: occupationCode,
            occupationCodeDesc: occupationCodeDesc,
            subOccupationCode: subOccupationCode,
            workTimeYear: workTimeYear,
            workTimeMonth: workTimeMonth,
            incomeFromSalary: incomeFromSalary,
            incomeFromBusiness: incomeFromBusiness,
            otherIncome: otherIncome ? otherIncome : 0,
            expressFromBusiness: expressFromBusiness ? expressFromBusiness : 0,
            monthlyExpense: monthlyExpense ? monthlyExpense : 0,
            liabilityExpense: 0
        }
        if (isRegular) {
            if (occupationCode && subOccupationCode) {
                if(incomeFromSalary || incomeFromSalary !== 0){
                    navigate("/register-addr-info", { state: data });
                }else{
                    setIsOpen(true);
                    setMessage("กรุณาระบุอัตราเงินเดือน");
                }
                
            } else {
                setIsOpen(true);
                setMessage("กรุณาระบุข้อมูลอาชีพให้ครบถ้วน");
            }
        } else if (isFreelance) {
            if (occupationCode && subOccupationCode) {

                if(incomeFromBusiness || incomeFromBusiness !== 0){
                    navigate("/register-addr-info", { state: data });
                }else{
                    setIsOpen(true);
                    setMessage("กรุณาระบุรายได้"); 
                }
                
            } else {
                setIsOpen(true);
                setMessage("กรุณาระบุข้อมูลอาชีพให้ครบถ้วน");
            }
        } else {
            setIsOpen(true);
            setMessage("กรุณาระบุข้อมูลให้ครบถ้วน");
        }

    }

    const occupationChange = (e) => {
        e.preventDefault();
        setOccupataionCode(e.target.value);
        const name = occupationData.find(({ code }) => code === e.target.value);
        setOccupationCodeDesc(name.descriptionTh);

        if (e.target.value === "01" || e.target.value === "02"
            || e.target.value === "03" || e.target.value === "04"
            || e.target.value === "09") {
            setIsRegular(true);
            setIsFreelance(false);
        } else {
            setIsFreelance(true);
            setIsRegular(false);
        }

        loadSubOccupation(e.target.value);
    }

    const subOccupationChange = (e) => {
        e.preventDefault();
        setSubOccupationCode(e.target.value);
    }

    const workTimeYearChange = (e) => {
        e.preventDefault();
        let isNumber = validNumber(e.target.value);
        let isLength = validLength(e.target.value, 2);
        setValidWorkTimeYear(isNumber || isLength ? true : false);
        setWorkTimeYear(e.target.value);
    }

    const workTimeMonthChange = (e) => {
        e.preventDefault();
        let isNumber = validNumber(e.target.value);
        let isLength = validLength(e.target.value, 2);
        let isMorthan12 = e.target.value >= 0 && e.target.value <= 12 ? false : true;
        setValidWorkTimeMonth(isNumber || isLength || isMorthan12 ? true : false);
        setWorkTimeMonth(e.target.value);
    }

    const incomeFromSalaryChange = (e) => {
        e.preventDefault();
        let isNumber = validNumber(e.target.value);
        let isLength = validLength(e.target.value, 6);
        setValidIncomeFromSalary(isNumber || isLength ? true : false);
        setIncomeFromSalary(e.target.value);
    }

    const incomeFromBusinessChange = (e) => {
        e.preventDefault();
        let isNumber = validNumber(e.target.value);
        let isLength = validLength(e.target.value, 6);
        setValidIncomeFromBusiness(isNumber || isLength ? true : false);
        setIncomeFromBusiness(e.target.value);
    }

    const otherIncomeChange = (e) => {
        e.preventDefault();
        let isNumber = validNumber(e.target.value);
        let isLength = validLength(e.target.value, 6);
        setValidOtherIncome(isNumber || isLength ? true : false);
        setOtherIncome(e.target.value);
    }

    const expressFromBusinessChange = (e) => {
        e.preventDefault();
        let isNumber = validNumber(e.target.value);
        let isLength = validLength(e.target.value, 6);
        setValidExpressFromBusiness(isNumber || isLength ? true : false);
        setExpressFromBusiness(e.target.value);
    }

    const monthlyExpenseChange = (e) => {
        e.preventDefault();
        let isNumber = validNumber(e.target.value);
        let isLength = validLength(e.target.value, 6);
        setValidMonthlyExpense(isNumber || isLength ? true : false);
        setMonthlyExpense(e.target.value);
    }
    const handleOnClose = (e) => {
        e.preventDefault();
        setIsOpen(false);
        setMessage("");
    }
    const loadOccupation = async () => {
        try {
            const response = await getOccupation();
            if (response.code === '000') {
                // response.data.occupations.splice(0,1);
                const filterOccupationData = response.data.occupations.filter((item) => item.code !== "9999" && item.code !== "00");
                setOccupationData(filterOccupationData.sort((a, b) => (a.descriptionTh > b.descriptionTh ? 1 : -1)));
            }
        } catch (err) {
            console.error(err);

        }
    }

    const loadSubOccupation = async (occupationMainCode) => {
        try {
            const response = await getSubOccupation(occupationMainCode);
            if (response.code === '000') {
                setSubOccupationData(response.data.subOccupations.sort((a, b) => (a.subOccupationCode > b.subOccupationCode ? 1 : -1)));
            }
        } catch (err) {
            console.error(err);

        }
    }
    return (
        <>
            <section className="relative bg-white py-20 px-4" />
            <section className="container mx-auto bg-white py-10 p-10">
                {isOpen ? <DialogCustom action={isOpen} headermsg="แจ้งเตือน" bodyMsg={message} onClose={handleOnClose} /> : null}
                <div className="container">
                    <Typography variant="h6">ข้อมูลการทำงาน (ปัจจุบัน)</Typography>
                    <hr className="mx-auto w-full border-black-700" />
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 py-8">
                    <div>
                        <Typography variant="small" color="gray">
                            อาชีพ / Occupation
                        </Typography>
                        <CustomSelect
                            fullWidth
                            size="small"
                            variant="outlined"
                            color="pink"
                            value={occupationCode}
                            onChange={occupationChange}
                        >
                            <MenuItem value="-">เลือก</MenuItem>
                            {occupationData.map((option) => (
                                <MenuItem key={option.code} value={option.code}>
                                    {option.descriptionTh}
                                </MenuItem>
                            ))}
                        </CustomSelect>
                    </div>
                    <div>
                        <Typography variant="small" color="gray">
                            อาชีพย่อย / Sub Occupation
                        </Typography>
                        <CustomSelect
                            fullWidth
                            size="small"
                            variant="outlined"
                            color="pink"
                            value={subOccupationCode}
                            onChange={subOccupationChange}
                        >
                            <MenuItem value="-">เลือก</MenuItem>
                            {subOccupationData.map((option) => (
                                <MenuItem key={option.subOccupationCode} value={option.subOccupationCode}>
                                    {option.subOccupationTh}
                                </MenuItem>
                            ))}
                        </CustomSelect>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 py-2">
                    <div>
                        <Typography variant="small" color="gray">
                            อายุงาน (ปี)
                        </Typography>
                        <Input
                            type="number"
                            color={validWorkTimeYear ? "red" : "green"}
                            value={workTimeYear}
                            error={validWorkTimeYear}
                            onChange={workTimeYearChange}
                            maxLength={2}
                            max={99}
                            min={0}
                        />
                        {validWorkTimeYear
                            ?
                            <Typography variant="small" color="red">
                                กรุณาระบุอายุงาน (ปี) ให้ถูกต้อง
                            </Typography>
                            : null
                        }
                    </div>
                    <div>
                        <Typography variant="small" color="gray">
                            อายุงาน (เดือน)
                        </Typography>
                        <Input
                            type="number"
                            color={vaildWorkTimeMonth ? "red" : "green"}
                            value={workTimeMonth}
                            error={vaildWorkTimeMonth}
                            onChange={workTimeMonthChange}
                            maxLength={2}
                            max={11}
                            min={0}
                        />
                        {vaildWorkTimeMonth
                            ?
                            <Typography variant="small" color="red">
                                กรุณาระบุอายุงาน (เดือน) ให้ถูกต้อง
                            </Typography>
                            : null
                        }
                    </div>
                </div>
                <div className="container py-8">
                    <Typography variant="h6">ข้อมูลรายได้-รายจ่าย</Typography>
                    <hr className="mx-auto w-full border-black-700" />
                </div>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-2">
                    <div>
                        {isRegular ?
                            <>
                                <Typography variant="small" color="gray">
                                    อัตราเงินเดือน (บาท)
                                </Typography>
                                <Input
                                    type="number"
                                    color={validIncomeFromSalary ? "red" : "green"}
                                    value={incomeFromSalary}
                                    error={validIncomeFromSalary}
                                    onChange={incomeFromSalaryChange}
                                    maxLength={6}
                                />
                                {validIncomeFromSalary
                                    ?
                                    <Typography variant="small" color="red">
                                        กรุณาระบุอัตราเงินเดือนให้ถูกต้อง
                                    </Typography>
                                    : null
                                }
                            </>
                            : null}

                        {isFreelance ?
                            <>
                                <Typography variant="small" color="gray">
                                    รายได้จากการประกอบอาชีพ (บาท)
                                </Typography>
                                <Input
                                    type="number"
                                    color={validIncomeFromBusiness ? "red" : "green"}
                                    value={incomeFromBusiness}
                                    error={validIncomeFromBusiness}
                                    onChange={incomeFromBusinessChange}
                                    maxLength={6}
                                />
                                {validIncomeFromBusiness
                                    ?
                                    <Typography variant="small" color="red">
                                        กรุณาระบุรายได้จากการประกอบอาชีพให้ถูกต้อง
                                    </Typography>
                                    : null
                                }
                            </>
                            : null}


                    </div>
                    <div>
                        {isRegular ?
                            <>
                                <Typography variant="small" color="gray">
                                    รายได้อื่นๆต่อเดือน (บาท)
                                </Typography>
                                <Input
                                    type="number"
                                    color={validOtherIncome ? "red" : "green"}
                                    value={otherIncome}
                                    error={validOtherIncome}
                                    onChange={otherIncomeChange}
                                    maxLength={6}
                                />
                                {validOtherIncome
                                    ?
                                    <Typography variant="small" color="red">
                                        กรุณาระบุรายได้อื่นๆต่อเดือนให้ถูกต้อง
                                    </Typography>
                                    : null
                                }
                            </>
                            : null}

                        {isFreelance ?
                            <>
                                <Typography variant="small" color="gray">
                                    ค่าใช้จ่าย ต้นทุนประกอบธุรกิจ (บาท)
                                </Typography>
                                <Input
                                    type="number"
                                    color={validExpressFromBusiness ? "red" : "green"}
                                    value={expressFromBusiness}
                                    error={validExpressFromBusiness}
                                    onChange={expressFromBusinessChange}
                                    maxLength={6}
                                />
                                {validExpressFromBusiness
                                    ?
                                    <Typography variant="small" color="red">
                                        กรุณาระบุค่าใช้จ่าย ต้นทุนประกอบธุรกิจให้ถูกต้อง
                                    </Typography>
                                    : null
                                }
                            </>
                            : null}


                    </div>
                    <div>
                        <Typography variant="small" color="gray">
                            รายจ่ายทั่วไปต่อเดือน (บาท)
                        </Typography>
                        <Input
                            // type="number"
                            color={validMonthlyExpense ? "red" : "green"}
                            value={monthlyExpense}
                            error={validMonthlyExpense}
                            onChange={monthlyExpenseChange}
                            maxLength={6}
                        />
                        {validMonthlyExpense
                            ?
                            <Typography variant="small" color="red">
                                กรุณาระบุรายจ่ายทั่วไปต่อเดือนให้ถูกต้อง
                            </Typography>
                            : null
                        }
                    </div>
                </div>
                <div className="mx-auto w-full mt-12 lg:w-5/12 grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
                    <div>
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
                                    child: props.child
                            
                                }
                                navigate("/register-person-info", {state: data})
                            }}
                            fullWidth>
                                ย้อนกลับ
                        </Button>                        
                    </div>
                    <div>
                        <Button
                            id="nextRegisAddrInfoBtn"
                            className="mt-8 rounded-full"
                            color="pink"
                            size="lg"
                            onClick={handleOnClickToRegisterAddrInfo}
                            fullWidth
                            disabled={isFreelance ? (validWorkTimeYear || vaildWorkTimeMonth ||
                                validIncomeFromBusiness ||
                                validOtherIncome || validExpressFromBusiness ||
                                validMonthlyExpense ? true : false) : (validWorkTimeYear || vaildWorkTimeMonth ||
                                    validIncomeFromSalary ||
                                    validOtherIncome || validExpressFromBusiness ||
                                    validMonthlyExpense ? true : false)}
                        >
                            {'ถัดไป >'}
                        </Button>                        
                    </div>

                </div>
            </section>

        </>
    );
}

export default RegisterWorkInfo;
