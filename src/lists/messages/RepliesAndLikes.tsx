import * as React from "react";
import { Box } from "../../common/layout/styled";
import { Text } from "@nextui-org/react";

interface Props {}

export const RepliesAndLikes: React.FC<Props> = ({}) => {
  return (
    <Text size="$xs" color="rgba(255,255,255,0.5)">
      85 replies . 2,500 likes
    </Text>
  );
};
