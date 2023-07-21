import { Button, ButtonProps } from "@nextui-org/react";
import * as React from "react";

interface Props extends ButtonProps {}

export const IconButton: React.FC<Props> = ({ css, ...rest }) => {
  return (
    <Button
      light
      auto
      css={{
        fontSize: "1.5em",
        color: `rgba(255,255,255,0.5)`,
        transition: "all 0.2s ease",
        cursor: "pointer",
        "&:hover": {
          color: `rgba(255,255,255,1)`,
        },
        ...css,
      }}
      {...rest}
    />
  );
};
