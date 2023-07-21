import * as React from "react";
import { UserName } from "../../common/avatar/UserName";
import { MessageActionButtons } from "./MessageActionButtons";
import { RepliesAndLikes } from "./RepliesAndLikes";
import { Doc } from "../../../convex/_generated/dataModel";
import { Avatar, Box, HStack, VStack } from "@chakra-ui/react";

interface Props {
  message: Doc<"messages">;
}

export const Message: React.FC<Props> = ({ message }) => {
  // <span>{message.author}:</span>
  // <span>{message.body}</span>
  // <span>{new Date(message._creationTime).toLocaleTimeString()}</span>

  return (
    <HStack
      width={`400px`}
      background={"rgba(0,0,0,1)"}
      border={`1px solid rgba(255,255,255,0.8)`}
      borderRadius={`6px`}
      padding={`10px`}
      spacing={"20px"}
      alignItems={"flex-start"}
    >
      <Box>
        <Avatar />
      </Box>
      <VStack alignItems={"flex-start"} flex={1} spacing={"10px"}>
        <UserName name={message.author} />
        <Box css={{ flex: 1 }}>{message.body}</Box>
        <MessageActionButtons />
        <RepliesAndLikes />
      </VStack>
    </HStack>
  );
};
