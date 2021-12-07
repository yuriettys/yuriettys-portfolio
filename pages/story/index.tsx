import fs from "fs/promises";
import matter from "gray-matter";
import { markdownToHtml } from "../../lib/markdownToHtml";
import { Heading, Box, Text, List, ListItem } from "@chakra-ui/react";
import { PostMetaData } from "../../type";
import NextLink from "next/link";
import { Navigation } from "../../components/Navigation";

type Posts = {
  id: string;
  data: PostMetaData;
}[];

type Props = {
  posts: Posts;
};

const StoryIndex = ({ posts }: Props) => {
  return (
    <main>
      <Navigation />
      <List>
        {posts.map(({ id, data }) => {
          return (
            <ListItem key={id}>
              <NextLink href={`/story/${id}`}>{data.title}</NextLink>
            </ListItem>
          );
        })}
      </List>
    </main>
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
