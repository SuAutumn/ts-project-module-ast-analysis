import React from "react";

const CardLayout: React.ForwardRefRenderFunction<any, { children: React.ReactNode }> = (props, ref) => {
  return <div>card layout{props.children}</div>;
};

export default React.forwardRef(CardLayout);
