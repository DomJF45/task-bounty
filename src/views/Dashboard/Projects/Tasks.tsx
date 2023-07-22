import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Flex,
  SimpleGrid,
  useToast,
  Button,
  Icon,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  InputGroup,
  ModalContent,
  ModalFooter,
  Text,
  InputLeftElement,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useDisclosure,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import { reset, getTasks, addTask } from "../../../features/projectSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import Task from "./Task";
import { iTask } from "../../../data/dataBase";
import { FaPlus } from "react-icons/fa6";
import { GiSwordSpin } from "react-icons/gi";

const Tasks = () => {
  const dispatch = useAppDispatch();
  const { tasks, success } = useAppSelector((state) => state.project);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { projectId } = useParams();

  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [expYield, setExpYeild] = useState(0);

  const handleAddTask = async () => {
    const task: iTask = {
      id: nanoid(),
      name: name,
      content: content,
      expYield: expYield,
      status: "Not Started",
      subTask: [],
    };
    if (projectId !== undefined) {
      await dispatch(addTask({ projectId, task }));
      if (success) {
        await fetchTasks();
        if (onClose !== undefined) {
          onClose();
          resetLocalState();
        }
        toast({
          status: "success",
          title: "Task Added",
          isClosable: true,
          position: "bottom-right",
        });
      }
    }
  };

  const resetLocalState = () => {
    setName("");
    setContent("");
    setExpYeild(0);
  };

  const fetchTasks = useCallback(async () => {
    if (projectId != undefined) {
      try {
        await dispatch(getTasks(projectId));
      } catch (error) {
        toast({
          status: "error",
          title: "Could Not Get Tasks",
          isClosable: true,
          position: "bottom-right",
        });
      }
    }
  }, [dispatch, projectId, toast]);

  useEffect(() => {
    fetchTasks();

    return () => {
      dispatch(reset());
    };
  }, [fetchTasks, dispatch]);

  console.log("render");

  return (
    <Box
      width={"100%"}
      height={"100%"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      rowGap={14}
    >
      <Flex width={"90%"} justifySelf={"center"} gap={5}>
        <SimpleGrid columns={2} rowGap={5} columnGap={5}>
          {tasks && tasks.map((task) => <Task key={task.id} task={task} />)}
        </SimpleGrid>
        <Button colorScheme="orange" variant={"solid"} gap={2} onClick={onOpen}>
          Add Task
          <Icon as={FaPlus} size={15} />
        </Button>
      </Flex>
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
                Task
              </Text>
            </Text>
            <Icon as={GiSwordSpin} color={"gray.600"} />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"} flexDir={"column"} gap={5}>
            <FormControl isRequired>
              <FormLabel display={"flex"} alignItems={"center"} gap={2}>
                Task Name
              </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents={"none"}>
                  <Icon color={"gray.600"} />
                </InputLeftElement>
                <Input
                  type={"text"}
                  isRequired
                  placeholder={"Task Name"}
                  value={name}
                  onChange={(e) => setName(e.currentTarget.value)}
                />
              </InputGroup>
            </FormControl>
            <FormControl isRequired width={"100%"}>
              <FormLabel>Content</FormLabel>
              <InputGroup gap={3}>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.currentTarget.value)}
                />
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
                  value={expYield}
                  onChange={(valueString) => setExpYeild(+valueString)}
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
            <Button colorScheme="green" onClick={handleAddTask}>
              Add Quest
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Tasks;
