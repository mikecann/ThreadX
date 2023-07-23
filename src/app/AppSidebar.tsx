import * as React from "react";
import { AppTitle } from "./AppTitle";
import { CreateMessageButton } from "./CreateMessageButton";
import { MyAvatar } from "./MyAvatar";
import { Box, Center, VStack } from "@chakra-ui/react";

interface Props {}

export const AppSidebar: React.FC<Props> = ({}) => {
  return (
    <VStack
      background={"rgba(0,0,0,1)"}
      minWidth={`20px`}
      height={`100vh`}
      position={"fixed"}
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
