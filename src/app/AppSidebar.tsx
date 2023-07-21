import * as React from "react";
import { Horizontal } from "../common/layout/Horizontal";
import { Box } from "../common/layout/styled";
import { Center } from "../common/layout/Center";
import { Vertical } from "../common/layout/Vertical";
import { AppTitle } from "./AppTitle";
import { AiOutlinePlus } from "react-icons/ai";
import { Avatar } from "../common/avatar/Avatar";
import { Button, Popover } from "@nextui-org/react";
import { CreateMessageButton } from "./CreateMessageButton";
import { MyAvatar } from "./MyAvatar";

interface Props {}

export const AppSidebar: React.FC<Props> = ({}) => {
  return (
    <Vertical
      css={{
        background: "rgba(0,0,0,1)",
        minWidth: `20px`,
        height: `100vh`,
        position: "fixed",
        top: 0,
        left: 0,
        padding: "10px 10px",
        gap: 10,
      }}
    >
      <Center>
        <MyAvatar />
      </Center>
      <CreateMessageButton />
      <Box css={{ flex: 1 }} />
      <AppTitle />
    </Vertical>
  );
};
