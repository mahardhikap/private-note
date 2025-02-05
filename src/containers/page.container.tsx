import React, { ReactNode } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
interface ContainerProps {
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="container mx-auto w-10/12 lg:w-2/3 xl:w-3/5">
        <div className="min-h-screen">{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default Container;
