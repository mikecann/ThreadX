import * as React from "react";
import { Box, BoxProps } from "./styled";

interface Props extends BoxProps {}

export const Vertical: React.FC<Props> = ({ css, ...rest }) => {
  return (
    <Box
      css={{
        ...css,
        display: "flex",
        flexDirection: "column",
      }}
      {...rest}
    />
  );
};
