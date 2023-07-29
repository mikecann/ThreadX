import * as React from "react";
import { UsernameHandleAndDate } from "../../common/avatar/UsernameHandleAndDate";
import { MessageActionButtons } from "./MessageActionButtons";
import { Avatar, Box, HStack, Image, Link, VStack } from "@chakra-ui/react";
import { api } from "../../../convex/_generated/api";
import { Replies } from "./Replies";

export type DetailedMessage = (typeof api.messages.listAll)["_returnType"][number];

interface Props {
  message: DetailedMessage;
  disableActions?: boolean;
}

export const Message: React.FC<Props> = ({ message, disableActions }) => {
  const [isShowingReplies, setIsShowingReplies] = React.useState(false);
  return (
    <VStack alignItems={"flex-start"}>
      <HStack
        width={"400px"}
        background={"#121212"}
        borderRadius={`5px`}
        padding={`10px`}
        spacing={"20px"}
        alignItems={"flex-start"}
      >
        <Box>
          <Avatar src={message.author.pictureUrl ?? undefined} />
        </Box>
        <VStack alignItems={"flex-start"} flex={1} spacing={"10px"}>
          <UsernameHandleAndDate
            name={message.author.name}
            handle={message.author.handle}
            createdAt={message._creationTime}
          />
          <Box css={{ flex: 1 }}>{message.body}</Box>
          {message.imageUrl && (
            <Link href={message.imageUrl}>
              <Image src={message.imageUrl} maxWidth={"200px"} maxHeight={"200px"} />
            </Link>
          )}
          {disableActions ? null : (
            <MessageActionButtons
              message={message}
              onShowReplies={() => setIsShowingReplies(true)}
            />
          )}
        </VStack>
      </HStack>
      {isShowingReplies ? (
        <Replies toMessage={message} onClose={() => setIsShowingReplies(false)} />
      ) : null}
    </VStack>
  );
};
