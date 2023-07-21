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
import { SignInButton } from "@clerk/clerk-react";
import { AppSidebar } from "./app/AppSidebar";

export default function App() {
  return (
    <main>
      <AppSidebar />
      <Horizontal css={{ minHeight: "100vh", gap: "20px", marginLeft: 80 }}>
        {/*<NewMessageBox />*/}
        {/* <SignInButton mode="modal">
          <Button>Sign In</Button>
        </SignInButton> */}
        <MessageLists />
      </Horizontal>
    </main>
  );
}
