import * as React from "react";
import { UserNameAndHandle } from "../../common/avatar/UserNameAndHandle";
import { MessageActionButtons } from "./MessageActionButtons";
import { RepliesAndLikes } from "./RepliesAndLikes";
import { Avatar, Box, HStack, VStack } from "@chakra-ui/react";
import { api } from "../../../convex/_generated/api";

export type DetailedMessage = (typeof api.messages.listAll)["_returnType"][number];

interface Props {
  message: DetailedMessage;
}

export const Message: React.FC<Props> = ({ message }) => {
  // <span>{message.author}:</span>
  // <span>{message.body}</span>
  // <span>{new Date(message._creationTime).toLocaleTimeString()}</span>

  return (
    <HStack
      minWidth={`100px`}
      background={"rgba(0,0,0,0.5)"}
      borderTop={`1px solid rgba(255,255,255,0.8)`}
      borderBottom={`1px solid rgba(255,255,255,0.8)`}
      borderRadius={`4px`}
      padding={`10px`}
      spacing={"20px"}
      alignItems={"flex-start"}
    >
      <Box>
        <Avatar src={message.author.pictureUrl ?? undefined} />
      </Box>
      <VStack alignItems={"flex-start"} flex={1} spacing={"10px"}>
        <UserNameAndHandle name={message.author.name} handle={message.author.handle} />
        <Box css={{ flex: 1 }}>{message.body}</Box>
        <MessageActionButtons message={message} />
        <RepliesAndLikes likes={message.likes} />
      </VStack>
    </HStack>
  );
};
