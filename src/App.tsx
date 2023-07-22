import { Lists } from "./lists/Lists";
import { Box, Button, HStack, Spinner } from "@chakra-ui/react";
import useStoreUserEffect from "./auth/useStoreUserEffect";
import { AppSidebar } from "./app/AppSidebar";

export default function App() {
  useStoreUserEffect();
  return (
    <Box background={`linear-gradient(45deg, #180339, #022d10)`}>
      <AppSidebar />
      <Lists />
    </Box>
  );
}
