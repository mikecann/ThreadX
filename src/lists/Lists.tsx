import * as React from "react";
import { MessageList } from "./MessageList";
import { Box, HStack, Spinner } from "@chakra-ui/react";
import { NewListButton } from "./NewListButton";
import { useConvexAuth, useQuery } from "convex/react";
import { AuthenticatedMessageLists } from "./AuthenticatedMessageLists";
import { iife } from "../common/misc/misc";

interface Props {}

export const Lists: React.FC<Props> = ({}) => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <HStack
      // backgroundColor={`rgba(0,0,0,0.5)`}
      spacing={`10px`}
      padding={`10px`}
      alignItems={"flex-start"}
      minHeight={"100vh"}
      maxHeight={"100vh"}
      overflow={"auto"}
      marginLeft={"70px"}
    >
      {iife(() => {
        if (isLoading) return <Spinner />;
        if (isAuthenticated) return <AuthenticatedMessageLists />;
        return <MessageList />;
      })}
      <NewListButton />
    </HStack>
  );
};
