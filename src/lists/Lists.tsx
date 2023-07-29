import * as React from "react";
import { MessageList } from "./MessageList";
import { Box, HStack, Spinner } from "@chakra-ui/react";
import { NewListButton } from "./NewListButton";
import { useConvexAuth, useQuery } from "convex/react";
import { AuthenticatedMessageLists } from "./AuthenticatedMessageLists";
import { iife } from "../common/misc/misc";
import { api } from "../../convex/_generated/api";

interface Props {}

export const Lists: React.FC<Props> = ({}) => {
  const { isLoading } = useConvexAuth();
  const me = useQuery(api.users.findMe);

  return (
    <HStack
      // backgroundColor={`rgba(255,0,0,0.5)`}
      spacing={`10px`}
      padding={`10px`}
      alignItems={"flex-start"}
      minHeight={"100vh"}
      maxHeight={"100vh"}
      overflow={"auto"}
      marginLeft={"90px"}
    >
      {iife(() => {
        if (isLoading) return <Spinner />;
        if (me) return <AuthenticatedMessageLists />;
        return <MessageList />;
      })}
      <NewListButton />
    </HStack>
  );
};
