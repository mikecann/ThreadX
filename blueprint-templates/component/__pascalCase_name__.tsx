import * as React from "react";

interface Props {
  children?: React.ReactNode;
}

export const {{pascalCase name}}: React.FC<Props> = ({children }) => {
  return <Box>{children}</Box>;
}