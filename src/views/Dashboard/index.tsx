import { Stack } from "@chakra-ui/react";
import Stats from "./Stats";
import { KeyQuests, KeyTasks } from "./Quests";
import { Followers } from "./Follows";
import { useAppSelector } from "../../app/hooks";

const Dashboard = () => {
  const MOCK_FOLLOWS = [
    {
      id: "1",
      name: "john",
    },
    {
      id: "2",
      name: "dave",
    },
    {
      id: "3",
      name: "alex",
    },
    {
      id: "4",
      name: "sarah",
    },
    {
      id: "1",
      name: "john",
    },
    {
      id: "2",
      name: "dave",
    },
    {
      id: "3",
      name: "alex",
    },
    {
      id: "4",
      name: "sarah",
    },
    {
      id: "1",
      name: "john",
    },
    {
      id: "2",
      name: "dave",
    },
    {
      id: "3",
      name: "alex",
    },
    {
      id: "4",
      name: "sarah",
    },
    {
      id: "1",
      name: "john",
    },
    {
      id: "2",
      name: "dave",
    },
    {
      id: "3",
      name: "alex",
    },
    {
      id: "4",
      name: "sarah",
    },
  ];

  const { user } = useAppSelector((state) => state.user);

  return (
    <Stack width="100%" alignItems={"center"} gap={2}>
      <Stats />
      <KeyQuests keyProject={user ? user?.keyQuest : undefined} />
      <KeyTasks />
      <Followers followers={MOCK_FOLLOWS} />
    </Stack>
  );
};

export default Dashboard;
