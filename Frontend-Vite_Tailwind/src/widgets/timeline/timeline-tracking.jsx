import {
    Timeline,
    TimelineItem,
    TimelineConnector,
    TimelineHeader,
    TimelineIcon,
    Typography,
} from "@material-tailwind/react";
import {
    MagnifyingGlassCircleIcon,
    DocumentTextIcon,
    DocumentCheckIcon,
    CheckCircleIcon,
    XCircleIcon,
    PhoneXMarkIcon,
    ShieldExclamationIcon,
    NoSymbolIcon,
    DocumentPlusIcon
    
} from "@heroicons/react/24/solid";
import PropTypes from "prop-types";

export function TimelineTracking({ status01, desc01,
    status02, desc02,
    status03, desc03,
    status04, desc04,
    status05, desc05,
    status06, desc06,
    status07, desc07,
    status08, desc08,
    status09, desc09 }) {
    return (
        <div className="w-[25rem]">
            <Timeline>
                <TimelineItem className="h-28">
                    <TimelineConnector className="!w-[78px]" />
                    <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
                        <TimelineIcon className="p-3" variant="ghost" color={status01 ? "pink" : "blue-gray"}>
                            <DocumentTextIcon className="h-5 w-5" />
                        </TimelineIcon>
                        <div className="flex flex-col gap-1">
                            <Typography variant="h6" color={status01 ? "pink" : "blue-gray"}>
                                สมัครสินเชื่อผ่านเว็บ
                            </Typography>
                            <Typography variant="small" color="gray" className="font-normal">
                                {desc01}
                            </Typography>
                        </div>
                    </TimelineHeader>
                </TimelineItem>
                {status08 ?
                    <TimelineItem className="h-28">
                        <TimelineConnector className="!w-[78px]" />
                        <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
                            <TimelineIcon className="p-3" variant="ghost" color={status08 ? "pink" : "blue-gray"}>
                                <PhoneXMarkIcon className="h-5 w-5" />
                            </TimelineIcon>
                            <div className="flex flex-col gap-1">
                                <Typography variant="h6" color={status08 ? "pink" : "blue-gray"}>
                                    ไม่มายื่นเอกสารตามวันนัดหมาย
                                </Typography>
                                <Typography variant="small" color="red" className="font-normal">
                                    {desc08}
                                </Typography>
                            </div>
                        </TimelineHeader>
                    </TimelineItem>
                    :
                    <TimelineItem className="h-28">
                        <TimelineConnector className="!w-[78px]" />
                        <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
                            <TimelineIcon className="p-3" variant="ghost" color={status02 ? "pink" : "blue-gray"}>
                                <DocumentPlusIcon className="h-5 w-5" />
                            </TimelineIcon>
                            <div className="flex flex-col gap-1">
                                <Typography variant="h6" color={status02 ? "pink" : "blue-gray"}>
                                    ยื่นเอกสารขอกู้ที่สาขา
                                </Typography>
                                <Typography variant="small" color="gray" className="font-normal">
                                    {desc02}
                                </Typography>
                            </div>
                        </TimelineHeader>
                    </TimelineItem>
                }

                <TimelineItem className="h-28">
                    <TimelineConnector className="!w-[78px]" />
                    <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
                        <TimelineIcon className="p-3" variant="ghost" color={status03 ? "pink" : "blue-gray"}>
                            <MagnifyingGlassCircleIcon className="h-5 w-5" />
                        </TimelineIcon>
                        <div className="flex flex-col gap-1">
                            <Typography variant="h6" color={status03 ? "pink" : "blue-gray"}>
                                อยู่ระหว่างพิจารณา
                            </Typography>
                            <Typography variant="small" color="gray" className="font-normal">
                                {desc03}
                            </Typography>
                        </div>
                    </TimelineHeader>
                </TimelineItem>
                {status04 ?
                    <TimelineItem className="h-28">
                        <TimelineConnector className="!w-[78px]" />
                        <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
                            <TimelineIcon className="p-3" variant="ghost" color={status04 ? "pink" : "blue-gray"}>
                                <ShieldExclamationIcon className="h-5 w-5" />
                            </TimelineIcon>
                            <div className="flex flex-col gap-1">
                                <Typography variant="h6" color={status04 ? "pink" : "blue-gray"}>
                                    คุณสมบัติไม่ตรงตามเกณฑ์
                                </Typography>
                                <Typography variant="small" color="gray" className="font-normal">
                                    {desc04}
                                </Typography>
                            </div>
                        </TimelineHeader>
                    </TimelineItem>
                    : null}



                {status06 ?
                    <TimelineItem className="h-28">
                        <TimelineConnector className="!w-[78px]" />
                        <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
                            <TimelineIcon className="p-3" variant="ghost" color={status06 ? "pink" : "blue-gray"}>
                                <XCircleIcon className="h-5 w-5" />
                            </TimelineIcon>
                            <div className="flex flex-col gap-1">
                                <Typography variant="h6" color={status06 ? "pink" : "blue-gray"}>
                                    ไม่อนุมัติ เนื่องจากไม่เป็นไปตามเกณฑ์ที่กำหนด
                                </Typography>
                                <Typography variant="small" color="gray" className="font-normal">
                                    {desc06}
                                </Typography>
                            </div>
                        </TimelineHeader>
                    </TimelineItem>
                    :
                    <TimelineItem className="h-28">
                        <TimelineConnector className="!w-[78px]" />
                        <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
                            <TimelineIcon className="p-3" variant="ghost" color={status05 ? "pink" : "blue-gray"}>
                                <CheckCircleIcon className="h-5 w-5" />
                            </TimelineIcon>
                            <div className="flex flex-col gap-1">
                                <Typography variant="h6" color={status05 ? "pink" : "blue-gray"}>
                                    อนุมัติ
                                </Typography>
                                <Typography variant="small" color="gray" className="font-normal">
                                    {desc05}
                                </Typography>
                                {status05 ?
                                    <Typography variant="small" color="red" className="font-normal">
                                        กรุณาทำสัญญาภายใน 30 วัน นับจากวันที่ได้รับอนุมัติ
                                    </Typography>
                                    : null}

                            </div>
                        </TimelineHeader>
                    </TimelineItem>
                }
                {status09 ?
                    <TimelineItem className="h-28">
                        <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
                            <TimelineIcon className="p-3" variant="ghost" color={status09 ? "pink" : "blue-gray"}>
                                <NoSymbolIcon className="h-5 w-5" />
                            </TimelineIcon>
                            <div className="flex flex-col gap-1">
                                <Typography variant="h6" color={status09 ? "pink" : "blue-gray"}>
                                    ยกเลิกการสมัครสินเชื่อ
                                </Typography>
                                <Typography variant="small" color="gray" className="font-normal">
                                    {desc09}
                                </Typography>
                            </div>
                        </TimelineHeader>
                    </TimelineItem>
                    :
                    <TimelineItem className="h-28">
                        <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
                            <TimelineIcon className="p-3" variant="ghost" color={status07 ? "pink" : "blue-gray"}>
                                <DocumentCheckIcon className="h-5 w-5" />
                            </TimelineIcon>
                            <div className="flex flex-col gap-1">
                                <Typography variant="h6" color={status07 ? "pink" : "blue-gray"}>
                                    จัดทำสัญญาแล้ว
                                </Typography>
                                <Typography variant="small" color="gray" className="font-normal">
                                    {desc07}
                                </Typography>
                            </div>
                        </TimelineHeader>
                    </TimelineItem>
                }

            </Timeline>
        </div>
    );
}

TimelineTracking.defaultProps = {
    status01: false,
    desc01: "",
    status02: false,
    desc02: "",
    status03: false,
    desc03: "",
    status04: false,
    desc04: "",
    status05: false,
    desc05: "",
    status06: false,
    desc06: "",
    status07: false,
    desc07: "",
    status08: false,
    desc08: "",
    status09: false,
    desc09: ""
}

TimelineTracking.propTypes = {
    status01: PropTypes.bool,
    desc01: PropTypes.string,
    status02: PropTypes.bool,
    desc02: PropTypes.string,
    status03: PropTypes.bool,
    desc03: PropTypes.string,
    status04: PropTypes.bool,
    desc04: PropTypes.string,
    status05: PropTypes.bool,
    desc05: PropTypes.string,
    status06: PropTypes.bool,
    desc06: PropTypes.string,
    status07: PropTypes.bool,
    desc07: PropTypes.string,
    status08: PropTypes.bool,
    desc08: PropTypes.string,
    status09: PropTypes.bool,
    desc09: PropTypes.string
}

export default TimelineTracking;