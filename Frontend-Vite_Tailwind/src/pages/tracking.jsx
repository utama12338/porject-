import React from "react";
import {
    Input,
    Typography,
    Button,
    Card
} from "@material-tailwind/react";
import { NavbarLoa } from "@/widgets/layout";
import { TimelineTracking } from "@/widgets/timeline";
import { DialogCustom } from "@/widgets/dialog";
import {
    validIdCard,
    validMobileNo,
    monthTh,
    yearTh
} from "@/utils";
import { cancelRegister, trackingRegister } from "@/services";
export function Tracking() {
    const TABLE_HEAD = ["ประเภทสินเชื่อ", "วันที่สมัครสินเชื่อ", "วงเงินกู้", "สาขาที่ติดต่อ", "วันที่นัดหมาย", "สถานะ", "ดูรายละเอียด"];
    const [tableBody, setTableBody] = React.useState([]);
    const [citizenId, setCitizenId] = React.useState("");
    const [telNo, setTelNo] = React.useState("");
    const [isValidCitizenId, setIsValidCitizenId] = React.useState(false);
    const [isValidTelNo, setIsValidTelNo] = React.useState(false);
    const [citizenIdHidden, setCitizenIdHidden] = React.useState("");
    const [appNo, setAppNo] = React.useState("");
    const [product, setProduct] = React.useState("");
    const [registerDate, setRegisterDate] = React.useState("");
    const [loanAmount, setLoanAmount] = React.useState("");
    const [branch, setBranch] = React.useState("");
    const [branchContract, setBranchContract] = React.useState("");
    const [status, setStatus] = React.useState("");
    const [statusCode, setStatusCode] = React.useState("");
    const [updateDate, setUpdateDate] = React.useState("");
    const [approveDate, setApproveDate] = React.useState("");
    const [contractDate, setContractDate] = React.useState("");
    const [isOpen, setIsOpen] = React.useState(false);
    const [messageHeader, setMessageHeader] = React.useState("");
    const [message, setMessage] = React.useState("");

    const [classNameSec1, setClassNameSec1] = React.useState("container mx-auto bg-white px-10 py-2 p-10");

    const [classNameSec2, setClassNameSec2] = React.useState("container mx-auto bg-white px-10 py-2 p-10 hidden");

    const [classNameSec3, setClassNameSec3] = React.useState("container mx-auto bg-white px-10 py-2 p-10 hidden");

    const handleTracking = async () => {
        try {
            const payload = {
                citizenId: citizenId,
                telNo: telNo
            }
            const response = await trackingRegister(payload);
            if (response.code === '0') {
                setTableBody(response.data.tracking);
                setCitizenIdHidden(response.data.tracking[0].citizenIdHidden);
                setClassNameSec1("container mx-auto bg-white px-10 py-2 p-10 hidden");
                setClassNameSec2("container mx-auto bg-white px-10 py-2 p-10");
            } else {
                console.debug(response.description);
                setMessageHeader("Warning");
                setMessage("ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบเลขบัตรประชาชนหรือเบอร์โทรศัพท์มือถืออีกครั้ง");
                setIsOpen(true);
            }
        } catch (err) {
            console.error(err.message);
            setMessageHeader("Error");
            setMessage("ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบเลขบัตรประชาชนหรือเบอร์โทรศัพท์มือถืออีกครั้ง");
            setIsOpen(true);
        }

    }
    const handleOnClickCancelRegister = async () => {
        try {
            const payload = {
                appNo: appNo
            }
            const response = await cancelRegister(payload);
            if (response.code === '0') {
                setMessageHeader("Success");
                setMessage("ยกเลิกการสมัครสินเชื่อสำเร็จ");
                setCitizenId("");
                setTelNo("");
                setIsOpen(true);
                setClassNameSec1("container mx-auto bg-white px-10 py-2 p-10");
                setClassNameSec2("container mx-auto bg-white px-10 py-2 p-10 hidden");
                setClassNameSec3("container mx-auto bg-white px-10 py-2 p-10 hidden");
            } else {
                console.debug(response.description);
                setMessageHeader("Warning");
                setMessage("ไม่สามารถยกเลิกการสมัครได้ ");
                setIsOpen(true);
            }
        } catch (err) {
            console.error(err.message);
            setMessageHeader("Error");
            setMessage("ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบเลขบัตรประชาชนหรือเบอร์โทรศัพท์มือถืออีกครั้ง");
            setIsOpen(true);
        }

    }
    const handleChangeCitizenId = (e) => {
        e.preventDefault();
        setIsValidCitizenId(validIdCard(e.target.value));
        setCitizenId(e.target.value);
    }
    const handleChangeTelNo = (e) => {
        e.preventDefault();
        setIsValidTelNo(validMobileNo(e.target.value));
        setTelNo(e.target.value);
    }

    const handleShowDetails = (option) => {
        setAppNo(option.appNo);
        setProduct(option.productName);
        setRegisterDate(option.registerDate);
        setLoanAmount(option.loanAmount);
        setBranch(option.branchContractName);
        setBranchContract(option.branchContractDate);
        setStatus(option.statusCustomer);
        setStatusCode(option.statusCode);
        setUpdateDate(option.updateDate);
        setApproveDate(option.approveDate);
        setClassNameSec3("container mx-auto bg-white px-10 py-2 p-10");
    }
    const handleOnClose = (e) => {
        e.preventDefault();
        setIsOpen(false);
        setMessage("");
    }
    return (
        <>
            <section className="container mx-auto bg-white py-6">
                <NavbarLoa header={"ติดตามสถานะการขอสินเชื่อ / ยกเลิกการขอสินเชื่อ"} subHeader={"Welcome to GSB Loan"} />
            </section>
            <section className={classNameSec1}>
                {isOpen ? <DialogCustom action={isOpen} headermsg={messageHeader} bodyMsg={message} onClose={handleOnClose} /> : null}
                <div className="container">
                    <Typography variant="h6">กรุณากรอกข้อมูล</Typography>
                    <hr className="mx-auto w-full border-black-700" />
                </div>
                <form className="mt-12 mx-auto w-full ">
                    <div className="my-2 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-2">
                        <div>
                            <Typography variant="small" color="gray">
                                เลขบัตรประชาชน
                            </Typography>
                            <Input
                                color={isValidCitizenId ? "red" : "green"}
                                value={citizenId}
                                error={isValidCitizenId}
                                onChange={handleChangeCitizenId}
                                maxLength={13}
                            />
                            {isValidCitizenId
                                ?
                                <Typography variant="small" color="red">
                                    กรุณาระบุเลขบัตรประชาชนให้ครบถ้วน (13 หลัก)
                                </Typography>
                                : null
                            }
                        </div>
                        <div>
                            <Typography variant="small" color="gray">
                                เบอร์มือถือที่ใช้สมัคร
                            </Typography>
                            <Input
                                color={isValidTelNo ? "red" : "green"}
                                value={telNo}
                                error={isValidTelNo}
                                onChange={handleChangeTelNo}
                                maxLength={10}
                            />
                            {isValidTelNo
                                ?
                                <Typography variant="small" color="red">
                                    กรุณาระบุเบอร์มือถือให้ถูกต้อง (ครบ 10 หลัก)
                                </Typography>
                                : null
                            }
                        </div>
                    </div>
                </form>
                <div className="mx-auto w-full mt-6 lg:w-5/12">
                    <Button
                        className="mt-2 rounded-full"
                        color="pink"
                        size="lg"
                        fullWidth
                        onClick={handleTracking}>
                        ตรวจสอบสถานะการขอสินเชื่อ
                    </Button>
                </div>
            </section>
            <section className={classNameSec2}>
                <div className="container mx-auto flex items-center justify-between">
                    <div className="text-center">
                        <Typography variant="h6">สถานะการสมัครใช้บริการสินเชื่อ</Typography>   
                    </div>
                    <div className="text-center">
                        <Typography variant="h6">{citizenIdHidden}</Typography>     
                    </div>
                    
                </div>                    
                <hr className="mx-auto w-full border-black-700" />
                <br/>

                <Card className="h-full w-full overflow-scroll">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {tableBody.map((option, index) => {
                                const isLast = index === tableBody.length - 1;
                                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={option.appNo}>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {option.productName}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {option.registerDate.substring(8, 11) + ' ' + monthTh(option.registerDate.substring(5, 7)) + ' ' + yearTh(option.registerDate.substring(0, 4))}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {option.loanAmount}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {option.branchContractName}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {option.branchContractDate.substring(8, 11) + ' ' + monthTh(option.branchContractDate.substring(5, 7)) + ' ' + yearTh(option.branchContractDate.substring(0, 4))}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {option.statusCustomer}
                                            </Typography>
                                        </td>
                                        <td className={`${classes} bg-blue-gray-50/50`}>
                                            <Button
                                                className="mt-2 rounded-full"
                                                color="pink"
                                                size="sm"
                                                fullWidth
                                                onClick={() => handleShowDetails(option)}>
                                                View Detail
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </Card>
            </section>
            <section className={classNameSec3}>
                <form className="mt-12 mx-auto w-full ">
                    <div className="my-2 grid grid-cols-4 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                        <div>
                            <Typography variant="small" color="pink">
                                สินเชื่อ
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="small" color="gray">
                                {product}
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="small" color="pink">
                                วันที่สมัคร
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="small" color="gray">
                                {registerDate.substring(8, 11) + ' ' + monthTh(registerDate.substring(5, 7)) + ' ' + yearTh(registerDate.substring(0, 4))}
                            </Typography>
                        </div>

                        <div>
                            <Typography variant="small" color="pink">
                                วงเงินกู้
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="small" color="gray">
                                {loanAmount}
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="small" color="pink">
                                สถานะ
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="small" color="gray">
                                {status}
                            </Typography>
                        </div>

                        <div>
                            <Typography variant="small" color="pink">
                                สาขาที่ติดต่อ
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="small" color="gray">
                                {branch}
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="small" color="pink">
                                วันที่นัดหมาย
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="small" color="gray">
                                {branchContract.substring(8, 11) + ' ' + monthTh(branchContract.substring(5, 7)) + ' ' + yearTh(branchContract.substring(0, 4))}
                            </Typography>
                        </div>
                    </div>
                </form>
                <div className="mx-auto w-full mt-12 lg:w-4/12 py-12">
                    <TimelineTracking
                        status01={statusCode === "01" ? true : false} desc01={statusCode === "01" ? registerDate.substring(8, 11) + ' ' + monthTh(registerDate.substring(5, 7)) + ' ' + yearTh(registerDate.substring(0, 4)) : ""}
                        status02={statusCode === "02" ? true : false} desc02={statusCode === "02" ? approveDate.substring(8, 11) + ' ' + monthTh(approveDate.substring(5, 7)) + ' ' + yearTh(approveDate.substring(0, 4)) : ""}
                        status03={statusCode === "03" ? true : false} desc03={statusCode === "03" ? updateDate.substring(8, 11) + ' ' + monthTh(updateDate.substring(5, 7)) + ' ' + yearTh(updateDate.substring(0, 4)) : ""}
                        status04={statusCode === "04" ? true : false} desc04={statusCode === "04" ? updateDate.substring(8, 11) + ' ' + monthTh(updateDate.substring(5, 7)) + ' ' + yearTh(updateDate.substring(0, 4)) : ""}
                        status05={statusCode === "05" ? true : false} desc05={statusCode === "05" ? updateDate.substring(8, 11) + ' ' + monthTh(updateDate.substring(5, 7)) + ' ' + yearTh(updateDate.substring(0, 4)) : ""}
                        status06={statusCode === "06" ? true : false} desc06={statusCode === "06" ? updateDate.substring(8, 11) + ' ' + monthTh(updateDate.substring(5, 7)) + ' ' + yearTh(updateDate.substring(0, 4)) : ""}
                        status07={statusCode === "07" ? true : false} desc07={statusCode === "07" ? contractDate.substring(8, 11) + ' ' + monthTh(contractDate.substring(5, 7)) + ' ' + yearTh(contractDate.substring(0, 4)) : ""}
                        status08={statusCode === "08" ? true : false} desc08={statusCode === "08" ? "กรุณาติดต่อสาขา" : ""}
                        status09={statusCode === "09" ? true : false} desc09={""}
                    />
                </div>

                {statusCode === "01" || statusCode === "04" || statusCode === "08" ?
                    <>
                        <div className="container mx-auto w-full text-center py-2">
                            <Typography variant="paragraph" color="black" className="font-bold">หากต้องการยกเลิกการสมัครสินเชื่อ กรุณาคลิกที่ปุ่มด้านล่าง</Typography>
                        </div>
                        <div className="mx-auto w-full mt-6 lg:w-5/12">
                            <Button
                                id="cancelRegister"
                                className="mt-2 rounded-full"
                                color="gray"
                                size="lg"
                                onClick={handleOnClickCancelRegister}
                                fullWidth>
                                ยกเลิกสมัครสินเชื่อ
                            </Button>
                        </div>
                    </>
                    : null}

            </section>
        </>
    )
}
export default Tracking;