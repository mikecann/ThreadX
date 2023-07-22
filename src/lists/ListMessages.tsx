import * as React from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Spinner, VStack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { Id } from "../../convex/_generated/dataModel";
import { Message } from "./messages/Message";

interface Props {
  listId: Id<"lists">;
}

export const ListMessages: React.FC<Props> = observer(({ listId }) => {
  const messages = useQuery(api.messages.listForList, { listId }) || [];
  if (!messages) return <Spinner />;
  return (
    <>
      {messages.map((message) => (
        <Message key={message._id.toString()} message={message} />
      ))}
    </>
  );
});
