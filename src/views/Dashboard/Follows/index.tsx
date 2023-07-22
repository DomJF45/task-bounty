import { Heading, Flex, SimpleGrid, Button, Avatar } from "@chakra-ui/react";
import { Card } from "../../../components/Card";
import { FunctionComponent } from "react";

interface iFollower {
  id: string;
  name: string;
}

type FollowerProps = {
  follower: iFollower;
};

export const Follows: FunctionComponent<FollowerProps> = ({ follower }) => {
  return (
    <>
      <Card
        width={{ base: "80px", md: "70px" }}
        height={"70px"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Avatar name={follower.name + " " + "Jeff"} size={"md"} />
      </Card>
    </>
  );
};

type FollowersProps = {
  followers: { id: string; name: string }[];
};

export const Followers: FunctionComponent<FollowersProps> = ({ followers }) => {
  return (
    <>
      <Heading size={"sm"} alignSelf={"start"}>
        Followers
      </Heading>
      <Flex width={"100%"} pr={5} justifyContent={"space-evenly"}>
        <SimpleGrid columns={8} gap={5}>
          {followers.splice(0, 8).map((user: iFollower, index: number) => (
            <Follows key={index} follower={user} />
          ))}
        </SimpleGrid>
        <Button
          alignSelf={"center"}
          fontSize={"sm"}
          width={"80px"}
          variant={"solid"}
          colorScheme="orange"
          ml={8}
        >
          See All
        </Button>
      </Flex>
    </>
  );
};
