import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    Typography,
    Button,
    Checkbox
} from "@material-tailwind/react";
import { NavbarLoa } from "@/widgets/layout";
import { DialogCustom } from "@/widgets/dialog";

export function Consent() {
    const [isConsent, setIsConsent] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const props = location.state;

    const handleOnChangeIsConsent = (e) => {
        if (e.target.checked) {
            setIsConsent(e.target.checked);
            setIsOpen(false);
            setMessage("");
        }
    }
    const handleOnClickToRegisterPersonInfo = (e) => {
        e.preventDefault();
        if (isConsent) {
            setIsOpen(false);
            setMessage("");
            const data = {
                requestAmount: props.requestAmount,
                opjectiveLoan: props.opjectiveLoan,
                productLoan: props.productLoan,
                productLoanName: props.productLoanName,
                productLoanMaxAge: props.productLoanMaxAge,
                productLoanMinAge: props.productLoanMinAge,
                consent: isConsent,
                citizenId: null,
                titleName: null,
                name: null,
                lastName: null,
                dateOfBirth: null,
                telNo: null,
                email: null,
                educationCode: null,
                marital: null,
                child: null
            }
            navigate("/register-person-info", { state: data });
        } else {
            setIsOpen(true);
            setMessage("กรุณาตกลงยอมรับข้อกำหนดและเงื่อนไขดังกล่าว");
            console.debug(isOpen);
            console.debug(message);
        }
    }

    const handleOnClose = (e) => {
        e.preventDefault();
        setIsOpen(false);
        setMessage("");
    }
    return (
        <>
            <section className="relative block h-[50vh]">
                <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/background-1.jpg')] bg-cover bg-center scale-105" />
            </section>
            <section className="container mx-auto bg-white py-6">
                <NavbarLoa />
            </section>

            <section className="container mx-auto  bg-white py-8 px-10">
                <Typography variant="h5" color="pink">การใช้หรือเปิดเผยข้อมูลส่วนบุคคล</Typography>
                <Typography variant="paragraph" color="grey" className="text-justify">
                    &nbsp;&nbsp;&nbsp;&nbsp;ท่านสามารถตรวจสอบประกาศธนาคารออมสิน เรื่อง นโยบายคุ้มครองข้อมูลส่วนบุคคล (Personal Data Protection Policy) ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ.2562 และหนังสือแจ้งการประมวลผลข้อมูลส่วนบุคคลของธนาคารออมสิน ภายใต้พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ.2562 (Privacy Notice) ได้ที่ <a href="https://www.gsb.or.th/other/privacy-notice/" target="_blank">https://www.gsb.or.th/other/privacy-notice/</a>
                </Typography>
            </section>
            <section className="container mx-auto  bg-white py-8 px-10">
                <Typography variant="h5" color="pink">คำรับรองและการยอมรับข้อตกลงและเงื่อนไข</Typography>
                <Typography variant="paragraph" color="grey" className="text-justify">
                    &nbsp;&nbsp;&nbsp;&nbsp;ข้าพเจ้าขอรับรองว่าข้อมูล รายละเอียด หรือข้อเท็จจริง และหลักฐานใด ๆ ที่ข้าพเจ้าได้ให้ไว้ในการลงทะเบียน หรือที่ข้าพเจ้ามอบให้แก่ธนาคารทั้งหมด เพื่อการขอสินเชื่อ หรือเพื่อประกอบการพิจารณาอนุมัติสินเชื่อ นั้น
                    ถูกต้องและเป็นจริงทุกประการ ข้าพเจ้าตกลงให้ธนาคารซึ่งเป็นผู้ให้บริการสินเชื่อ จัดเก็บและประมวลผลข้อมูลส่วนบุคคลที่ข้าพเจ้าได้ให้ไว้กับธนาคาร เพื่อใช้ในการลงทะเบียนขออนุมัติวงเงินสินเชื่อ
                    ข้าพเจ้ารับทราบว่าการนำเข้าสู่ระบบคอมพิวเตอร์ซึ่งข้อมูลอันเป็นเท็จเป็นการกระทำความผิดตามกฎหมาย หากข้อมูลดังกล่าวไม่ถูกต้องตรงตามความเป็นจริง ข้าพเจ้าตกลงยินยอมให้ธนาคาร ดำเนินการระงับการจ่ายเงิน
                    หรือยินยอมคืนเงินที่ได้รับพร้อมดอกเบี้ย แล้วแต่กรณี ข้าพเจ้ายินยอมให้ธนาคารตรวจสอบข้อมูลและรายละเอียดที่ให้ไว้แก่ธนาคารได้ตามที่ธนาคารเห็นสมควร ทั้งนี้ ไม่ว่าก่อนหรือภายหลังการอนุมัติสินเชื่อก็ตาม
                    กรณีที่ข้าพเจ้าได้รับเงินกู้แล้ว หากข้าพเจ้าไม่มีคุณสมบัติ หรือผิดหลักเกณฑ์ เงื่อนไขของธนาคาร หรือผิดคำรับรองที่ให้ไว้ ข้าพเจ้ายินยอมให้ถือเป็นเหตุผิดสัญญา ที่ธนาคารมีสิทธิเรียกให้ข้าพเจ้าชำระหนี้ทั้งหมดคืนพร้อมดอกเบี้ยที่เกิดขึ้นได้
                    ภายในระยะเวลาและ ตามวิธีการที่ธนาคารกำหนด
                </Typography>
            </section>
            <section className="container mx-auto  bg-white py-2 px-6">
                {isOpen ? <DialogCustom action={isOpen} headermsg="แจ้งเตือน" bodyMsg={message} onClose={handleOnClose} /> : null}
                <Checkbox
                    id="isConsent"
                    color="pink"
                    onChange={handleOnChangeIsConsent}
                    defaultValue={isConsent}
                    label={
                        <Typography color="blue-gray" className="flex font-bold">
                            ข้าพเจ้าได้อ่านและเข้าใจข้อกำหนดและเงื่อนไขทั้งหมดดังกล่าวข้างต้นแล้ว และโดยการกดลงทะเบียนด้านล่างนี้ ให้ถือเป็นการแสดงเจตนาตกลงยอมรับข้อกำหนดและเงื่อนไขดังกล่าวของข้าพเจ้า
                        </Typography>
                    }
                />
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
                            id="nextBtn"
                            className="mt-8 rounded-full"
                            variant="filled"
                            color="pink"
                            size="lg"
                            fullWidth
                            onClick={handleOnClickToRegisterPersonInfo}>
                            {'ถัดไป >'}
                        </Button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Consent;