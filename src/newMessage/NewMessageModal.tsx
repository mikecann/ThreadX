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
import { useClerks } from "@clerk/clerk-react";
import { useErrors } from "../common/misc/useErrors";

interface Props {
  isOpen: boolean;
  onClose: () => unknown;
}

export const NewMessageModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [text, setText] = useState("");
  const sendMessage = useMutation(api.messages.send);
  const { onNonCriticalError } = useErrors();
  const [name] = useState(() => "User " + Math.floor(Math.random() * 10000));
  const clerk = useClerk();
  const { isAuthenticated } = useConvexAuth();

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
              onClick={async (e) => {
                if (!isAuthenticated) {
                  clerk.openSignIn();
                  return;
                }
                sendMessage({ body: text, author: name })
                  .then(() => setText(""))
                  .catch(onNonCriticalError);
                onClose();
              }}
            >
              Post
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
