import * as React from "react";
import { HStack, Text, Tooltip, VStack } from "@chakra-ui/react";
import { getDuration } from "../misc/time";
import { iife } from "../misc/misc";

interface Props {
  name: string;
  handle: string;
  createdAt: number;
}

export const UsernameHandleAndDate: React.FC<Props> = ({ name, handle, createdAt }) => {
  const { totalMinutes, totalMs, totalSeconds, totalHours, totalDays } = getDuration(
    createdAt,
    Date.now(),
  );
  return (
    <VStack justifyContent={"flex-start"} alignItems={"flex-start"} spacing={`0px`} width={"100%"}>
      <HStack width={"100%"}>
        <Text fontWeight={"bold"} flex={1}>
          {name}
        </Text>
        <Tooltip label={`Created: ${new Date(createdAt).toString()}`}>
          <Text color={"rgba(255,255,255,0.5)"} userSelect={"none"}>
            {iife(() => {
              if (totalSeconds < 60) return `${totalSeconds}s`;
              if (totalMinutes < 60) return `${totalMinutes}m`;
              if (totalHours < 24) return `${totalHours}h`;
              return `${totalDays}d`;
            })}
          </Text>
        </Tooltip>
      </HStack>
      <Text fontSize={"0.8em"} color={"rgba(255,255,255,0.5)"}>
        @{handle}
      </Text>
    </VStack>
  );
};
