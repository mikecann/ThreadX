import * as React from "react";
// import { Avatar } from "../common/avatar/Avatar";
import { useClerk, useUser } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

interface Props {
  children?: React.ReactNode;
}

export const MyAvatar: React.FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const clerk = useClerk();
  const { isAuthenticated } = useConvexAuth();
  const { user } = useUser();

  return (
    <Box>
      <Menu strategy={"absolute"}>
        <MenuButton
          as={Avatar}
          src={isAuthenticated ? user?.profileImageUrl : undefined}
          cursor={"pointer"}
          aria-label="Options"
        ></MenuButton>
        <MenuList>
          {isAuthenticated ? (
            <>
              <MenuGroup title={user?.primaryEmailAddress?.emailAddress}>
                <MenuItem icon={<FaSignOutAlt />} color={"danger"} onClick={() => clerk.signOut()}>
                  Sign out
                </MenuItem>
              </MenuGroup>
            </>
          ) : (
            <>
              <MenuItem icon={<FaSignInAlt />} onClick={() => clerk.openSignIn()}>
                Sign In
              </MenuItem>
            </>
          )}
        </MenuList>
      </Menu>
    </Box>
  );
};
