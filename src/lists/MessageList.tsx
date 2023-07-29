import * as React from "react";
import { Spinner, VStack } from "@chakra-ui/react";
import { ListHeader } from "./ListHeader";
import { ListListsDoc } from "./AuthenticatedMessageLists";
import { AllMessages } from "./AllMessages";
import { ListMessages } from "./ListMessages";

interface Props {
  list?: ListListsDoc;
}

export const MessageList: React.FC<Props> = ({ list }) => {
  return (
    <VStack
      minWidth={`400px`}
      background={"#242424"}
      borderRadius={"5px"}
      boxShadow={"4px 0px 2px #111"}
      padding={`10px 15px 15px 15px`}
      alignItems={"stretch"}
      flexShrink={0}
    >
      <ListHeader list={list} />
      <VStack gap={`2px`} alignItems={"stretch"}>
        {list ? <ListMessages listId={list._id} /> : <AllMessages />}
      </VStack>
    </VStack>
  );
};
