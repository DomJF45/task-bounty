import { Box, Container, Heading, Stack, Text, Image } from "@chakra-ui/react";

const About = () => {
  const width = { base: "90%", sm: "90%", md: "800px" };
  const imgSize = { base: "150px", sm: "150px", md: "300px" };

  return (
    <Container>
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 15 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          alignItems={"center"}
        >
          About{" "}
          <Text as={"span"} color={"orange.400"}>
            Us
          </Text>{" "}
        </Heading>
        <Box
          display={"flex"}
          flexDir={{ base: "column", sm: "column", md: "row" }}
          width={width}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Image src={"/money-bag.png"} width={imgSize} />
          <Text color={"gray.500"} maxW={"3xl"} align={"start"}>
            {
              "Task Bounty is an enterprise-based task system where project managers and product owners can collaborate on creating tasks and assigning arbitrary experience and in-system rewards points for individual contributors working ontasks"
            }
          </Text>
        </Box>
        <Box
          display={"flex"}
          width={width}
          flexDir={{ base: "column", sm: "column", md: "row" }}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Image src={"/time-money.png"} width={imgSize} />
          <Text color={"gray.500"} maxW={"3xl"} align={"start"}>
            {
              "During task planning sessions, project managers and product owners will post new tasks that offer different rewards."
            }
          </Text>
        </Box>
        <Box
          display={"flex"}
          flexDir={{ base: "column", sm: "column", md: "row" }}
          width={width}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Image src={"/web.png"} width={imgSize} />
          <Text color={"gray.500"} maxW={"3xl"} align={"start"}>
            {
              "Individual contributors like software developers and product designers will then take tasks accordingly to what has been posted."
            }
          </Text>
        </Box>
        <Box
          display={"flex"}
          flexDir={{ base: "column", sm: "column", md: "row" }}
          width={width}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Image src={"/piggy-bank.png"} width={imgSize} />
          <Text color={"gray.500"} maxW={"3xl"} align={"start"}>
            {
              "Once a task is completed, project managers and product owners will not only award the provided bounties of the task to a worker but can also give extra bonuses based on their own criteria of task completion."
            }
          </Text>
        </Box>
      </Stack>
    </Container>
  );
};

export default About;
