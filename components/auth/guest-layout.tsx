import React from "react";

const GuestLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-slate-100">
      {children}
    </div>
  );
};

export default GuestLayout;
