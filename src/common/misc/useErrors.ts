import { useToast } from "@chakra-ui/react";

export const errorToString = (error: unknown): string => {
  if (error == undefined) return "";
  if (error instanceof Error) return `${error.name} - ${error.message}\n\n${error.stack}`;
  if (typeof error == "object") {
    if (error && "reason" in error) return errorToString(error.reason);
    if (error && "message" in error) return errorToString(error.message);
    return JSON.stringify(error);
  }
  return String(error);
};

export const useErrors = () => {
  const toast = useToast();
  return {
    onSilentError(e: any) {
      console.error(`onSilentError`, e);
    },
    onNonCriticalError(e: any) {
      console.error(`onNonCriticalError`, e);
      toast({
        status: "error",
        title: errorToString(e),
        isClosable: true,
      });
    },
    onCriticalError(e: any) {
      console.error(`onCriticalError`, e);
      toast({
        status: "error",
        title: errorToString(e),
        isClosable: true,
      });
    },
  };
};
