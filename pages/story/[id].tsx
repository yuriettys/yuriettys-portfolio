import fs from "fs/promises";
import matter from "gray-matter";
import { markdownToHtml } from "../../lib/markdownToHtml";
import { PostMetaData } from "../../type";
import { Heading, Box, Text } from "@chakra-ui/react";

type PostProps = {
  data: PostMetaData;
  content: string;
};

const StoryDetail = ({ data, content }: PostProps) => {
  return (
    <main>
      <Heading as="h1">{data.title}</Heading>
      <Box>
        <Text>{data.term}</Text>
        <Text>{data.name}</Text>
        <Text>{data.description}</Text>
      </Box>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </main>
  );
};

export default StoryDetail;

type Params = {
  id: string;
};

type Context = {
  params: Params;
};

export const getStaticProps = async ({ params }: Context) => {
  const file = await fs.readFile(`./data/posts/${params.id}.md`, "utf-8");
  const { data, content } = matter(file);

  return {
    props: {
      data: data,
      content: await markdownToHtml(content),
    },
  };
};

export const getStaticPaths = async () => {
  const posts = await fs.readdir("./data/posts");
  const paths = posts.map((fileName: string) => fileName.split(".")[0]);

  return {
    paths: paths.map((id) => ({
      params: {
        id,
      },
    })),
    fallback: false,
  };
};
