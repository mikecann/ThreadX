import { FormEvent, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { Button } from "@nextui-org/react";
import { Box } from "./common/layout/styled";
import { NewMessageBox } from "./newMessage/NewMessageBox";
import { Vertical } from "./common/layout/Vertical";
import { MessageList } from "./lists/MessageList";
import { Horizontal } from "./common/layout/Horizontal";
import { MessageLists } from "./lists/MessageLists";

export default function App() {
  return (
    <main>
      <Vertical css={{ minHeight: "100vh" }}>
        <h1>ThreadVex</h1>
        <NewMessageBox></NewMessageBox>
        <MessageLists />
      </Vertical>
    </main>
  );
}
