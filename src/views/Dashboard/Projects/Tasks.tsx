import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  SimpleGrid,
  Text,
  Icon,
} from "@chakra-ui/react";
import { dataBase, iTask } from "../../../data/dataBase";
import { iProject } from "../../../data/dataBase";
import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "../../../components/Card";
import { FaCoins } from "react-icons/fa6";

interface TaskProps {
  task: iTask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  return (
    <Card width={300} height={200}>
      <HStack justifyContent={"space-between"}>
        <CardHeader>{task.name}</CardHeader>
        <CardHeader size={"xs"} textDecoration={"none"}>
          <Icon as={FaCoins} color={"orange.500"} mr={1} />
          <Text as={"span"}>{task.yeild}</Text>
        </CardHeader>
      </HStack>
      <CardBody>
        <Heading>Heading</Heading>
      </CardBody>
      <CardFooter unitId={task.id}>
        <Button>Complete</Button>
      </CardFooter>
    </Card>
  );
};

const Tasks = () => {
  const [projectData, setProjectData] = useState<iProject>();
  const { projectName } = useParams();
  console.log(projectName);

  function getProjectFromDB(name: string): iProject {
    const { projects } = dataBase;
    return projects.filter((project: iProject) => project.name === name)[0];
  }

  const setProject = useCallback(() => {
    const name = projectName;
    if (name) {
      const filteredProject = getProjectFromDB(name);
      setProjectData(filteredProject);
    }
  }, [projectName]);

  console.log(projectData?.name);

  useEffect(() => {
    setProject();
  }, [setProject]);

  return (
    <Box width={"100%"} display={"flex"} flexDirection={"column"} rowGap={14}>
      <Heading>{projectName}</Heading>
      <Flex gap={10}>
        <Text size={"lg"}>Current Tasks:</Text>
        <SimpleGrid flex={1} columns={{ base: 1, md: 2, lg: 3 }}>
          {projectData?.tasks?.map((task: iTask) => (
            <Task task={task} key={task.id} />
          ))}
        </SimpleGrid>
      </Flex>
    </Box>
  );
};

export default Tasks;
