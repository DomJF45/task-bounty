import { Heading, SimpleGrid, Text, Button, Icon } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { dataBase } from "../../../data/dataBase";
import { FiChevronRight } from "react-icons/fi";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "../../../components/Card";

const Projects = () => {
  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 2, lg: 3 }} flex={1} rowGap={14}>
      {dataBase.projects.map((project) => (
        <Card>
          <CardHeader>{project.name}</CardHeader>
          <CardBody>
            <Heading size={"3xl"} position={"relative"}>
              {project.completedTasks < 1 ? (
                <Text as={"span"} color={"gray.400"}>
                  {" "}
                  -{" "}
                </Text>
              ) : (
                <Text as={"span"} color={"orange.500"}>
                  {project.completedTasks}{" "}
                </Text>
              )}
              / {project.incompletedTasks}
            </Heading>

            <Text fontSize={"xs"}>completed</Text>
          </CardBody>
          <CardFooter unitId={project.id}>
            <Button
              variant={"outline"}
              colorScheme="orange"
              size={"sm"}
              as={RouterLink}
              to={project.name}
            >
              Go To Project <Icon as={FiChevronRight} />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </SimpleGrid>
  );
};

export default Projects;
