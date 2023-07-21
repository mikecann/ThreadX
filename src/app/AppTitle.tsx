import * as React from "react";
import { Box } from "../common/layout/styled";
import { Text } from "@nextui-org/react";

interface Props {}

export const AppTitle: React.FC<Props> = ({}) => {
  return (
    <Box
      css={{
        position: "relative",
        width: 1,
        height: 1,
        overflow: "visible",
      }}
    >
      <Text
        h1
        css={{
          position: "absolute",
          top: 0,
          left: 0,
          transform: "rotate(-90deg)",
          transformOrigin: "top left",
        }}
      >
        ThreadVex
      </Text>
    </Box>
  );
};
