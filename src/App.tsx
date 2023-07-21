import { MessageLists } from "./lists/MessageLists";
import { AppSidebar } from "./app/AppSidebar";
import { Box, Button, HStack } from "@chakra-ui/react";

export default function App() {
  return (
    <Box background={`linear-gradient(45deg, #180339, #022d10)`}>
      <AppSidebar />
      <HStack css={{ minHeight: "100vh", gap: "20px", marginLeft: 80 }}>
        {/*<NewMessageBox />*/}
        {/* <SignInButton mode="modal">
          <Button>Sign In</Button>
        </SignInButton> */}
        <MessageLists />
      </HStack>
    </Box>
  );
}
