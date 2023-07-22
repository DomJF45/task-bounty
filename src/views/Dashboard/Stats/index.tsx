import {
  Button,
  Divider,
  Flex,
  Heading,
  Progress,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Card, CardBody } from "../../../components/Card";
import { FiExternalLink } from "react-icons/fi";
import { useAppSelector } from "../../../app/hooks";

const Stats = () => {
  const { user } = useAppSelector((state) => state.user);

  return (
    <>
      <Heading alignSelf={"start"} size="md">
        Current Stats
      </Heading>
      <Card
        width={"100%"}
        height={"100%"}
        minH={"175px"}
        maxH={"300px"}
        maxW={"1300px"}
      >
        <CardBody>
          <Stack width={"100%"} padding={5} gap={5}>
            <Flex width={"100%"} justifyContent={"space-between"}>
              <Heading
                size={"md"}
                display={"flex"}
                gap={2}
                border={"1px solid"}
                borderColor={"gray.200"}
                borderRadius={"10px"}
                padding={2}
              >
                Level
                <Divider orientation="vertical" width={"1px"} />
                <Text as={"span"} color={"orange.400"}>
                  {user?.level}
                </Text>
              </Heading>
              <Progress
                zIndex={99}
                value={user?.progress}
                colorScheme="orange"
                size="lg"
                width={"80%"}
                borderRadius={5}
                alignSelf={"center"}
              />
            </Flex>
            <SimpleGrid columns={2} spacingX={80}>
              <Heading size={"md"} display={"flex"} gap={2}>
                Total Exp
                <Divider orientation="vertical" width={"1px"} />
                <Text as={"span"} color={"orange.400"}>
                  {user?.totalExp}
                </Text>
              </Heading>
              <Flex justifyContent={"space-between"}>
                <Heading size={"md"} width={"100%"} display={"flex"} gap={2}>
                  Total Points
                  <Divider orientation="vertical" width={"1px"} />
                  <Text as={"span"} color="orange.400">
                    {user?.totalPoints}
                  </Text>
                </Heading>
                <Button
                  variant={"solid"}
                  colorScheme="orange"
                  size={"sm"}
                  width={"60%"}
                  gap={2}
                >
                  Rewards Shop
                  <FiExternalLink />
                </Button>
              </Flex>
              <Heading size={"md"} display={"flex"} gap={2}>
                Total Exp This Month
                <Divider orientation="vertical" width={"1px"} />
                <Text as="span" color="orange.400">
                  {user?.totalExpThisMonth}
                </Text>
              </Heading>
              <Heading size={"md"} display={"flex"} gap={2}>
                Week Streak
                <Divider orientation="vertical" width={"1px"} />
                <Text as={"span"} color={"orange.400"}>
                  {user?.weekStreak} 🔥
                </Text>
              </Heading>
            </SimpleGrid>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
};

export default Stats;
