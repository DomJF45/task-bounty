import { useState, useCallback } from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  Button,
  useToast,
  Skeleton,
  Stack,
  Icon,
  Tag,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { iUser, iProject } from "../../../data/dataBase";
import { FiPlus } from "react-icons/fi";
import { Link as RouterLink } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "../../../components/Card";
import { newProjectIncoming } from "../../../features/projectService";
import {
  reset,
  getUserProjects,
  addProject,
  takeProject,
} from "../../../features/projectSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useEffect } from "react";
import {
  getTokenFromLocalStorage,
  getUserFromLocalStorage,
} from "../../../utils/getUserFromLocalStorage";
import AddProjectModal from "./AddProjectModal";
import { FaCoins } from "react-icons/fa6";

const Projects = () => {
  const { projects, loading, takenLoading, success, error } = useAppSelector(
    (state) => state.project
  );
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [user, setUser] = useState<iUser>();

  const userTakeProject = async (projectId: string) => {
    await dispatch(takeProject(projectId));
    if (success) {
      toast({
        status: "success",
        title: "Accepted Quest!",
        isClosable: true,
        position: "bottom-right",
      });
      const token = getTokenFromLocalStorage();
      if (token !== undefined) {
        await dispatch(getUserProjects(token));
      }
    }
    dispatch(reset());
  };

  const fetchProjects = useCallback(async () => {
    const token = getTokenFromLocalStorage();
    console.log("Token from LS: " + getTokenFromLocalStorage());
    if (token !== undefined) {
      console.log("hit");
      console.log(token);
      await dispatch(getUserProjects(token));
      if (error) {
        toast({
          status: "error",
          title: error.message,
          position: "bottom-right",
          isClosable: true,
        });
      }
    }
    console.log(token);
  }, [dispatch, error, toast]);

  const handleAddProject = async (data: newProjectIncoming) => {
    await dispatch(addProject(data));
    if (success) {
      toast({
        status: "success",
        title: "Added a New Quest!",
        isClosable: true,
        position: "bottom-right",
      });
      fetchProjects();
    }
    if (error) {
      toast({
        status: "error",
        title: "Failed to add quest",
        isClosable: true,
        position: "bottom-right",
      });
    }
    dispatch(reset());
  };

  useEffect(() => {
    setUser(getUserFromLocalStorage());
    fetchProjects();
    return () => {
      dispatch(reset());
    };
  }, [dispatch, fetchProjects]);

  console.log(user?.id);

  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <SimpleGrid
      columns={{ base: 1, sm: 1, md: 2, lg: 3, "2xl": 4 }}
      flex={1}
      rowGap={5}
      maxW={"1500px"}
    >
      <AddProjectModal
        isOpen={isOpen}
        onClose={onClose}
        handleAddProject={handleAddProject}
      />
      {projects &&
        projects.map((project: iProject) => (
          <Skeleton
            width={{ base: "100%", md: "95%" }}
            isLoaded={!loading}
            key={project.id}
            borderRadius={"10px"}
          >
            <Card width={{ base: "100%", md: "95%" }}>
              <CardHeader
                display={"flex"}
                justifyContent={"space-between"}
                textDecoration={"none"}
                color={"blackAlpha.700"}
                fontWeight={"normal"}
              >
                {project.name}
                <Flex gap={2}>
                  <Icon as={FaCoins} color={"gray.400"} size={15} />
                  <Text fontSize={"xs"} color="orange.400">
                    {project.exp}
                  </Text>
                </Flex>
              </CardHeader>
              <CardBody>
                <Box
                  width={"100%"}
                  alignSelf={"center"}
                  as={RouterLink}
                  to={project.id}
                >
                  <Text
                    fontSize={"sm"}
                    textAlign={"center"}
                    fontWeight={"thin"}
                    color={"gray.700"}
                  >
                    RANK
                  </Text>
                  <Heading
                    size={"3xl"}
                    position={"relative"}
                    bgClip={"text"}
                    textAlign={"center"}
                    bgGradient={"linear(to-r, orange.300, orange.600)"}
                  >
                    {project.rank}
                  </Heading>
                </Box>
              </CardBody>
              <CardFooter unitId={project.id}>
                {project.takenBy ? (
                  <Tag px={5}>
                    <Text>{project?.takenBy}</Text>
                  </Tag>
                ) : (
                  <Button
                    colorScheme="orange"
                    isLoading={takenLoading}
                    variant={"outline"}
                    alignSelf={"center"}
                    gap={2}
                    borderRadius={"20px"}
                    onClick={() => userTakeProject(project.id)}
                  >
                    Take <FiPlus />
                  </Button>
                )}
              </CardFooter>
            </Card>
          </Skeleton>
        ))}
      <Stack
        height={"100%"}
        width={{ base: "100%", md: "95%" }}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Heading size={"md"} color={"gray.600"}>
          Add Quest
        </Heading>
        <Button variant={"solid"} colorScheme="orange" onClick={onOpen}>
          <FiPlus />
        </Button>
      </Stack>
    </SimpleGrid>
  );
};

export default Projects;
