import { Grid, Progress, Text } from "@chakra-ui/react";
import { ContentBox } from "./ContentBox";

type Props = {
  items: {
    name: string;
    value: number;
  }[];
};

export const Skill = ({ items }: Props) => {
  return (
    <ContentBox title="Skill">
      <Grid gap={8}>
        {items.map(({ name, value }, index) => {
          return (
            <Grid gridTemplateColumns="200px 1fr" key={index}>
              <Text>{name}</Text>
              <Progress
                value={value}
                backgroundColor="#F7F1EC"
                size="lg"
                height="1.4rem"
                borderRadius="5px"
                sx={{
                  "& > div": {
                    background: "#FDBDA3",
                  },
                }}
              />
            </Grid>
          );
        })}
      </Grid>
    </ContentBox>
  );
};
