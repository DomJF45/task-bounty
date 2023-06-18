import {
  Box,
  chakra,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

interface StatsCardProps {
  title: string;
  children: React.ReactNode;
}

function StatsCard(props: StatsCardProps) {
  const { title, children } = props;
  return (
    <Stat
      px={{ base: 4, md: 8 }}
      py={"5"}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.800", "gray.500")}
      rounded={"lg"}
    >
      <StatLabel fontWeight={"medium"} isTruncated>
        {title}
      </StatLabel>
      <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
        {children}
      </StatNumber>
    </Stat>
  );
}

export default function Who() {
  return (
    <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1
        textAlign={"center"}
        fontSize={"4xl"}
        py={10}
        fontWeight={"bold"}
      >
        We{" "}
        <Text as={"span"} color={"orange.400"}>
          Help...
        </Text>
      </chakra.h1>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard title={"Benefit"}>
          <Text>Project Managers</Text>
        </StatsCard>
        <StatsCard title={"Empower"}>
          <Text>Inidividual Contributors</Text>
        </StatsCard>
        <StatsCard title={"Assist"}>
          <Text>Scrum Masters</Text>
        </StatsCard>
        <StatsCard title={"Liberate"}>
          <Text>The team</Text>
        </StatsCard>
        <StatsCard title={"Reward"}>
          <Text>Top Contributors</Text>
        </StatsCard>
        <StatsCard title={"Allocate"}>
          <Text>Complex Tasks</Text>
        </StatsCard>
      </SimpleGrid>
    </Box>
  );
}
