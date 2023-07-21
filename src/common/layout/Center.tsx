import * as React from "react";
import { Box, BoxProps } from "./styled";
import { forwardRef } from "react";

interface Props extends BoxProps {}

export const Center: React.FC<Props> = forwardRef(({ css, ...rest }, ref) => {
  return (
    <Box
      ref={ref}
      css={{
        ...css,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
      {...rest}
    />
  );
});
