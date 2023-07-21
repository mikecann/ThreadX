import * as React from "react";
import { Horizontal } from "../common/layout/Horizontal";
import { MessageList } from "./MessageList";

interface Props {}

export const MessageLists: React.FC<Props> = ({}) => {
  return (
    <Horizontal
      css={{
        backgroundColor: `rgba(0,0,0,0.5)`,
        flex: 1,
        marginTop: `20px`,
        gap: `10px`,
        padding: `10px`,
      }}
    >
      <MessageList />
      <MessageList />
    </Horizontal>
  );
};
