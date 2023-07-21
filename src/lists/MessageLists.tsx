import * as React from "react";
import { MessageList } from "./MessageList";
import { HStack } from "@chakra-ui/react";

interface Props {}

export const MessageLists: React.FC<Props> = ({}) => {
  return (
    <HStack
      css={{
        backgroundColor: `rgba(0,0,0,0.5)`,
        flex: 1,
        gap: `10px`,
        padding: `10px`,
      }}
    >
      <MessageList />
      <MessageList />
    </HStack>
  );
};
