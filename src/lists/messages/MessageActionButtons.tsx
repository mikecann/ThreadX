import * as React from "react";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { HStack, IconButton } from "@chakra-ui/react";
import { DetailedMessage } from "./Message";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useErrors } from "../../common/misc/useErrors";

interface Props {
  message: DetailedMessage;
}

export const MessageActionButtons: React.FC<Props> = ({ message }) => {
  const like = useMutation(api.likes.create);
  const removeLike = useMutation(api.likes.removeForMessage);
  const { onNonCriticalError } = useErrors();

  const toggle = message.isLikedByMe ? removeLike : like;

  return (
    <HStack>
      <IconButton
        icon={message.isLikedByMe ? <AiTwotoneHeart color={"#e73737"} /> : <AiOutlineHeart />}
        onClick={() => toggle({ messageId: message._id }).catch(onNonCriticalError)}
        aria-label={"like"}
        variant={"ghost"}
      />
    </HStack>
  );
};
