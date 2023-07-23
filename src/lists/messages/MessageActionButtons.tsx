import * as React from "react";
import { AiOutlineHeart, AiOutlineMenu, AiTwotoneHeart } from "react-icons/ai";
import {
  Avatar,
  Box,
  Button,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { DetailedMessage } from "./Message";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useErrors } from "../../common/misc/useErrors";
import { BsReply, BsThreeDots } from "react-icons/bs";
import { NewReplyModal } from "./NewReplyModal";
import { FaSignInAlt, FaSignOutAlt, FaTrash } from "react-icons/fa";

interface Props {
  message: DetailedMessage;
  onShowReplies: () => unknown;
}

export const MessageActionButtons: React.FC<Props> = ({ message, onShowReplies }) => {
  const like = useMutation(api.likes.create);
  const removeLike = useMutation(api.likes.removeForMessage);
  const removeMessage = useMutation(api.messages.remove);
  const { onNonCriticalError } = useErrors();

  const toggle = message.isLikedByMe ? removeLike : like;

  const onDeleteMessage = () => removeMessage({ id: message._id }).catch(onNonCriticalError);

  return (
    <HStack marginLeft={"-15px"} width={"calc(100% + 15px)"}>
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
      <Box flex={1} />
      <Menu strategy={"absolute"}>
        <MenuButton
          as={IconButton}
          icon={<BsThreeDots />}
          cursor={"pointer"}
          variant={"ghost"}
          aria-label="menu"
        ></MenuButton>
        <MenuList>
          <MenuItem icon={<FaTrash />} onClick={onDeleteMessage}>
            Delete
          </MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
};
