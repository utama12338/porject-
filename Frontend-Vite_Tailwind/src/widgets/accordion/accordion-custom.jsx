import React from "react";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
    Typography
} from "@material-tailwind/react";
import PropTypes from "prop-types";
export function AccordionCustom({ property, objective, amount, peroid, interest, guarantee }) {
    return (
        <>
            <Accordion open={true}>
                <AccordionHeader className="text-pink-400" >
                    <Typography variant="h5">คุณสมบัติผู้กู้</Typography>
                </AccordionHeader>
                <AccordionBody className="text-gray-700">
                    {property ?
                        property.split("|").map((item, index) => <Typography variant="paragraph" key={index}>- {item}</Typography>)
                        : "-"}
                </AccordionBody>
            </Accordion>
            <Accordion open={true}>
                <AccordionHeader className="text-pink-400">
                    <Typography variant="h5">วัตถุประวงค์การกู้</Typography>
                </AccordionHeader>
                <AccordionBody className="text-gray-700">
                    {objective ?
                        objective.split("|").map((item, index) => <Typography variant="paragraph" key={index}>- {item}</Typography>)
                        : "-"}
                </AccordionBody>
            </Accordion>
            <Accordion open={true}>
                <AccordionHeader className="text-pink-400">
                    <Typography variant="h5">จำนวนเงินให้กู้</Typography>
                </AccordionHeader>
                <AccordionBody className="text-gray-700">
                    {amount ?
                        amount.split("|").map((item, index) => <Typography variant="paragraph" key={index}>- {item}</Typography>)
                        : "-"}
                </AccordionBody>
            </Accordion>
            <Accordion open={true}>
                <AccordionHeader className="text-pink-400">
                    <Typography variant="h5">ระยะเวลาชำระกู้</Typography>
                </AccordionHeader>
                <AccordionBody className="text-gray-700">
                    {peroid ?
                        peroid.split("|").map((item, index) => <Typography variant="paragraph" key={index}>- {item}</Typography>)
                        : "-"}
                </AccordionBody>
            </Accordion>
            <Accordion open={true}>
                <AccordionHeader className="text-pink-400">
                    <Typography variant="h5">อัตราดอกเบี้ย</Typography>
                </AccordionHeader>
                <AccordionBody className="text-gray-700">
                    {interest ?
                        interest.split("|").map((item, index) => <Typography variant="paragraph" key={index}>- {item}</Typography>)
                        : "-"}
                </AccordionBody>
            </Accordion>
            <Accordion open={true}>
                <AccordionHeader className="text-pink-400">
                    <Typography variant="h5">หลักประกันการกู้</Typography>
                </AccordionHeader>
                <AccordionBody className="text-gray-700">
                    {guarantee ?
                        guarantee.split("|").map((item, index) => <Typography variant="paragraph" key={index}>- {item}</Typography>)
                        : "-"}
                </AccordionBody>
            </Accordion>
        </>
    );
}

AccordionCustom.defaultProps = {
    property: "",
    objecttive: "",
    amount: "",
    peroid: "",
    interest: "",
    guarantee: "",
}

AccordionCustom.propTypes = {
    property: PropTypes.string,
    objecttive: PropTypes.string,
    amount: PropTypes.string,
    peroid: PropTypes.string,
    interest: PropTypes.string,
    guarantee: PropTypes.string,
}

export default AccordionCustom;