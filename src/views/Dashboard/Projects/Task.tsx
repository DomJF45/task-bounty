import { HStack, Icon, IconButton, Text, useToast } from "@chakra-ui/react";
import { FaCheck, FaCoins } from "react-icons/fa6";
import {
  Card,
  CardHeader,
  CardFooter,
  CardBody,
} from "../../../components/Card";
import { iTask } from "../../../data/dataBase";

interface TaskProps {
  task: iTask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const toast = useToast();

  const handleComplete = () => {
    toast({
      status: "success",
      title: "Task Completed!",
      isClosable: true,
      position: "bottom-right",
    });
  };

  return (
    <Card width={"400px"} height={"100%"} borderRadius={"5px"}>
      <HStack justifyContent={"space-between"}>
        <CardHeader
          fontSize={"sm"}
          textDecoration={"none"}
          aria-label={`${task.name} list`}
        >
          {task.name}
        </CardHeader>
        <CardHeader
          size={"xs"}
          textDecoration={"none"}
          textOverflow={"ellipsis"}
        >
          <HStack>
            <Icon as={FaCoins} color={"orange.400"} />
            <Text as={"span"}>{task.expYield}</Text>
          </HStack>
        </CardHeader>
      </HStack>
      <CardBody
        minHeight={"100px"}
        height={"100%"}
        alignItems={"start"}
        justifyContent={"start"}
        py={5}
      >
        <Text textAlign={"start"}>{task.content}</Text>
      </CardBody>
      <CardFooter unitId={task.id}>
        <IconButton aria-label="drop-down" size={"sm"} onClick={handleComplete}>
          <Icon as={FaCheck} size={15} />
        </IconButton>
      </CardFooter>
    </Card>
  );
};

export default Task;
