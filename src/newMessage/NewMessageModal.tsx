import * as React from "react";
import {
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";
import { AdditionalPostMediaOptions } from "./AdditionalPostMediaOptions";
import { useState } from "react";
import { useConvexAuth, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useClerk } from "@clerk/clerk-react";
import { useErrors } from "../common/misc/useErrors";

interface Props {
  isOpen: boolean;
  onClose: () => unknown;
}

export const NewMessageModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [text, setText] = useState("");
  const sendMessage = useMutation(api.messages.send);
  const { onNonCriticalError } = useErrors();
  const clerk = useClerk();
  const { isAuthenticated } = useConvexAuth();

  const onSend = () => {
    if (!isAuthenticated) {
      clerk.openSignIn();
      return;
    }

    sendMessage({ body: text })
      .then(() => setText(""))
      .catch(onNonCriticalError);

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Thread</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Textarea
            aria-label="New message box"
            placeholder="Your new message"
            value={text}
            rows={4}
            onChange={(e) => setText(e.target.value)}
            background={"rgba(255,255,255,0.1)"}
            onKeyDown={(event) => {
              if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
                event.preventDefault();
                onSend();
              }
            }}
          />
        </ModalBody>
        <ModalFooter>
          <HStack width={"100%"}>
            <Box css={{ flex: 1 }}>
              <AdditionalPostMediaOptions />
            </Box>
            <Button
              css={{ transition: `all 0.2s ease` }}
              color={"gradient"}
              isDisabled={!text}
              onClick={onSend}
            >
              Post
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
