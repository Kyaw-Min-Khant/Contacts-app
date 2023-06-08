import React from "react";
import Lottie from "lottie-react";
import AnimationThree from "./404-error-page.json";
const ErrorPage = () => {
  return (
    <div className="min-h-screen flex-wrap flex justify-center items-center">
      <Lottie className=" max-w-[700px]" animationData={AnimationThree} />
    </div>
  );
};

export default ErrorPage;
