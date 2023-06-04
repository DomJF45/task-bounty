import {
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Image,
  Spinner,
  Box,
  Icon,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

export const Hero: React.FC = () => {
  const navigate = useNavigate();
  const breakpoint = useBreakpointValue({ base: 700, md: 1000 });

  return (
    <Container maxW={"5xl"} height={{ md: "100vh" }} position={"relative"}>
      {" "}
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 15 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "5xl", sm: "6xl", md: "8xl" }}
          lineHeight={"110%"}
          alignItems={"center"}
        >
          Task{" "}
          <Text as={"span"} color={"orange.400"}>
            Bounty
          </Text>
        </Heading>
        <Text color={"gray.500"} maxW={"3xl"}>
          {
            "Embrace collective ownership and collaborate on impactful projects. Seize the means of project planning by empowering your team with agile methodologies for efficient and democratic decision-making."
          }
        </Text>
        <Stack spacing={6} direction={"row"}>
          <Button
            colorScheme="orange"
            rounded={"full"}
            px={6}
            _hover={{ bg: "orange.500 " }}
            onClick={() => {
              navigate("/about");
            }}
          >
            Learn more
          </Button>
        </Stack>
        <Box
          mt={10}
          height={{ base: 0, sm: "100px", md: "300px" }}
          display={"flex"}
          alignItems={"center"}
        >
          <Image
            src={"/planning.png"}
            width={{ base: "150px", sm: "200px", md: "350px" }}
            fallback={<Spinner />}
          />
        </Box>
      </Stack>
      <Box
        color={"gray.600"}
        width={"100%"}
        display={"flex"}
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Icon
          as={ChevronDownIcon}
          boxSize={10}
          cursor={"pointer"}
          transition={".3s ease"}
          onClick={() => {
            window.scrollTo({
              top: breakpoint,
              behavior: "smooth",
            });
          }}
          _hover={{
            boxSize: 12,
          }}
        />
        <Text>Scroll Down</Text>
      </Box>
    </Container>
  );
};
