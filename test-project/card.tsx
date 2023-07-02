import React from "react";

const CardLayout: React.FC<{ children: React.ReactNode }> = (props) => {
  return <div>card layout{props.children}</div>;
};

export default CardLayout;
