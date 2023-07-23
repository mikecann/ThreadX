import * as React from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Spinner, VStack } from "@chakra-ui/react";
import { ListListsDoc } from "./AuthenticatedMessageLists";
import { Message } from "./messages/Message";

interface Props {
  list?: ListListsDoc;
}

export const AllMessages: React.FC<Props> = ({ list }) => {
  const messages = useQuery(api.messages.listAll) || [];
  if (!messages) return <Spinner />;
  return (
    <>
      {messages.map((message) => (
        <Message key={message._id.toString()} message={message} />
      ))}
    </>
  );
};
