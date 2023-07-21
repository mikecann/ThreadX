import * as React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { Horizontal } from "../../common/layout/Horizontal";
import { Box } from "../../common/layout/styled";
import { IconButton } from "../../common/buttons/IconButton";

interface Props {}

export const MessageActionButtons: React.FC<Props> = ({}) => {
  return (
    <Horizontal>
      <IconButton>
        <AiOutlineHeart />
      </IconButton>
    </Horizontal>
  );
};
