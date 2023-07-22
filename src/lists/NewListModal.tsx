import * as React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useErrors } from "../common/misc/useErrors";

interface Props {
  isOpen: boolean;
  onClose: () => unknown;
}

export const NewListModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [name, setName] = useState("My List");
  const [queryTerm, setQueryTerm] = useState("");
  const create = useMutation(api.lists.create);
  const { onNonCriticalError } = useErrors();

  const onCreate = () => {
    create({ name, query: queryTerm })
      .then(() => {
        setName("");
        setQueryTerm("");
      })
      .catch(onNonCriticalError);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create List</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            <FormControl>
              <FormLabel>List Name</FormLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onCreate();
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Search</FormLabel>
              <Input
                value={queryTerm}
                onChange={(e) => setQueryTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onCreate();
                }}
              />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            css={{ transition: `all 0.2s ease` }}
            isDisabled={!name}
            colorScheme={"blue"}
            onClick={onCreate}
          >
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
