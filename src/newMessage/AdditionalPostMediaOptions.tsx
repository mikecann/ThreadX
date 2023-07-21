import * as React from "react";
import { AiOutlinePicture } from "react-icons/ai";
import { HStack, IconButton } from "@chakra-ui/react";

interface Props {}

export const AdditionalPostMediaOptions: React.FC<Props> = ({}) => {
  return (
    <HStack>
      <IconButton
        aria-label={"add image"}
        icon={<AiOutlinePicture />}
        variant={"ghost"}
        opacity={0.5}
        fontSize={"1.3em"}
        _hover={{ opacity: 1 }}
      ></IconButton>
    </HStack>
  );
};
