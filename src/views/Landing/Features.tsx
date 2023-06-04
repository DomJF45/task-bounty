import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

const Features: React.FC = () => {
  return (
    <Box p={4} mt={20} height={"100vh"}>
      <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
        <Heading fontSize={"3xl"}>Unlock the Power of Task Bounty</Heading>
        <Text color={"gray.600"} fontSize={"xl"}>
          Boost Productivity and Collaboration
        </Text>
      </Stack>

      <Container maxW={"6xl"} mt={10}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          {FEATURE_ITEMS.map((feature) => (
            <HStack key={feature.id} align={"top"}>
              <Box color={"orange.400"} px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack align={"start"}>
                <Text fontWeight={600}>{feature.title}</Text>
                <Text color={"gray.600"}>{feature.text}</Text>
              </VStack>
            </HStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

interface FeatureItem {
  id: number;
  title: string;
  text: string;
}

const FEATURE_ITEMS: FeatureItem[] = [
  {
    id: 1,
    title: "Streamlined Task Management",
    text: "Effortlessly create and manage tasks with our intuitive interface. Collaborate with project managers and product owners to define task requirements and assign them to individual contributors. Stay organized and ensure seamless coordination throughout the project lifecycle.",
  },
  {
    id: 2,
    title: "Arbitrary Experience and Rewards Points",
    text: "Assign arbitrary experience and rewards points to recognize and incentivize individual contributors. Acknowledge their expertise and dedication by allocating points that reflect their skills and contributions. Foster a sense of achievement and motivation within your distributed agile teams.",
  },
  {
    id: 3,
    title: "Enterprise-Employee Reward System",
    text: "Task Bounty doubles as an enterprise-employee reward system. As contributors complete tasks, they earn in-system currency, empowering them to obtain rewards for their outstanding work. Simplify and streamline employee recognition and reward systems, enhancing productivity through positive reinforcement.",
  },

  {
    id: 4,
    title: "Boosted Productivity and Motivation",
    text: "Increase motivation, productivity, and agency within your distributed agile teams. With Task Bounty, contributors have autonomy in selecting tasks, earning rewards, and receiving recognition for their contributions. Empower your teams to take ownership of their work, fostering a culture of productivity and collaboration.",
  },
  {
    id: 5,
    title: "Seamless Collaboration and Communication",
    text: "Facilitate seamless collaboration and communication among project managers, product owners, and contributors. Exchange ideas, provide feedback, and resolve queries within the Task Bounty platform. Enhance transparency and teamwork, ensuring everyone is aligned and working towards shared project goals.",
  },
  {
    id: 6,
    title: "Scalable for Enterprise Companies",
    text: "Task Bounty is designed to cater to the needs of medium to large enterprise companies. Whether you have a single team or multiple distributed teams, our platform scales effortlessly to accommodate your organization's requirements. Boost productivity outputs and streamline workflows across your entire enterprise.",
  },
];

export default Features;
