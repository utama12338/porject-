import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Typography, Chip, Button} from "@material-tailwind/react";
export function Failed() {
    const navigate = useNavigate();
    const location = useLocation();
    const props = location.state;
    const handleOnClick = () => {
        navigate("/home");
    }
    return (
        <>
            <section className="relative bg-white py-20 px-4" />
            <section className="container mx-auto bg-white px-10">
                {/* <Typography variant="lead" color="grey">
                    ธนาคารได้ตรวจสอบคุณสมบัติของท่านเบื้องต้นเรียบร้อยแล้ว 
                </Typography> */}
                <Typography variant="lead" color="grey">
                {props != null ? props.messageHeaders : ""}
                </Typography>                
                <br/>
                {/* <Chip variant="gradient" color="gray" value="ขออภัย ไม่สามารถสมัครสินเชื่อได้ เนื่องจากคุณสมบัติของท่านไม่ตรงตามหลักเกณฑ์ของธนาคาร" className="rounded-full" /> */}
                <Chip variant="gradient" color="gray" value={props != null ? props.messageDetails : ""} className="rounded-full" />
                <br/>
                <Typography variant="paragraph" color="grey">
                    ขอบคุณที่ท่านสนใจสินเชื่อของธนาคารออมสิน
                    <br />
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
                </Typography>
            </section>        
        </>
    )
}
export default Failed;