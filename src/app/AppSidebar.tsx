import * as React from "react";
import { AppTitle } from "./AppTitle";
import { CreateMessageButton } from "./CreateMessageButton";
import { MyAvatar } from "./MyAvatar";
import { Box, Center, VStack } from "@chakra-ui/react";

interface Props {}

export const AppSidebar: React.FC<Props> = ({}) => {
  return (
    <VStack
      minWidth={`20px`}
      height={`calc(100dvh - 20px)`}
      margin={"10px"}
      position={"fixed"}
      background={"#1D1D1D"}
      borderRadius={"5px"}
      boxShadow={"4px 0px 2px #111"}
      top={0}
      left={0}
      padding={"10px 10px"}
      spacing={`20px`}
      zIndex={100}
    >
      <Center>
        <MyAvatar />
      </Center>
      <CreateMessageButton />
      <Box flex={1} />
      <AppTitle />
    </VStack>
  );
};
