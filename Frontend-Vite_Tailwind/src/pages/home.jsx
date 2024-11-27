import React from "react";
import {
  Typography,
  Button,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { PageTitle } from "@/widgets/layout";
import { FeatureCard } from "@/widgets/cards";
import { stepData } from "@/data";

export function Home() {

  const navigate = useNavigate();

  const handleOnclickToConsent = () => {
    navigate("/register-product");
  }

  return (
    <>
      <section className="relative bg-white py-14 px-4"></section>
      <section className="relative bg-white py-24 px-4">
        <div className="container mx-auto">
          <PageTitle section="" heading="">
            <Typography variant="h3" color="pink">เช็คความพร้อมก่อนสมัครสินเชื่อ LOAN</Typography>
          </PageTitle>
          <div className="mx-auto mt-20 mb-48 grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">

            {stepData.map(({ color, title, icon, description }) => (
              <FeatureCard
                key={title}
                color={color}
                title={title}
                icon={React.createElement(icon, {
                  className: "w-5 h-5 text-white",
                })}
                description={description}
              />
            ))}
          </div>
          <div className="mx-auto w-full mt-12 lg:w-5/12">
            <Button
              className="mt-8 rounded-full"
              color="pink"
              size="lg"
              fullWidth
              onClick={handleOnclickToConsent}>
              เริ่มสมัคร
            </Button>
          </div>
          <div className="mx-auto w-full mt-12 lg:w-5/12 grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
            <div>
              <Button
                className="mt-8 rounded-full"
                variant="filled"
                size="lg"
                onClick={() => navigate("/tracking")}
                fullWidth>
                ติดตามสถานะการสมัคร
              </Button>
            </div>
            <div>
              <Button
                className="mt-8 rounded-full"
                variant="filled"
                size="lg"
                onClick={() => navigate("/tracking")}
                fullWidth>
                ยกเลิกการสมัคร
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
