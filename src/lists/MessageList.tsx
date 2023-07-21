import * as React from "react";
import { Box } from "../common/layout/styled";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Message } from "./messages/Message";
import { Vertical } from "../common/layout/Vertical";

interface Props {}

export const MessageList: React.FC<Props> = ({}) => {
  const messages = useQuery(api.messages.list) || [];

  return (
    <Vertical
      css={{
        minWidth: `200px`,
        borderRadius: `2px`,
        background: `rgba(0,0,0,0.5)`,
        padding: `10px`,
        gap: `10px`,
      }}
    >
      {messages.map((message) => (
        <Message key={message._id.toString()} message={message} />
      ))}
    </Vertical>
  );
};
