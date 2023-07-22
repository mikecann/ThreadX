import * as React from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Message } from "./messages/Message";
import { Spinner, VStack } from "@chakra-ui/react";
import { ListHeader } from "./ListHeader";
import { observer } from "mobx-react-lite";
import { ListListsDoc } from "./AuthenticatedMessageLists";
import { AllMessages } from "./AllMessages";
import { ListMessages } from "./ListMessages";

interface Props {
  list?: ListListsDoc;
}

export const MessageList: React.FC<Props> = observer(({ list }) => {
  return (
    <VStack
      minWidth={`400px`}
      borderRadius={`2px`}
      background={`rgba(0,0,0,0.5)`}
      padding={`10px 15px 15px 15px`}
      alignItems={"stretch"}
    >
      <ListHeader list={list} />
      <VStack gap={`2px`} alignItems={"stretch"} width={"100%"}>
        {list ? <ListMessages listId={list._id} /> : <AllMessages />}
      </VStack>
    </VStack>
  );
});
