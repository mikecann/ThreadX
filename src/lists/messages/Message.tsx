import * as React from "react";
import { Horizontal } from "../../common/layout/Horizontal";
import { Avatar, Textarea, Button, Text } from "@nextui-org/react";
import { Vertical } from "../../common/layout/Vertical";
import { Box } from "../../common/layout/styled";
import { AdditionalPostMediaOptions } from "../../newMessage/AdditionalPostMediaOptions";
import { UserName } from "../../common/avatar/UserName";
import { MessageActionButtons } from "./MessageActionButtons";
import { RepliesAndLikes } from "./RepliesAndLikes";
import { Doc } from "../../../convex/_generated/dataModel";

interface Props {
  message: Doc<"messages">;
}

export const Message: React.FC<Props> = ({ message }) => {
  // <span>{message.author}:</span>
  // <span>{message.body}</span>
  // <span>{new Date(message._creationTime).toLocaleTimeString()}</span>

  return (
    <Horizontal
      css={{
        width: `400px`,
        background: "rgba(0,0,0,1)",
        border: `1px solid rgba(255,255,255,0.8)`,
        borderRadius: `6px`,
        padding: `10px`,
        gap: `20px`,
      }}
    >
      <Box>
        <Avatar />
      </Box>
      <Vertical css={{ flex: 1, gap: `10px` }}>
        <UserName name={message.author} />
        <Box css={{ flex: 1 }}>{message.body}</Box>
        <MessageActionButtons />
        <RepliesAndLikes />
      </Vertical>
    </Horizontal>
  );
};
