import fs from "fs/promises";
import matter from "gray-matter";
import { Box, Text, Grid, GridItem, Stack } from "@chakra-ui/react";
import { PostMetaData } from "../../type";
import NextLink from "next/link";
import { Navigation } from "../../components/Navigation";
import { ContentBox } from "../../components/ContentBox";

type Posts = {
  id: string;
  data: PostMetaData;
}[];

type Props = {
  posts: Posts;
};

const StoryIndex = ({ posts }: Props) => {
  return (
    <>
      <Grid
        gridTemplateColumns="200px 1fr"
        height="100%"
        gridTemplateRows="1fr"
      >
        <GridItem>
          <Navigation />
        </GridItem>
        <Grid
          backgroundColor="#F5F5F5"
          padding={8}
          gridTemplateColumns="70% 1fr"
          gridTemplateRows="auto auto auto"
          gap="32px"
          alignContent="flex-start"
        >
          <ContentBox title="Story">
            <Stack>
              {posts.map(({ id, data }) => {
                return (
                  <NextLink href={`/story/${id}`}>
                    <Box key={id} p={2} borderBottom="1px solid #F7F1EC">
                      <Text fontSize="sm" color="#04565C">
                        {data.term}
                      </Text>
                      <Text>{data.name}</Text>
                      <Text>{data.title}</Text>
                    </Box>
                  </NextLink>
                );
              })}
            </Stack>
          </ContentBox>
        </Grid>
      </Grid>
    </>
  );
};

export default StoryIndex;

export const getStaticProps = async () => {
  const postsDir = "./data/posts";
  const postPaths = await fs.readdir(postsDir);

  const posts = await Promise.all(
    postPaths.map(async (postPath) => {
      const file = await fs.readFile(`${postsDir}/${postPath}`, "utf-8");
      const { data } = matter(file);
      const id = postPath.split(".")[0];
      return {
        id,
        data,
      };
    })
  );

  return {
    props: {
      posts,
    },
  };
};
