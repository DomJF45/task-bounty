import { useState, useCallback } from "react";
import {
  Heading,
  SimpleGrid,
  Text,
  Button,
  Icon,
  useToast,
  Skeleton,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { iProject } from "../../../data/dataBase";
import { FiChevronRight } from "react-icons/fi";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "../../../components/Card";
import { getUserProjects } from "../../../features/projectService";
import { reset } from "../../../features/projectSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useEffect } from "react";
import getUserFromLocalStorage from "../../../utils/getUserFromLocalStorage";

const Projects = () => {
  const { projects, loading, success, error } = useAppSelector(
    (state) => state.project
  );
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [userProjects, setUserProjects] = useState<iProject[]>([]);

  const fetchProjects = useCallback(async () => {
    const userId = getUserFromLocalStorage()?.id;
    if (userId) {
      await dispatch(getUserProjects(userId));
      if (success) {
        setUserProjects(projects);
      } else if (error) {
        toast({
          status: "error",
          title: error.message,
          position: "bottom-right",
          isClosable: true,
        });
      }
    }
  }, []);

  useEffect(() => {
    fetchProjects();

    return () => {
      dispatch(reset());
    };
  }, []);

  console.log("render");
  console.log({
    projects: projects,
  });
  return (
    <SimpleGrid
      columns={{ base: 1, sm: 1, md: 2, lg: 3, "2xl": 4 }}
      flex={1}
      rowGap={5}
      maxW={"1500px"}
    >
      {projects.map((project: iProject) => (
        <Skeleton
          width={{ base: "100%", md: "95%" }}
          isLoaded={!loading}
          key={project.id}
          borderRadius={"10px"}
        >
          <Card width={{ base: "100%", md: "95%" }}>
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
            <CardFooter unitId={+project.id}>
              <Button
                variant={"outline"}
                colorScheme="orange"
                size={"sm"}
                as={RouterLink}
                to={project.id}
              >
                Go To Project <Icon as={FiChevronRight} />
              </Button>
            </CardFooter>
          </Card>
        </Skeleton>
      ))}
    </SimpleGrid>
  );
};

export default Projects;
