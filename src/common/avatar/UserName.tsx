import * as React from "react";
import { Text } from "@nextui-org/react";

interface Props {
  name: string;
}

export const UserName: React.FC<Props> = ({ name }) => {
  return <Text css={{ fontWeight: "bold" }}>{name}</Text>;
};
