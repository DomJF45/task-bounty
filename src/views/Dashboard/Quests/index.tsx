import { Heading } from "@chakra-ui/react";
import { Card } from "../../../components/Card";
import { iProject } from "../../../data/dataBase";
import { FunctionComponent } from "react";

interface KeyQuestProps {
  keyProject: iProject | undefined;
}

export const KeyQuests: FunctionComponent<KeyQuestProps> = ({ keyProject }) => {
  return (
    <>
      <Heading alignSelf={"start"} size={"md"}>
        Key Quest
      </Heading>
      <Card width={"100%"} height={"100%"} minHeight={"100px"} maxW={"1300px"}>
        {keyProject && keyProject.name}
      </Card>
    </>
  );
};

export const KeyTasks = () => {
  return (
    <>
      <Heading alignSelf={"start"} size={"md"}>
        Key Tasks
      </Heading>
      <Card width={"100%"} height={"100%"} minHeight={"100px"} maxW={"1300px"}>
        {}
      </Card>
    </>
  );
};

export const Quests = () => {
  return (
    <Card width="100%" height={"80px"} maxW={"1200px"}>
      {}
    </Card>
  );
};
