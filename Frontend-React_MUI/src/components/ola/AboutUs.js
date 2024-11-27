import React from 'react';
import UserGuide from '../../components/ola/UserGuide';
import imgBanner from '../../assets/images/ola/aboutUs/introduction_ola_mini.png';
import BoxColorSubject from '../ola-custom/BoxColorSubject';
import { Box, Divider, Typography } from '@mui/material';
function AboutUs() {
  return (
    <>
      <Box sx={{ textAlign: 'center' }}>
        <img
          src={imgBanner}
          alt="img"
          width="100%"
          style={{ borderRadius: '2.5rem 2.5rem 0rem 0rem' }}
        />
      </Box>

      <Box
        sx={{ textAlign: 'center', border: '1px solid #DBDBDB', borderRadius: '1rem', p: '2rem' }}
      >
        <Box sx={BoxColorSubject}></Box>
        <Typography variant="h4" fontWeight="700" textAlign="left">
          OLA คืออะไร?
        </Typography>
        <Typography variant="h6" textAlign="left" mb={2} data-testid="text-system-name">
          OLA Online Lending Advisor by GSB
        </Typography>
        <Divider light />
        <Typography mt={2} variant="body2" textAlign="justify">
          &nbsp;&nbsp;OLA (โอล่า) ย่อมาจาก Online Lending Advisor เป็นระบบแนะนำสินเชื่อธนาคารออมสิน
          ที่สามารถแนะนำผลิตภัณฑ์สินเชื่อผ่านเว็บไซต์ ได้ตลอด 24 ชั่วโมง ไม่มีเวลาปิดทำการ
          ไม่ต้องเดินทางไปธนาคาร ไม่ต้องรอคิวให้ยุ่งยาก
        </Typography>
        <Typography variant="body2" textAlign="justify">
          &nbsp;&nbsp;ก่อนที่จะทำธุรกรรมผ่านระบบ OLA บนอุปกรณ์คอมพิวเตอร์ส่วนบุคคล (Personal
          Computer/Desktop) แท็บเลต (Tablet) หรือมือถือ (Mobile) ได้นั้น ผู้ใช้งานต้องมี Wifi หรือ
          4G, 5G สำหรับเชื่อมต่ออินเทอร์เน็ตเสียก่อน โดย OLA เป็นระบบที่ถูกออกแบบมาให้ใช้งานง่าย
          และมีฟังก์ชัน ครอบคลุมการแนะนำผลิตภัณฑ์สินเชื่อธนาคารออมสินที่หลากหลาย
        </Typography>
      </Box>

      <Box
        sx={{
          textAlign: 'center',
          border: '1px solid #DBDBDB',
          borderRadius: '1rem',
          p: '2rem',
          my: '2rem',
        }}
      >
        <Box sx={BoxColorSubject}></Box>
        <Typography variant="h4" fontWeight="700" textAlign="left">
          ช่วยให้การเลือกสินเชื่อเป็นเรื่องง่ายๆ
        </Typography>
        <Typography variant="h6" textAlign="left" mb={2}>
          OLA Online Lending Advisor by GSB
        </Typography>
        <Divider light />
        <UserGuide />
        <Typography mt={2} variant="body2" textAlign="left" data-testid="text-step-1">
          1.เลือกวงเงินที่ต้องการขอสินเชื่อ แล้วคลิกปุ่ม "สนใจ"
        </Typography>
        <Typography variant="body2" textAlign="left">
          2.กรอกข้อมูลทางการเงินเบื้องต้น เพื่อค้นหาสินเชื่อที่เหมาะสม เมื่อกรอกข้อมูลเรียบร้อยแล้ว
          ให้คลิกปุ่ม "คลิกเพื่อดูสินเชื่อที่เหมาะกับคุณ" โดยระบบจะแสดงข้อมูลสินเชื่อที่เหมาะสมกับลูกค้าที่สุด ให้ลูกค้าพิจารณาเปรียบเทียบข้อมูลต่างๆ เช่น
          วงเงินกู้สูงสุด ค่างวดรายเดือน อัตราดอกเบี้ย และระยะเวลาผ่อนชำระ
        </Typography>
        <Typography variant="body2" textAlign="left">
          3.เมื่อลูกค้าสนใจผลิตภัณฑ์ดังกล่าว สามารถคลิกปุ่ม "ดูข้อมูลเพิ่มเติม"
          เพื่อดูรายละเอียดอื่นๆ ของสินเชื่อ เพื่อช่วยในการตัดสินใจ หากสนใจให้คลิกปุ่ม
          "คลิกเพื่อตรวจสอบคุณสมบัติเพิ่มเติม"
        </Typography>
        <Typography variant="body2" textAlign="left">
          4.กรอกข้อมูลส่วนตัว สำหรับให้ธนาคารตรวจสอบคุณสมบัติเพิ่มเติม เมื่อกรอกข้อมูลเรียบร้อยแล้ว
          ให้คลิกปุ่ม "ตรวจสอบคุณสมบัติเพิ่มเติม"
        </Typography>
        <Typography variant="body2" textAlign="left">
          5.ระบบจะแสดงผลการตรวจสอบคุณสมบัติเบื้องต้น และแนะนำเอกสารต่างๆ ที่ลูกค้าต้องเตรียม
        </Typography>
      </Box>
    </>
  );
}
export default AboutUs;
