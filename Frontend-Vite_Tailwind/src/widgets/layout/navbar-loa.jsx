import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Navbar as MTNavbar, MobileNav, Typography } from "@material-tailwind/react";

export function NavbarLoa({ header, subHeader }) {
    const [openNav, setOpenNav] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        );
    }, []);

    return (
        <MTNavbar color="transparent" className="p-3">
            <div className="container mx-auto flex items-center justify-between text-black">
                <Typography variant="h4" color="pink" className="mr-4 ml-2 cursor-pointer py-1.5 font-medium">
                    <Link to="/home">{header}</Link>
                </Typography>
            </div>
            <div className="container mx-auto flex items-center justify-between">
                <Typography variant="h6" color="blue-gray" className="mr-4 ml-2 cursor-pointer py-1.5 font-medium">
                    <Link to="/home">{subHeader}</Link>
                </Typography>
            </div>
            <hr className="mx-auto w-full border-pink-500" />
            {/* <MobileNav
                className="rounded-xl bg-white px-4 pt-2 pb-4 text-blue-gray-900"
                open={openNav}
            >
                <div className="container mx-auto">
                    <div className="container mx-auto flex items-center justify-between text-black">
                        <Typography variant="h3" color="pink" className="mr-4 ml-2 cursor-pointer py-1.5 font-bold">
                            {header}
                        </Typography>
                    </div>
                    <div className="container mx-auto flex items-center justify-between">
                        <Typography variant="h6" color="blue-gray" className="mr-4 ml-2 cursor-pointer py-1.5 font-medium">
                            {subHeader}
                        </Typography>
                    </div>
                    <hr className="my-4 border-pink-100" />
                </div>
            </MobileNav> */}
        </MTNavbar>
    );

}

NavbarLoa.defaultProps = {
    header: "สมัครใช้สินเชื่อธนาคารออมสิน",
    subHeader: "Welcome to GSB Loan"
};

NavbarLoa.propTypes = {
    header: PropTypes.string,
    subHeader: PropTypes.string,
};

export default NavbarLoa;