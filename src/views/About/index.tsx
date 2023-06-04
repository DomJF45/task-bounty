import { Flex, Container, Heading, Stack, Text, Image } from "@chakra-ui/react";

const About = () => {
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
        <Flex
          dir="row"
          width={"800px"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Text color={"gray.500"} maxW={"65%"} align={"start"}>
            {
              "Task Bounty is an enterprise-based task system where project managers and product owners can collaborate on creating tasks and assigning arbitrary experience and in-system rewards points for individual contributors working ontasks"
            }
          </Text>
          <Image src={"/money-bag.png"} width={"300px"} />
        </Flex>
        <Flex
          dir="row"
          width={"800px"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Image src={"/time-money.png"} width={"300px"} />
          <Text color={"gray.500"} maxW={"3xl"} align={"start"}>
            {
              "During task planning sessions, project managers and product owners will post new tasks that offer different rewards."
            }
          </Text>
        </Flex>
        <Flex
          dir="row"
          width={"800px"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Text color={"gray.500"} maxW={"3xl"} align={"start"}>
            {
              "Individual contributors like software developers and product designers will then take tasks accordingly to what has been posted."
            }
          </Text>
          <Image src={"/web.png"} width={"300px"} />
        </Flex>
        <Flex
          dir="row"
          width={"800px"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Image src={"/piggy-bank.png"} width={"300px"} />
          <Text color={"gray.500"} maxW={"3xl"} align={"start"}>
            {
              "Once a task is completed, project managers and product owners will not only award the provided bounties of the task to a worker but can also give extra bonuses based on their own criteria of task completion."
            }
          </Text>
        </Flex>
      </Stack>
    </Container>
  );
};

export default About;
