import { Lists } from "./lists/Lists";
import { Box, Image } from "@chakra-ui/react";
import useStoreUserEffect from "./auth/useStoreUserEffect";
import { AppSidebar } from "./app/AppSidebar";
import github from "./github-corner-right.svg";

export default function App() {
  useStoreUserEffect();
  return (
    <Box background={`#121212`} position={"relative"}>
      <AppSidebar />
      <Lists />
      <Image
        position={"absolute"}
        cursor={"pointer"}
        onClick={() => window.open(`https://github.com/mikecann/ThreadX`, `_blank`)}
        top={0}
        right={0}
        src={github}
      />
    </Box>
  );
}
