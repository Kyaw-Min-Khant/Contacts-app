import React from "react";
import Lottie from "lottie-react";
import AnimationFour from "../../noData.json";
const NotFound = () => {
  return (
    <div className="min-h-screen w-[80vw] flex justify-center items-center">
      <Lottie className=" max-w-[700px]" animationData={AnimationFour} />
    </div>
  );
};

export default NotFound;
