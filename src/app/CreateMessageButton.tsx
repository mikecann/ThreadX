import * as React from "react";
import { Box } from "../common/layout/styled";
import { AiOutlinePlus } from "react-icons/ai";
import { Center } from "../common/layout/Center";

interface Props {}

export const CreateMessageButton: React.FC<Props> = ({}) => {
  return (
    <Center
      css={{
        width: 50,
        height: 50,
        borderRadius: 4,
        fontSize: 24,
        backgroundColor: "$blue600",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "$blue700",
        },
      }}
    >
      <AiOutlinePlus />
    </Center>
  );
};
