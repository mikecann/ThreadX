import * as React from "react";
import { Box, Button, HStack, Spinner, VStack } from "@chakra-ui/react";
import { DetailedMessage, Message } from "./Message";
import { NewReplyModal } from "./NewReplyModal";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { BsArrowUpShort } from "react-icons/bs";
import { BiSolidArrowToTop } from "react-icons/bi";
import { IoCreate } from "react-icons/io5";

interface Props {
  toMessage: DetailedMessage;
  onClose: () => unknown;
}

export const Replies: React.FC<Props> = ({ toMessage, onClose }) => {
  const [isReplyModalOpen, setIsReplyModalOpen] = React.useState(false);

  const messages = useQuery(api.messages.listReplies, { toMessageId: toMessage._id });
  if (!messages) return <Spinner />;

  return (
    <VStack
      marginLeft={"20px"}
      paddingLeft={"20px"}
      borderLeft={"1px dashed rgba(255,255,255,0.4)"}
      alignItems={"flex-start"}
    >
      <HStack width={"400px"}>
        <Button
          colorScheme={"blue"}
          leftIcon={<IoCreate />}
          onClick={() => setIsReplyModalOpen(true)}
        >
          Reply
        </Button>
        <Box flex={1} />
        <Button onClick={onClose} leftIcon={<BiSolidArrowToTop />}>
          Hide
        </Button>
        <NewReplyModal
          isOpen={isReplyModalOpen}
          onClose={() => setIsReplyModalOpen(false)}
          message={toMessage}
        />
      </HStack>
      {messages ? (
        messages.map((message) => <Message key={message._id.toString()} message={message} />)
      ) : (
        <Spinner />
      )}
    </VStack>
  );
};
