import {
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Image,
  Spinner,
  Box,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxW={"5xl"} height={"90vh"}>
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
            rounded={"full"}
            px={6}
            colorScheme={"orange"}
            bg={"orange.400"}
            _hover={{ bg: "orange.500" }}
          >
            Get started
          </Button>
          <Button
            rounded={"full"}
            px={6}
            onClick={() => {
              navigate("/about");
            }}
          >
            Learn more
          </Button>
        </Stack>
        <Box height={"300px"} display={"flex"} alignItems={"center"}>
          <Image
            src={"/planning.png"}
            width={{ base: "250px", sm: "200px", md: "350px" }}
            fallback={<Spinner />}
          />
        </Box>
      </Stack>
    </Container>
  );
};
