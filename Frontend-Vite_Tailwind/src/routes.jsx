import { 
  Home, 
  RegisterPersonInfo, 
  RegisterWorkInfo, 
  RegisterAddrInfo,
  RegisterProdcut,
  Consent,
  Success,
  Failed,
  Tracking
} from "@/pages";

export const routes = [
  {
    name: "home",
    path: "/home",
    element: <Home />,
  },
  {
    name: "Register Personal Information",
    path: "/register-person-info",
    element: <RegisterPersonInfo />
  },
  {
    name: "Register Work Information",
    path: "/register-work-info",
    element: <RegisterWorkInfo />
  },
  {
    name: "Register Address Information",
    path: "/register-addr-info",
    element: <RegisterAddrInfo />
  },
  {
    name: "Register Product Information",
    path: "/register-product",
    element: <RegisterProdcut />
  },
  {
    name: "Consent",
    path: "/consent",
    element: <Consent />
  },
  {
    name: "Success",
    path: "/register-success",
    element: <Success />
  },
  {
    name: "Failed",
    path: "/register-failed",
    element: <Failed />
  },
  {
    name: "Tracking",
    path: "/tracking",
    element: <Tracking />
  }
];

export default routes;
