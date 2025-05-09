import React, { useState, useEffect } from 'react';
import Success from '../assets/loginSvg/Succes.svg';

function EmailVerification() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(59); 
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval); 
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleResend = () => {
    setTimer(60); 
    setCanResend(false);
    console.log('OTP resent');
  };

  const handleChange = (value: string, index: number) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }

    console.log(otp,"otp")
  };

  const handleConfirm = () => {
    const enteredOtp = otp.join(''); 
    console.log('Entered OTP:', enteredOtp);
  };

  return (
    // Confirm mail page


    <div className="px-6 py-4 flex flex-col gap-4 items-center">
      <span className="text-3xl font-bold">You've got mail</span>
      <span className="text-center text-gray-600">
        We have sent the OTP verification <br /> code to your email address. Check <br /> your email and enter the code below.
      </span>
      <div className="flex gap-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            className="w-12 h-12 text-center border bg-[#FAFAFA] border-gray-300 rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-[#47A1AD]"
          />
        ))}
      </div>
      <span className="text-gray-500">Didn't receive email?</span>
      <span >
        {canResend ? (
          <button
            onClick={handleResend}
            className="!text-[#47A1AD]  !bg-white"
          >
            ReSend
          </button>
        ) : (
          <>You can resend code in <span className="!text-[#47A1AD]">{timer} s</span></>
        )}
      </span>
      <button
        type="submit"
        onClick={handleConfirm} 
        className="py-4 px-6 !bg-[#47A1AD] !rounded-full text-white font-semibold w-full outline-none focus:outline-none hover:bg-[#47A1AD] transition duration-300 ease"
      >
        Confirm
      </button>
    </div>




    // Success Page


    // <div className='flex flex-col gap-4 items-center '>
    //   <img src={Success} alt="Logo"/>
    //   <span className='pt-5 font-bold text-2xl'>Success!</span>
    //   <span>Your Email has been successfully <br/> verified.</span>
    //   <button
    //     type="submit"
    //     className="py-4 mt-16 px-6 !bg-[#47A1AD] !rounded-full text-white font-semibold w-full outline-none focus:outline-none hover:bg-[#47A1AD] transition duration-300 ease"
    //   >
    //     Go To Login
    //   </button>
    // </div>
  );
}

export default EmailVerification;