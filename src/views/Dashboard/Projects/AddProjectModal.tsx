import { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  UseDisclosureProps,
  Icon,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { PiSword } from "react-icons/pi";
import { GiCrenulatedShield } from "react-icons/gi";
import { FunctionComponent } from "react";
import { newProjectIncoming } from "../../../features/projectService";
import { getUserFromLocalStorage } from "../../../utils/getUserFromLocalStorage";

type QuestRank = "S" | "A" | "B" | "C" | "D" | "E" | "F";

interface iAddProjectModalProps extends UseDisclosureProps {
  handleAddProject: (val: newProjectIncoming) => Promise<void>;
}

const AddProjectModal: FunctionComponent<iAddProjectModalProps> = ({
  onClose,
  isOpen,
  handleAddProject,
}) => {
  const [questName, setQuestName] = useState("");
  const [questRank, setQuestRank] = useState<QuestRank>("A");
  const [questExp, setQuestExp] = useState<number>(1);
  const user = getUserFromLocalStorage();

  const handleSubmit = () => {
    if (user) {
      const newQuest: newProjectIncoming = {
        name: questName,
        rank: questRank,
        exp: questExp,
      };
      handleAddProject(newQuest);
      if (onClose !== undefined) {
        onClose!();
      }
      setQuestName("");
      setQuestRank("A");
      setQuestExp(1);
    }
  };

  return (
    <Modal
      onClose={onClose!}
      isOpen={isOpen!}
      isCentered
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader display={"flex"} alignItems={"center"} gap={2}>
          <Text color={"gray.600"}>
            New {""}
            <Text as={"span"} color={"orange.400"}>
              Quest
            </Text>
          </Text>
          <Icon as={GiCrenulatedShield} color={"gray.600"} />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody display={"flex"} flexDir={"column"} gap={5}>
          <FormControl isRequired>
            <FormLabel display={"flex"} alignItems={"center"} gap={2}>
              Quest Name
            </FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents={"none"}>
                <Icon as={PiSword} color={"gray.600"} />
              </InputLeftElement>
              <Input
                type={"text"}
                isRequired
                placeholder={"Quest Name"}
                value={questName}
                onChange={(e) => setQuestName(e.currentTarget.value)}
              />
            </InputGroup>
          </FormControl>
          <FormControl isRequired width={"100%"}>
            <FormLabel>Rank</FormLabel>
            <InputGroup gap={3}>
              <Select
                onSelect={(e) =>
                  setQuestRank(e.currentTarget.value as QuestRank)
                }
              >
                <option value={"S"}>S</option>
                <option value={"A"}>A</option>
                <option value={"B"}>B</option>
                <option value={"C"}>C</option>
                <option value={"D"}>D</option>
                <option value={"E"}>E</option>
                <option value={"F"}>F</option>
              </Select>
            </InputGroup>
          </FormControl>
          <FormControl width={"50%"} isRequired>
            <HStack>
              <FormLabel>Exp Yield</FormLabel>
            </HStack>
            <InputGroup display={"flex"} gap={3}>
              <NumberInput
                defaultValue={1}
                min={1}
                max={1000}
                value={questExp}
                onChange={(valueString) => setQuestExp(+valueString)}
                width={"60%"}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </InputGroup>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="green" onClick={handleSubmit}>
            Add Quest
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddProjectModal;
