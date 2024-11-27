import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material';
function ConsentDialog() {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button color="primary" onClick={handleClickOpen}>
        เพิ่มเติม
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title" variant="h3">
          ข้อกำหนดและเงื่อนไขการใช้งานระบบแนะนำสินเชื่อธนาคารออมสิน (Term & Condition)
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="subtitle-1" component="div">
            ข้อกำหนดและเงื่อนไขนี้ใช้ระหว่างธนาคารออมสิน (ซึ่งต่อไปนี้จะเรียกว่า “ธนาคาร”)
            กับผู้ที่มีความประสงค์จะใช้บริการหรือลูกค้าของธนาคาร (ซึ่งต่อไปนี้จะเรียกว่า
            “ผู้ใช้บริการ”) โดยธนาคารมีข้อกำหนดการเก็บรวบรวม ใช้
            หรือเปิดเผยข้อมูลส่วนบุคคลดังต่อไปนี้
          </DialogContentText>
          <br />
          <DialogContentText id="subtitle-2" component="div">
            1.
            ธนาคารจะไม่นำข้อมูลส่วนบุคคลของผู้ใช้บริการหรือผู้มีส่วนได้เสียที่มีการเก็บรวบรวมไว้ไปใช้
            เพื่อวัตถุประสงค์อื่นนอกจากตามวัตถุประสงค์การใช้อันชอบด้วยกฎหมาย
            และจะไม่นำข้อมูลส่วนบุคคลดังกล่าวไปจำหน่าย ถ่ายโอน หรือเผยแพร่ให้กับบุคคลภายนอก
            เว้นแต่จะได้รับความยินยอมจากเจ้าของข้อมูลส่วนบุคคล
            หรือเพื่อความจำเป็นในการปฏิบัติตามกฎหมายเท่านั้น
          </DialogContentText>
          <br />
          <DialogContentText id="subtitle-3" component="div">
            2.
            ธนาคารจะใช้ข้อมูลส่วนบุคคลของผู้ใช้บริการเพื่อดำเนินการตรวจสอบตามมาตรฐานที่ธนาคารกำหนด
            รวมถึงการติดต่อ แจ้งให้ทราบ ตรวจสอบ
            หรือยืนยันข้อมูลเกี่ยวกับบัญชีหรือการใช้บริการของผู้ใช้บริการ เพื่อให้สอดคล้องกับกฎหมาย
            หลักเกณฑ์
            กฎเกณฑ์ที่เกี่ยวข้องที่มีการใช้บังคับในปัจจุบันและที่จะมีการแก้ไขหรือเพิ่มเติมในอนาคต
          </DialogContentText>
          <br />
          <DialogContentText id="subtitle-4" component="div">
            3. ธนาคารอาจเปิดเผยข้อมูลส่วนบุคคลของผู้ใช้บริการ
            หากเป็นข้อมูลที่เปิดเผยต่อสาธารณะโดยชอบด้วยกฎหมาย
            หรือปฏิบัติตามคำสั่งศาลหรือตามคำสั่งของหน่วยงานของรัฐ เพื่อประโยชน์แก่การสืบสวน
            สอบสวนของเจ้าหน้าที่ตามกฎหมาย หรือการพิจารณาคดีของศาล กรณีที่ธนาคารได้ว่าจ้างบุคคลอื่น
            เพื่อให้ดำเนินการใดๆ เกี่ยวกับการใช้ข้อมูลส่วนบุคคลที่ธนาคารเป็นผู้ควบคุมข้อมูล
            ธนาคารจะกำหนดให้บุคคลดังกล่าวต้องดำเนินการเก็บรักษาความลับ ความปลอดภัยของข้อมูลส่วนบุคคล
            และกำหนดข้อห้ามมิให้มีการนำข้อมูลส่วนบุคคลดังกล่าวไปใช้เพื่อวัตถุประสงค์อื่นนอกจากวัตถุประสงค์ตามที่ธนาคารกำหนด
          </DialogContentText>
          <br />
          <DialogContentText id="subtitle-5" component="div">
            “ท่านสามารถตรวจสอบประกาศธนาคารออมสิน เรื่อง ประกาศนโยบายความเป็นส่วนตัว (Privacy Notice)
            ของธนาคารออมสิน ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ.2562 ได้ที่&nbsp;
            <a href="https://www.gsb.or.th/other/privacy-notice/" target="_blank">
              https://www.gsb.or.th/other/privacy-notice/
            </a>
            ”
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error" variant="contained">
            ปิด
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ConsentDialog;
