import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  modal: ReactNode;
};

const HomeLayout = ({ children, modal }: Props) => {
  return (
    <>
      {children}
      {modal}
    </>
  );
};

export default HomeLayout;
