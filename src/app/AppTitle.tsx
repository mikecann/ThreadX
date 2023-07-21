import * as React from "react";
import { Box, Text } from "@chakra-ui/react";

interface Props {}

export const AppTitle: React.FC<Props> = ({}) => {
  return (
    <Box
      css={{
        position: "relative",
        width: `1px`,
        height: `1px`,
        overflow: "visible",
      }}
    >
      <Text
        position={"absolute"}
        top={0}
        left={`-10px`}
        transform={"rotate(-90deg)"}
        transformOrigin={"top left"}
        fontSize={"2em"}
        fontWeight={"bold"}
        color={"white"}
        opacity={0.5}
      >
        ThreadVex
        {/*<span style={{ color: "#F5B01A" }}>V</span>*/}
        {/*<span style={{ color: "#EE342F" }}>e</span>*/}
        {/*<span style={{ color: "#8D2576" }}>x</span>*/}
      </Text>
    </Box>
  );
};
