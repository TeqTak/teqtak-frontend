import React from "react";

const BlockedMessage = () => {
  return (
   <div className="min-h-screen  flex justify-center items-center">
     <div className="w-full max-w-lg  p-6 linear_gradient text-white text-center rounded-lg shadow-lg ">
      <p className="text-lg font-semibold">
        You have been temporarily blocked on TeqTak.
      </p>
    </div>
   </div>
  );
};

export default BlockedMessage;
