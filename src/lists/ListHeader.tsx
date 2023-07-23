import * as React from "react";
import { Box, HStack, IconButton, Text } from "@chakra-ui/react";
import { BsFillTrashFill } from "react-icons/bs";
import { useClerk } from "@clerk/clerk-react";
import { useConvexAuth, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useErrors } from "../common/misc/useErrors";
import { ListListsDoc } from "./AuthenticatedMessageLists";

interface Props {
  list?: ListListsDoc;
}

export const ListHeader: React.FC<Props> = ({ list }) => {
  const clerk = useClerk();
  const { isAuthenticated } = useConvexAuth();
  const remove = useMutation(api.lists.remove);
  const { onNonCriticalError } = useErrors();

  return (
    <HStack alignItems={"center"}>
      <Text flex={1}>{list?.name ?? "All Messages"}</Text>
      <IconButton
        aria-label={`remove list`}
        variant={"ghost"}
        icon={<BsFillTrashFill />}
        onClick={(e) => {
          if (!isAuthenticated) {
            clerk.openSignIn();
            return;
          }
          if (!list) return;
          remove({ id: list._id }).catch(onNonCriticalError);
        }}
      />
    </HStack>
  );
};
