import * as React from "react";
import { MessageList } from "./MessageList";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

interface Props {}

export type ListListsDoc = (typeof api.lists.list)["_returnType"][number];

export const AuthenticatedMessageLists: React.FC<Props> = ({}) => {
  const lists = useQuery(api.lists.list) || [];
  return (
    <>
      {lists.map((list) => (
        <MessageList key={list._id.toString()} list={list} />
      ))}
    </>
  );
};
