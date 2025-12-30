import React from "react";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      {/* Increased max width */}
      <div className="w-full max-w-xl md:max-w-5xl lg:max-w-6xl">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
