import * as React from "react";
import { Box } from "../common/layout/styled";
import { Horizontal } from "../common/layout/Horizontal";
import { AiOutlinePicture } from "react-icons/ai";
import { IconButton } from "../common/buttons/IconButton";

interface Props {}

export const AdditionalPostMediaOptions: React.FC<Props> = ({}) => {
  return (
    <Horizontal>
      <IconButton>
        <AiOutlinePicture />
      </IconButton>
    </Horizontal>
  );
};
