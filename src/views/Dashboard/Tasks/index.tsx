import { Box, Heading, Text, useToast } from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
import { getTokenFromLocalStorage } from "../../../utils/getUserFromLocalStorage";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getUserProjects, reset } from "../../../features/projectSlice";

const TasksPage = () => {
  const { projects, error } = useAppSelector((state) => state.project);
  const dispatch = useAppDispatch();
  const toast = useToast();
  const fetchProjects = useCallback(async () => {
    const token = getTokenFromLocalStorage();
    if (token !== undefined) {
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
  }, [dispatch, error, toast]);

  useEffect(() => {
    fetchProjects();
    return () => {
      dispatch(reset());
    };
  }, [dispatch, fetchProjects]);

  return (
    <Box>
      <Heading>Tasks</Heading>
      {projects && projects.map((project) => <Text>{project.name}</Text>)}
    </Box>
  );
};

export default TasksPage;
