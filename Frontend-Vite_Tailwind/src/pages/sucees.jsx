import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Typography, Chip, Button } from "@material-tailwind/react";
import { TimelineTracking } from "@/widgets/timeline";
import { monthTh, yearTh  } from "@/utils";
import dayjs from "dayjs";
export function Success() {
    const dateNow = dayjs().format('DD/MM/YYYY');
    const navigate = useNavigate();
    const location = useLocation();
    const props = location.state;
    const handleOnClick = () => {
        navigate("/home");
    }
    return (
        <>
            <section className="relative bg-white py-20 px-4" />
            <section className="container mx-auto  bg-white px-10">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 py-2">
                    <div>
                        <Typography variant="lead" color="grey">
                            ธนาคารได้ตรวจสอบคุณสมบัติของท่านเบื้องต้นเรียบร้อยแล้ว
                        </Typography>
                        <br />
                        <Chip variant="gradient" color="green" value="ผ่านการตรวจสอบคุณสมบัติเบื้องต้น" className="rounded-full" />
                        <br />
                        <Typography variant="paragraph" color="grey">
                            การสมัคร {props.productName} สำเร็จ วันที่ {dateNow.substring(0, 2) + ' ' + monthTh(dateNow.substring(3, 5)) + ' ' + yearTh(dateNow.substring(6, 10))}
                        </Typography>
                        <Typography variant="้h4" color="pink">
                            <br />
                            <br />
                            ** ให้ท่านไปติดต่อสาขา ดำเนินการยื่นเอกสารขอกู้ได้ที่
                        </Typography>
                        <Typography variant="paragraph" color="grey">
                            <br />
                            <br />
                            ธนาคารออมสินสาขา: {props.branchName}
                            <br />
                            วันที่ติดต่อสาขา: {props.branchContract}
                            <br />
                            <br />
                            เอกสารประกอบการยื่นกู้
                            <br />
                            <br />
                            1. บัตรประชาชน
                            <br />
                            2. สลิปเงินเดือน หรือ หลักฐานแสดงเงินได้
                            <br />

                        </Typography>
                    </div>
                    <div>
                        <TimelineTracking
                            status01={true} desc01={dateNow.substring(0, 2) + ' ' + monthTh(dateNow.substring(3, 5)) + ' ' + yearTh(dateNow.substring(6, 10))}
                            status02={false} desc02={""}
                            status03={false} desc03={""}
                            status04={false} desc04={""}
                            status05={false} desc05={""}
                            status06={false} desc06={""}
                            status07={false} desc07={""}
                            status08={false} desc08={""}
                            status09={false} desc09={""}
                        />
                    </div>
                </div>
                <div className="mx-auto w-full mt-6 lg:w-5/12">
                    <Button
                        id="nextBtn"
                        className="mt-2 rounded-full"
                        color="pink"
                        size="lg"
                        fullWidth
                        onClick={handleOnClick}>
                        กลับไปหน้าลงทะเบียน
                    </Button>
                </div>

            </section>
        </>
    )
}

export default Success;