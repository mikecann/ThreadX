import * as React from "react";
import { Box, Text } from "@chakra-ui/react";

interface Props {}

export const AppTitle: React.FC<Props> = ({}) => {
  return (
    <Box position={"relative"} width={"1px"} height={"1px"} overflow={"visible"}>
      <Text
        position={"absolute"}
        top={0}
        left={`-3px`}
        transform={"rotate(-90deg)"}
        transformOrigin={"top left"}
        fontSize={"2em"}
        fontWeight={"bold"}
        color={"white"}
        opacity={0.5}
        userSelect={"none"}
        cursor={"pointer"}
        _hover={{ opacity: 0.9 }}
        onClick={() => window.open(`https://mikecann.co.uk/posts/tinkering-with-convex`, `_blank`)}
      >
        ThreadX
      </Text>
    </Box>
  );
};
