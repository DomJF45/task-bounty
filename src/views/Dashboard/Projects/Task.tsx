import { HStack, Icon, Text } from "@chakra-ui/react";
import { FaCoins, FaCheck } from "react-icons/fa6";
import { AiOutlineClockCircle } from "react-icons/ai";
import {} from "react-beautiful-dnd";
import { CgDanger } from "react-icons/cg";
import { GrTest } from "react-icons/gr";
import { Card, CardHeader, CardFooter } from "../../../components/Card";
import { iTask } from "../../../data/dataBase";
import { IconType } from "react-icons";

interface TaskProps {
  task: iTask;
  columnName: string;
}

const Task: React.FC<TaskProps> = ({ task, columnName }) => {
  const iconMap: {
    [key: string]: {
      icon: IconType;
      color: string;
    };
  } = {
    "Not Started": {
      icon: CgDanger,
      color: "red.200",
    },
    "In Progress": {
      icon: AiOutlineClockCircle,
      color: "yellow.300",
    },
    "In Review": {
      icon: GrTest,
      color: "blue.200",
    },
    Complete: {
      icon: FaCheck,
      color: "green.200",
    },
  };

  return (
    <Card width={"100%"} height={90} borderRadius={"5px"}>
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
            <Text as={"span"}>{task.yeild}</Text>
          </HStack>
        </CardHeader>
      </HStack>
      <CardFooter unitId={+task.id}>
        <Icon
          as={iconMap[columnName].icon}
          color={iconMap[columnName].color}
          size={20}
        />
      </CardFooter>
    </Card>
  );
};

export default Task;
