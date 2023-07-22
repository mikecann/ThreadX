import * as React from "react";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { Button, HStack, IconButton } from "@chakra-ui/react";
import { DetailedMessage } from "./Message";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useErrors } from "../../common/misc/useErrors";
import { BsReply } from "react-icons/bs";
import { NewReplyModal } from "./NewReplyModal";

interface Props {
  message: DetailedMessage;
  onShowReplies: () => unknown;
}

export const MessageActionButtons: React.FC<Props> = ({ message, onShowReplies }) => {
  //const [isReplyModalOpen, setIsReplyModalOpen] = React.useState(false);
  const like = useMutation(api.likes.create);
  const removeLike = useMutation(api.likes.removeForMessage);
  const { onNonCriticalError } = useErrors();

  const toggle = message.isLikedByMe ? removeLike : like;

  return (
    <HStack marginLeft={"-15px"}>
      <Button
        leftIcon={message.isLikedByMe ? <AiTwotoneHeart color={"#e73737"} /> : <AiOutlineHeart />}
        onClick={() => toggle({ messageId: message._id }).catch(onNonCriticalError)}
        aria-label={"like"}
        variant={"ghost"}
      >
        {message.likes.toString()} like{message.likes.toString() === "1" ? "" : "s"}
      </Button>
      <Button leftIcon={<BsReply />} onClick={onShowReplies} aria-label={"reply"} variant={"ghost"}>
        {message.replies.toString()} {message.replies.toString() === "1" ? "reply" : "replies"}
      </Button>
    </HStack>
  );
};
