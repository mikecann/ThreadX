import * as React from "react";
import { Box, IconButton, Image } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

interface Props {
  src: string;
  onRemove: () => unknown;
}

export const PreviewImage: React.FC<Props> = ({ src, onRemove }) => {
  return (
    <Box position={"relative"}>
      <Image src={src} maxWidth={"200px"} maxHeight={"200px"} />
      <IconButton
        size={"sm"}
        position={"absolute"}
        top={0}
        right={0}
        aria-label={"Remove image"}
        icon={<FaTrash />}
        onClick={onRemove}
      />
    </Box>
  );
};
