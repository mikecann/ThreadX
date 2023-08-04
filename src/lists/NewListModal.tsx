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
  Radio,
  RadioGroup,
  Stack,
  Switch,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useConvexAuth, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useErrors } from "../common/misc/useErrors";
import { useClerk } from "@clerk/clerk-react";
import { match } from "../common/misc/match";

interface Props {
  isOpen: boolean;
  onClose: () => unknown;
}

type List =
  | {
      kind: "all_messages";
      ownerId: string;
      name: string;
    }
  | {
      kind: "search";
      ownerId: string;
      name: string;
      query: string;
      includeReplies: boolean;
    };

type ListData = (typeof api.lists.create)["_args"]["data"];
type ListKind = ListData["kind"];

export const NewListModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [name, setName] = useState("My List");
  const [kind, setKind] = React.useState<ListKind>("all_messages");
  const [queryTerm, setQueryTerm] = useState("");
  const [includeReplies, setIncludeReplies] = useState(false);
  const create = useMutation(api.lists.create);
  const { onNonCriticalError } = useErrors();
  const clerk = useClerk();
  const { isAuthenticated } = useConvexAuth();

  console.log("includeReplies", includeReplies);

  const onCreate = () => {
    if (!isAuthenticated) {
      clerk.openSignIn();
      return;
    }

    create({
      data: match(kind, {
        all_messages: ({ kind }) => ({ kind, name }),
        search: ({ kind }) => ({ kind, name, query: queryTerm, includeReplies }),
      }),
    })
      .then(() => {
        setName("");
        setQueryTerm("");
        setKind("all_messages");
        setIncludeReplies(false);
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
            {/*<FormControl>*/}
            {/*  <FormLabel>List Kind</FormLabel>*/}
            {/*  <RadioGroup onChange={(e) => setKind(e as ListKind)} value={kind}>*/}
            {/*    <Stack direction="row">*/}
            {/*      <Radio value="all_messages">All Messages</Radio>*/}
            {/*      <Radio value="search">Search</Radio>*/}
            {/*    </Stack>*/}
            {/*  </RadioGroup>*/}
            {/*</FormControl>*/}

            {match(kind, {
              search: () => (
                <>
                  <FormControl>
                    <FormLabel>Term</FormLabel>
                    <Input
                      value={queryTerm}
                      onChange={(e) => setQueryTerm(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") onCreate();
                      }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Include Replies</FormLabel>
                    <Switch
                      isChecked={includeReplies}
                      onChange={(e) => setIncludeReplies(e.target.checked)}
                    />
                  </FormControl>
                </>
              ),

              all_messages: () => null,
            })}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            css={{ transition: `all 0.2s ease` }}
            isDisabled={match(kind, {
              all_messages: () => !name,
              search: () => !name || queryTerm.length == 0,
            })}
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
