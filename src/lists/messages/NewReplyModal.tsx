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
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useConvexAuth, useMutation } from "convex/react";
import { useClerk } from "@clerk/clerk-react";
import { DetailedMessage, Message } from "./Message";
import { AdditionalPostMediaOptions } from "../../newMessage/AdditionalPostMediaOptions";
import { api } from "../../../convex/_generated/api";
import { useErrors } from "../../common/misc/useErrors";
import { useAttachImage } from "../../newMessage/useAttachImage";
import { PreviewImage } from "../../newMessage/PreviewImage";

interface Props {
  isOpen: boolean;
  onClose: () => unknown;
  message: DetailedMessage;
}

export const NewReplyModal: React.FC<Props> = ({ isOpen, onClose, message }) => {
  const { imagePreview, setSelectedImage, isUploading, storageId } = useAttachImage();

  const [text, setText] = useState("");
  const reply = useMutation(api.messages.reply);
  const { onNonCriticalError } = useErrors();
  const clerk = useClerk();
  const { isAuthenticated } = useConvexAuth();

  const onSend = () => {
    if (!isAuthenticated) {
      clerk.openSignIn();
      return;
    }

    reply({ body: text, toMessageId: message._id, imageId: storageId })
      .then(() => setText(""))
      .catch(onNonCriticalError);

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Reply</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            <Message disableActions={true} message={message} />
            <Textarea
              aria-label="New message box"
              placeholder="Your reply message"
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
            {imagePreview && (
              <PreviewImage src={imagePreview} onRemove={() => setSelectedImage(null)} />
            )}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <HStack width={"100%"}>
            <Box css={{ flex: 1 }}>
              <AdditionalPostMediaOptions onImageSelected={setSelectedImage} />
            </Box>
            <Button
              css={{ transition: `all 0.2s ease` }}
              color={"gradient"}
              isLoading={isUploading}
              isDisabled={!text || isUploading}
              onClick={onSend}
            >
              Post Reply
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
