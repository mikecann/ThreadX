import * as React from "react";
import { Avatar, Dropdown, Popover, Text } from "@nextui-org/react";
// import { Avatar } from "../common/avatar/Avatar";
import { Box } from "../common/layout/styled";
import { useClerk, useUser } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";

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
      <Dropdown isOpen={isOpen} placement={"right-top"}>
        <Dropdown.Trigger>
          <Avatar
            css={{
              width: 50,
              height: 50,
              cursor: "pointer",
              "&:hover": { backgroundColor: `rgba(255,255,255,0.2)` },
            }}
            onClick={() => setIsOpen(!isOpen)}
          />
        </Dropdown.Trigger>
        {isAuthenticated ? (
          <Dropdown.Menu
            color="secondary"
            aria-label="Avatar Actions"
            onAction={(key) => {
              if (key === "logout") clerk.signOut();
              setIsOpen(false);
            }}
          >
            <Dropdown.Item key="profile" css={{ height: "$18" }} textValue={"foo"}>
              <Text b color="inherit" css={{ d: "flex" }}>
                Signed in as
              </Text>
              <Text b color="inherit" css={{ d: "flex" }}>
                {user?.primaryEmailAddress?.emailAddress}
              </Text>
            </Dropdown.Item>
            <Dropdown.Item key="logout" color="error" withDivider>
              Log Out
            </Dropdown.Item>
          </Dropdown.Menu>
        ) : (
          <Dropdown.Menu
            color="primary"
            aria-label="Avatar Actions"
            onAction={(key) => {
              if (key === "signin") clerk.openSignIn();
              setIsOpen(false);
            }}
          >
            <Dropdown.Item key="signin" textValue={"foo"}>
              Sign In
            </Dropdown.Item>
          </Dropdown.Menu>
        )}
      </Dropdown>
    </Box>
  );
};
