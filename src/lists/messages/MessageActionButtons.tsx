import * as React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { HStack, IconButton } from "@chakra-ui/react";

interface Props {}

export const MessageActionButtons: React.FC<Props> = ({}) => {
  return (
    <HStack>
      <IconButton icon={<AiOutlineHeart />} aria-label={"like"} />
    </HStack>
  );
};
