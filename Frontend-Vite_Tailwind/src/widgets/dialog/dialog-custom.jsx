import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import PropTypes from "prop-types";

export function DialogCustom({ action, headermsg, bodyMsg, onClose }) {
    const [open, setOpen] = React.useState(action);

    const handleOpen = () => setOpen(!open);

    return (
        <>
            <Dialog
                open={action}
                handler={onClose}
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
                        onClick={onClose}
                        className="mr-1"
                    >
                        <span>ยกเลิก</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}

DialogCustom.defaultProps = {
    action: false, 
    headermsg: "", 
    bodyMsg: ""
}

DialogCustom.propTypes = {
    action: PropTypes.bool, 
    headermsg: PropTypes.string, 
    bodyMsg: PropTypes.string,
    onClose: PropTypes.any
}

export default DialogCustom