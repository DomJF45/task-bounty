import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  Button,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { dataBase } from "../../../data/dataBase";
import { FiChevronRight } from "react-icons/fi";

const Projects = () => {
  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 2, lg: 3 }} flex={1} rowGap={14}>
      {dataBase.projects.map((project) => (
        <Flex
          direction={"column"}
          width={"300px"}
          height={"275px"}
          border={"1px solid"}
          borderRadius={"12px"}
          borderColor={"gray.300"}
          p={4}
          position={"relative"}
        >
          <Heading
            size={"md"}
            textDecoration={"underline"}
            textDecorationThickness={"1px"}
            textDecorationColor={"gray.300"}
            textUnderlineOffset={8}
          >
            {project.name}
          </Heading>
          <Box
            height={"100%"}
            width={"100%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
            gap={2}
          >
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
          </Box>
          <HStack
            position={"absolute"}
            bottom={3}
            left={0}
            width={"100%"}
            justifyContent={"space-between"}
            px={3}
          >
            <Text alignSelf={"flex-end"}>ID: {project.id}</Text>
            <Button
              variant={"outline"}
              colorScheme="orange"
              size={"sm"}
              as={RouterLink}
              to={project.name}
            >
              Go To Project <Icon as={FiChevronRight} />
            </Button>
          </HStack>
        </Flex>
      ))}
    </SimpleGrid>
  );
};

export default Projects;
