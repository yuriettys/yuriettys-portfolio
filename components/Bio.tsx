import { Grid, Text } from "@chakra-ui/react";
import { ContentBox } from "./ContentBox";

type Props = {
  items: {}[];
};

export const Bio = ({ items }: Props) => {
  return (
    <ContentBox title="Bio">
      <Grid gap="4">
        {items.map((text, index) => {
          return <Text key={index}>{text}</Text>;
        })}
      </Grid>
    </ContentBox>
  );
};
