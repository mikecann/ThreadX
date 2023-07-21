import * as React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Button, Center, IconButton } from "@chakra-ui/react";
import { NewMessageModal } from "../newMessage/NewMessageModal";

interface Props {}

export const CreateMessageButton: React.FC<Props> = ({}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <IconButton
        aria-label={"create"}
        colorScheme="blue"
        icon={<AiOutlinePlus />}
        onClick={() => setIsOpen(true)}
      />
      <NewMessageModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
