import { useState } from "react";
import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import { dataBase, iTask } from "../../../data/dataBase";
import { iProject } from "../../../data/dataBase";
import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";

const Tasks = () => {
  const [projectData, setProjectData] = useState<iProject>();
  const { projectName } = useParams();
  console.log(projectName);
  function getProjectFromDB(name: string): iProject {
    const { projects } = dataBase;
    return projects.filter((project: iProject) => project.name != name)[0];
  }

  const setProject = useCallback(() => {
    const name = projectName;
    if (name) {
      const filteredProject = getProjectFromDB(name);
      setProjectData(filteredProject);
    }
  }, [projectName]);

  useEffect(() => {
    setProject();
  }, [setProject]);

  return (
    <Box>
      <Heading>Tasks</Heading>
      <Box>
        <SimpleGrid>
          {projectData?.tasks?.map((task: iTask) => (
            <Box>
              <Heading>{task.name}</Heading>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Tasks;
