
import Logo from "../assets/loginSvg/Logo.svg";
import Credentials from "./Credentials";
import Background from "../assets/loginSvg/Background.svg";
// import EmailVerification from "./EmailVerification";
import { TermsAndConditions } from "./TermsAndConditions";
import SignUp from "./SignUp";
import Carousel from "./Carousel";
import FirstImg from "../assets/loginSvg/FirstImg.svg";
import SecondImg from "../assets/loginSvg/SecondImg.svg";

const Login = () => {
  const images = [FirstImg, SecondImg, FirstImg];
  return (
    <>
      <div
        className=" flex  w-full h-full flex-col md:flex-row "
        style={{ backgroundImage: `url(${Background})` }}
      >
        <div className="flex md:hidden items-center justify-center text-3xl mb-10 ">
          <img src={Logo} alt="" />
          <span className="">View Trade</span>
        </div>
        <div className="w-1/2 md:block hidden">
          <Carousel slides={images} time={2000} />
        </div>
        <div className="flex items-center justify-center md:w-1/2 rounded-full bg-white py-8 px-6">
          {/* <Credentials /> */}
          <SignUp/>
          {/* <TermsAndConditions /> */}
          {/* <EmailVerification/> */}
        </div>
      </div>
    </>
  );
};

export default Login;
