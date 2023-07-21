import * as React from "react";
import { Text } from "@chakra-ui/react";

interface Props {
  name: string;
}

export const UserName: React.FC<Props> = ({ name }) => {
  return <Text fontWeight={"bold"}>{name}</Text>;
};
