import * as React from "react";
import { Box, Button } from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import { NewListModal } from "./NewListModal";

interface Props {}

export const NewListButton: React.FC<Props> = ({}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Box>
      <Button leftIcon={<AiOutlinePlus />} variant={"outline"} onClick={() => setIsOpen(true)}>
        New List
      </Button>
      <NewListModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </Box>
  );
};
