import * as React from "react";
import { Box } from "../common/layout/styled";
import { Input, Button, Textarea, Text } from "@nextui-org/react";
import { Horizontal } from "../common/layout/Horizontal";
import { Center } from "../common/layout/Center";
import { Avatar } from "../common/avatar/Avatar";
import { Vertical } from "../common/layout/Vertical";
import { AdditionalPostMediaOptions } from "./AdditionalPostMediaOptions";
import { UserName } from "../common/avatar/UserName";
import { FormEvent, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

interface Props {}

export const NewMessageBox: React.FC<Props> = ({}) => {
  const [text, setText] = useState("");
  const sendMessage = useMutation(api.messages.send);

  const [name] = useState(() => "User " + Math.floor(Math.random() * 10000));

  return (
    <Horizontal
      css={{
        width: `400px`,
        background: "rgba(0,0,0,1)",
        border: `1px solid rgba(255,255,255,0.8)`,
        borderRadius: `6px`,
        padding: `10px`,
        gap: `20px`,
      }}
    >
      <Box>
        <Avatar />
      </Box>
      <Vertical css={{ flex: 1, gap: `10px` }}>
        <UserName name="mikeysee" />
        <Textarea
          aria-label="New message box"
          css={{ flex: 1 }}
          placeholder="Your new message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Horizontal>
          <Box css={{ flex: 1 }}>
            <AdditionalPostMediaOptions />
          </Box>
          <Button
            css={{ transition: `all 0.2s ease` }}
            color={"gradient"}
            auto
            disabled={!text}
            onClick={async (e) => {
              e.preventDefault();
              await sendMessage({ body: text, author: name });
              setText("");
            }}
          >
            Post
          </Button>
        </Horizontal>
      </Vertical>
    </Horizontal>
  );
};
