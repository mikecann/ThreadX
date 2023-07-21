import * as React from "react";
import { Center } from "../layout/Center";
import { FaUser } from "react-icons/fa";
import { BoxProps } from "../layout/styled";
import { forwardRef } from "react";

interface Props extends BoxProps {
  children?: React.ReactNode;
}

export const Avatar: React.FC<Props> = forwardRef(({ children, css, ...rest }, ref) => {
  return (
    <Center
      ref={ref}
      css={{
        width: "60px",
        height: `60px`,
        borderRadius: "50%",
        backgroundColor: `rgba(255,255,255,0.15)`,
        ...css,
      }}
      {...rest}
    >
      {children ?? <FaUser />}
    </Center>
  );
});
