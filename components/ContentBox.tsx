import React from "react";
import { Grid, Box, Heading } from "@chakra-ui/react";

type Props = {
  title: string;
};

export const ContentBox: React.FC<Props> = ({ title, children }) => {
  return (
    <Grid as="section" gridTemplateRows="auto 1fr">
      <Heading as="h2" fontSize="lg">
        {title}
      </Heading>
      <Box
        backgroundColor="#fff"
        padding={{ sm: 5, md: 8 }}
        marginTop={4}
        borderRadius={8}
        border={"#F2F0ED 1px solid"}
      >
        {children}
      </Box>
    </Grid>
  );
};
