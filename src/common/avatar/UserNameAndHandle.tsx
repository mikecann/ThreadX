import * as React from "react";
import { HStack, Text, VStack } from "@chakra-ui/react";

interface Props {
  name: string;
  handle: string;
}

export const UserNameAndHandle: React.FC<Props> = ({ name, handle }) => {
  return (
    <VStack justifyContent={"flex-start"} alignItems={"flex-start"} spacing={`0px`}>
      <Text fontWeight={"bold"}>{name}</Text>
      <Text fontSize={"0.8em"} color={"rgba(255,255,255,0.5)"}>
        @{handle}
      </Text>
    </VStack>
  );
};
