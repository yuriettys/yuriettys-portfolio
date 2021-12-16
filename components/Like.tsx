import { Grid, List, ListIcon, ListItem } from "@chakra-ui/react";
import { ContentBox } from "./ContentBox";
import { CheckCircleIcon } from "@chakra-ui/icons";

type Props = {
  items: {}[];
};

export const Like = ({ items }: Props) => {
  return (
    <ContentBox title="Like">
      <List spacing={3}>
        {items.map((text, index) => {
          return (
            <ListItem key={index}>
              <ListIcon as={CheckCircleIcon} color="#04565C" />
              {text}
            </ListItem>
          );
        })}
      </List>
    </ContentBox>
  );
};
