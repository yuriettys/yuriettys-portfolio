import fs from "fs/promises";
import matter from "gray-matter";
import { Link, Text, Grid, GridItem, Stack } from "@chakra-ui/react";
import { PostMetaData } from "../../type";
import NextLink from "next/link";
import Head from "next/head";
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
      <Head>
        <title>yuriettys portfolio</title>
        <meta name="description" content="story一覧" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
          gridTemplateColumns="1fr"
          gap="32px"
          alignContent="flex-start"
        >
          <ContentBox title="Story">
            <Stack>
              {posts.map(({ id, data }) => {
                return (
                  <NextLink passHref href={`/story/${id}`} key={id}>
                    <Link p={2} borderBottom="1px solid #F7F1EC">
                      <Text fontSize="sm" color="#04565C">
                        {data.term}
                      </Text>
                      <Text>{data.title}</Text>
                      <Text>{data.role}</Text>
                    </Link>
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
