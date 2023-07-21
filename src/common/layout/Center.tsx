import * as React from "react";
import { Box, BoxProps } from "./styled";

interface Props extends BoxProps {}

export const Center: React.FC<Props> = ({ css, ...rest }) => {
  return (
    <Box
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
};
