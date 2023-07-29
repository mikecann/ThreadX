import { Lists } from "./lists/Lists";
import { Box, Button, HStack, Spinner } from "@chakra-ui/react";
import useStoreUserEffect from "./auth/useStoreUserEffect";
import { AppSidebar } from "./app/AppSidebar";

export default function App() {
  useStoreUserEffect();
  return (
    <Box background={`#121212`}>
      <AppSidebar />
      <Lists />
    </Box>
  );
}
