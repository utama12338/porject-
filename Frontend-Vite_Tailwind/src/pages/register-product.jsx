import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    Button,
    Typography,
} from "@material-tailwind/react";
import MenuItem from '@mui/material/MenuItem';
import CustomSelect from "@/widgets/select/CustomSelect";
import { AccordionCustom } from "@/widgets/accordion";
import { DialogCustom } from "@/widgets/dialog";
import { getLonaObjective, getLoanProduct, getRequsetLoanAmount } from "@/services";
export function RegisterProdcut() {

    const navigate = useNavigate();
    const location = useLocation();
    const props = location.state;
    
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [reqAmtCust, setReqAmtCust] = useState(props != null ? props.requestAmount : "-");
    const [objCust, setObjCust] = useState(props != null ? props.opjectiveLoan : "-");
    const [prdCust, setPrdCust] = useState(props != null ? props.productLoan : "-");
    const [prdCustName, setPrdCustName] = useState(props != null ? props.productLoanName : "");
    const [prdDetail, setPrdDetail] = useState({});
    const [prdMaxAge, setPrdMaxAge] = useState(props != null ? props.productLoanMaxAge : 0);
    const [prdMinAge, setPrdMinAge] = useState(props != null ? props.productLoanMinAge : 0);

    const [requestAmountData, setRequestAmountData] = useState([]);
    const [loanObjectiveData, setLoanObjectiveData] = useState([]);
    const [loanProductData, setLoanProductData] = useState([]);


    const loadLoanObjective = async () => {
        try {
            const response = await getLonaObjective();
            if (response.code === '000') {
                setLoanObjectiveData(response.data.loanObjectives);
            }
        } catch (err) {
            console.error(err);

        }
    }

    const loadLoanProduct = async (loanObjectiveCode) => {
        try {
            const response = await getLoanProduct(loanObjectiveCode);
            if (response.code === '000') {
                setLoanProductData(response.data.loanProducts);
            }
        } catch (err) {
            console.error(err);

        }
    }

    const requestAmount = async (marketCode) => {
        try {
            const response = await getRequsetLoanAmount(marketCode);
            if (response.code === '000') {
                setRequestAmountData(response.data.loanSizes);
            }
        } catch (err) {
            console.error(err);

        }
    }

    const handleOnClickToConsent = (e) => {
        setIsOpen(false);
        setMessage("");
        e.preventDefault();

        if (objCust === "-") {
            setIsOpen(true);
            setMessage("กรุณาระบุข้อมูลวัตถุประสงค์การกู้");
        }else if (prdCust === "-") {
            console.log(prdCust);
            setIsOpen(true);
            setMessage("กรุณาระบุข้อมูลสินเชื่อที่สนใจสมัคร");
        }else if (reqAmtCust === "-") {
            setIsOpen(true);
            setMessage("กรุณาระบุข้อมูลวงเงินที่ต้องการ");
        }else{

            const stateData = {
                requestAmount: reqAmtCust,
                opjectiveLoan: objCust,
                productLoan: prdCust,
                productLoanName: prdCustName,
                productLoanMaxAge: prdMaxAge,
                productLoanMinAge: prdMinAge
            }
            navigate("/consent", { state: stateData });
        }
    }

    const handleOnClose = (e) => {
        e.preventDefault();
        setIsOpen(false);
        setMessage("");
    }

    useEffect(() => {
        loadLoanObjective();
    }, []);

    return (
        <>
            <section className="relative bg-white py-20 px-4" />
            <section className="relative block h-[50vh] ">
                <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/background-2.jpg')] bg-cover bg-center scale-105" />
            </section>
            <section className="container mx-auto bg-white py-10 p-10">
                {isOpen ? <DialogCustom action={isOpen} headermsg="แจ้งเตือน" bodyMsg={message} onClose={handleOnClose} /> : null}
                <div className="mt-2 mx-auto w-full ">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3">
                        <div>
                            <Typography variant="small" color="gray">
                                วัตถุประสงค์การกู้
                            </Typography>
                            <CustomSelect
                                fullWidth
                                variant="outlined"
                                size="small"
                                color="pink"
                                value={objCust}
                                onChange={(e) => {
                                    e.preventDefault();
                                    setObjCust(e.target.value)

                                    setPrdCustName("");
                                    setPrdMaxAge(0);
                                    setPrdMinAge(0);
                                    setPrdDetail({});
                                    setPrdCust("-")
                                    setLoanProductData([]);

                                    setReqAmtCust("-");
                                    setRequestAmountData([]);

                                    loadLoanProduct(e.target.value);
                                    
                                }}
                            >
                                <MenuItem key="" value="-">เลือก</MenuItem>
                                {loanObjectiveData.map((option) => (
                                    <MenuItem
                                        key={option.loanObjectiveCode}
                                        value={option.loanObjectiveCode}
                                    >
                                        {option.loanObjectiveDesc}
                                    </MenuItem>
                                ))}

                            </CustomSelect>
                        </div>
                        <div>
                            <Typography variant="small" color="gray">
                                สินเชื่อที่สนใจสมัคร
                            </Typography>
                            <CustomSelect
                                fullWidth
                                variant="outlined"
                                size="small"
                                color="pink"
                                value={prdCust}
                                onChange={(e) => {
                                    e.preventDefault();
                                    setPrdCust(e.target.value);

                                    setPrdCustName("");
                                    setPrdMaxAge(0);
                                    setPrdMinAge(0);
                                    setPrdDetail({});
                                    setReqAmtCust("-");
                                    setRequestAmountData([]);

                                    requestAmount(e.target.value.substring(11, e.target.value.length));

                                    const obj = loanProductData.find(({ marketCode }) => marketCode === e.target.value.substring(11, e.target.value.length));
                                    setPrdCustName(obj.marketCodeDescription);
                                    setPrdMaxAge(obj.maxAge);
                                    setPrdMinAge(obj.minAge);
                                    setPrdDetail(obj);

                                }}
                            >
                                <MenuItem key="" value="-">เลือก</MenuItem>
                                {loanProductData.map((option) => (
                                    <MenuItem
                                        key={option.groupCode + option.typeCode + option.subTypeCode + option.marketCode}
                                        value={option.groupCode + option.typeCode + option.subTypeCode + option.marketCode}
                                    >
                                        {option.marketCodeDescription}
                                    </MenuItem>
                                ))}
                            </CustomSelect>
                        </div>
                        <div>
                            <Typography variant="small" color="gray">
                                วงเงินที่ต้องการ
                            </Typography>
                            <CustomSelect
                                fullWidth
                                variant="outlined"
                                size="small"
                                color="pink"
                                value={reqAmtCust}
                                onChange={(e) => {
                                    e.preventDefault();
                                    setReqAmtCust(e.target.value)
                                }}

                            >
                                <MenuItem key="" value="-">เลือก</MenuItem>
                                {requestAmountData.map((option) => (
                                    <MenuItem
                                        key={option.loanSizeCode}
                                        value={option.loanSizeCode}
                                    >
                                        {option.loanSizeDescription}
                                    </MenuItem>
                                ))}
                            </CustomSelect>
                        </div>
                    </div>
                </div>
            </section>
            <section className="container mx-auto bg-white py-10 p-10" >
                <form className="mt-2 mx-auto w-full ">
                    <div className="grid grid-cols-1 gap-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
                        {prdDetail ?
                            <AccordionCustom
                                key={prdDetail.marketCode}
                                property={prdDetail.productProperty}
                                objective={prdDetail.productLoanObjective}
                                amount={prdDetail.productLoanAmount}
                                peroid={prdDetail.productPeriod}
                                interest={prdDetail.productInterest}
                                guarantee={prdDetail.productGuarantee}
                            />
                            : null}
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
                            onClick={() => navigate("/home")}
                            fullWidth>
                                ย้อนกลับ
                        </Button>
                    </div>                    
                    <div>
                        <Button
                            id="nextRegisWorkInfoBtn"
                            className="mt-8 rounded-full"
                            variant="filled"
                            color="pink"
                            size="lg"
                            onClick={handleOnClickToConsent}
                            fullWidth>
                            {'ถัดไป >'}
                        </Button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default RegisterProdcut;