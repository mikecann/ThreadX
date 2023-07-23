import * as React from "react";
import { AiOutlinePicture } from "react-icons/ai";
import { HStack, IconButton } from "@chakra-ui/react";
import { useRef } from "react";

interface Props {
  onImageSelected: (file: File) => unknown;
}

export const AdditionalPostMediaOptions: React.FC<Props> = ({ onImageSelected }) => {
  const imageInputRef = useRef<HTMLInputElement>(null);

  // const importDefinition = async (files: FileList) => {
  //   logger.log("importing definition", files);
  //   const file = files.item(0);
  //   if (!file) return;
  //   const definition: ResearchTreeDefinition = JSON.parse(await file.text());
  //   logger.log("setting definition", definition);
  //   setDefinition(definition);
  //   definitionInputRef.current!.value = "";
  // };

  return (
    <HStack>
      <IconButton
        aria-label={"add image"}
        icon={<AiOutlinePicture />}
        variant={"ghost"}
        opacity={0.5}
        fontSize={"1.3em"}
        _hover={{ opacity: 1 }}
        onClick={() => imageInputRef.current?.click()}
      ></IconButton>
      <input
        onChange={(e) => {
          if (!e.target.files) return;
          onImageSelected(e.target.files[0]);
          imageInputRef.current!.value = "";
        }}
        type="file"
        accept={".jpg,.jpeg,.png,.gif"}
        ref={imageInputRef}
        style={{ display: "none" }}
      />
    </HStack>
  );
};
