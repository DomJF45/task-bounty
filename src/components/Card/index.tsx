import {
  Box,
  ContainerProps,
  Flex,
  FlexProps,
  HStack,
  Heading,
  HeadingProps,
  StackProps,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

interface CardProps extends FlexProps {
  children: React.ReactNode;
  ref?: (element: HTMLElement | null) => void;
}

export const Card: React.FC<CardProps> = ({ children, ...rest }) => {
  return (
    <Flex
      as={motion.div}
      whileHover={{
        y: -5,
        transition: { duration: 0.3 },
      }}
      direction={"column"}
      width={350}
      height={"275px"}
      borderRadius={"12px"}
      p={4}
      position={"relative"}
      backgroundColor={"white"}
      boxShadow={"md"}
      {...rest}
    >
      {children}
    </Flex>
  );
};

interface CardHeaderProps extends HeadingProps {
  children: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  ...rest
}) => {
  return (
    <Heading
      size={"md"}
      textDecoration={"underline"}
      textDecorationThickness={"1px"}
      textDecorationColor={"gray.300"}
      textUnderlineOffset={8}
      {...rest}
    >
      {children}
    </Heading>
  );
};

interface CardBodyProps extends ContainerProps {
  children: React.ReactNode;
}

export const CardBody: React.FC<CardBodyProps> = ({ children, ...rest }) => {
  return (
    <Box
      height={"100%"}
      width={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      gap={2}
      {...rest}
    >
      {children}
    </Box>
  );
};

interface CardFooterProps extends StackProps {
  children: React.ReactNode;
  unitId: number;
}

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  unitId,
  ...rest
}) => {
  return (
    <HStack
      position={"absolute"}
      bottom={3}
      left={0}
      width={"100%"}
      justifyContent={"space-between"}
      px={3}
      {...rest}
    >
      <Text fontSize={"xs"}>ID: {unitId}</Text>
      {children}
    </HStack>
  );
};
