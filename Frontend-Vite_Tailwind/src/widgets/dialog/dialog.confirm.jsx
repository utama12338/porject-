import React from "react";
import { useNavigate } from "react-router-dom";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import PropTypes from "prop-types";

export function DialogConfirm({ action, headermsg, bodyMsg, navigateUrl, stateData, textCancel, textConfirm }) {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(action);

    const handleOpen = () => setOpen(!open);
    const hadleConfirm = () => navigate(navigateUrl,{state: stateData});

    return (
        <>
            <Dialog
                open={open}
                handler={handleOpen}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader>{headermsg}</DialogHeader>
                <DialogBody>
                    {bodyMsg}
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>{textCancel}</span>
                    </Button>
                    <Button variant="gradient" color="pink" onClick={hadleConfirm}>
                        <span>{textConfirm}</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}

DialogConfirm.defaultProps = {
    action: false, 
    headermsg: "", 
    bodyMsg: "", 
    navigateUrl: "", 
    stateData: null,
    textCancel: "ยกเลิก", 
    textConfirm: "ยืนยัน"
}

DialogConfirm.propTypes = {
    action: PropTypes.bool, 
    headermsg: PropTypes.string, 
    bodyMsg: PropTypes.string, 
    navigateUrl: PropTypes.string, 
    stateData: PropTypes.any,
    textCancel: PropTypes.string, 
    textConfirm: PropTypes.string
}

export default DialogConfirm