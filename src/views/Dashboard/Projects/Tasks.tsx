import { useEffect, useState, useCallback } from "react";
import {
  Box,
  Flex,
  Heading,
  Container,
  useToast,
  Skeleton,
} from "@chakra-ui/react";
import { iProject, iStatusColumn } from "../../../data/dataBase";
import { useParams } from "react-router-dom";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DragUpdate,
  DraggableDescriptor,
} from "react-beautiful-dnd";
import { iTask } from "../../../data/dataBase";
import { reset } from "../../../features/projectSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import Task from "./Task";
import { getProjectTasks } from "../../../features/projectService";

const Tasks = () => {
  const dispatch = useAppDispatch();
  const { tasks, loading, success, error } = useAppSelector(
    (state) => state.project
  );
  const toast = useToast();

  const [project, setProject] = useState<iProject>();
  const [columns, setColumns] = useState(tasks);
  const [endResult, setEndResult] = useState([]);

  const { projectId } = useParams();

  useEffect(() => {
    const getTasks = async () => {
      if (projectId !== undefined) {
        await dispatch(getProjectTasks(projectId));
      }
    };

    getTasks();
    if (success) {
      setColumns(tasks);
    }
    if (error) {
      toast({
        status: "error",
        title: "Error Finding Project",
        isClosable: true,
        position: "bottom-right",
      });
    }

    return () => {
      dispatch(reset());
    };
  }, []);

  console.log("render");

  function onDragEnd(
    result: DragUpdate,
    columns: iStatusColumn,
    setColumns: (prev: iStatusColumn) => void,
    setEndResult: (prev: any) => void, // eslint-disable-line @typescript-eslint/no-explicit-any
    endResult: DraggableDescriptor[]
  ) {
    const tempResult = [...endResult, result];
    setEndResult(tempResult);

    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];

      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];

      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
      console.log(endResult);
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  }

  return (
    <Box
      width={"100%"}
      height={"100%"}
      display={"flex"}
      flexDirection={"column"}
      rowGap={14}
    >
      <Heading>{project?.name}</Heading>
      <Flex
        overflowX={"auto"}
        height={"100%"}
        maxWidth={"1200px"}
        sx={{
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "5px",
            borderRadius: "20px",
            backgroundColor: `orange.100`,
          },
          "&::-webkit-scrollbar-thumb": {
            width: "5px",
            height: "5px",
            borderRadius: "5px",
            backgroundColor: `orange.300`,
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
          },
        }}
      >
        <DragDropContext
          onDragEnd={(result) => {
            onDragEnd(result, columns, setColumns, setEndResult, endResult);
          }}
        >
          {tasks &&
            Object.entries(tasks).map(([columnId, column]) => {
              return (
                <Container
                  minWidth={275}
                  padding={2}
                  borderRadius={"8px"}
                  backgroundColor={"gray.200"}
                  width={275}
                  height={400}
                  key={columnId}
                  display={"flex"}
                  flexDir={"column"}
                  gap={2}
                >
                  <Skeleton isLoaded={!loading} padding={2}>
                    <Heading size={"md"} mb={2}>
                      {column.name}
                    </Heading>
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => (
                        <Box
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          height={"fit-content"}
                          minHeight={"50%"}
                          maxH={"90%"}
                          zIndex={10}
                          pb={5}
                          borderRadius={"5px"}
                          // is dragging style
                          backgroundColor={
                            snapshot.isDraggingOver ? "orange.200" : "inherit"
                          }
                        >
                          <>
                            {column?.items.map((task: iTask, index: number) => (
                              <Draggable
                                key={task.id}
                                index={index}
                                draggableId={`draggable-${task.id}`}
                              >
                                {(provided, snapshot) => (
                                  <Box
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    // get style from snapshot
                                    zIndex={11}
                                    marginY={2}
                                  >
                                    <Task
                                      task={task}
                                      key={task.id}
                                      columnName={column.name}
                                    />
                                  </Box>
                                )}
                              </Draggable>
                            ))}
                          </>
                          {provided.placeholder}
                        </Box>
                      )}
                    </Droppable>
                  </Skeleton>
                </Container>
              );
            })}
        </DragDropContext>
      </Flex>
    </Box>
  );
};

export default Tasks;
