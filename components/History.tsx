import { Flex, Grid, Text } from "@chakra-ui/react";
import { ContentBox } from "./ContentBox";

type Props = {
  items: {
    date: string;
    name: string;
    position: string;
  }[];
};

export const History = ({ items }: Props) => {
  return (
    <ContentBox title="History">
      <Grid gap="4">
        {items.map(({ name, date, position }, index) => {
          return (
            <Flex
              gap={4}
              key={index}
              flexDirection="column"
              paddingLeft={6}
              borderLeft="10px solid #04565C"
            >
              <Text>{date}</Text>
              <Text>{name}</Text>
              <Text>{position}</Text>
            </Flex>
          );
        })}
      </Grid>
    </ContentBox>
  );
};
