import * as React from "react";
import { Text } from "@chakra-ui/react";

interface Props {
  likes: BigInt;
}

export const RepliesAndLikes: React.FC<Props> = ({ likes }) => {
  return <Text color={"rgba(255,255,255,0.5)"}>85 replies . {likes.toString()} likes</Text>;
};
