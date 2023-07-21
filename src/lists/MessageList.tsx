import * as React from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Message } from "./messages/Message";
import { VStack } from "@chakra-ui/react";

interface Props {}

export const MessageList: React.FC<Props> = ({}) => {
  const messages = useQuery(api.messages.list) || [];

  return (
    <VStack
      minWidth={`200px`}
      borderRadius={`2px`}
      background={`rgba(0,0,0,0.5)`}
      padding={`10px`}
      gap={`10px`}
    >
      {messages.map((message) => (
        <Message key={message._id.toString()} message={message} />
      ))}
    </VStack>
  );
};
