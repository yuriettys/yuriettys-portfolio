import fs from "fs/promises";
import matter from "gray-matter";
import { markdownToHtml } from "../../lib/markdownToHtml";
import { PostMetaData } from "../../type";
import { Heading, Box, Text, Grid, GridItem, Image } from "@chakra-ui/react";
import { Navigation } from "../../components/Navigation";
import Head from "next/head";

type PostProps = {
  data: PostMetaData;
  content: string;
};

const StoryDetail = ({ data, content }: PostProps) => {
  return (
    <>
      <Head>
        <title>yuriettys portfolio</title>
        <meta name="description" content="{data.title}" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box as="main" height="100%">
        <Grid
          display={{ sm: "block", md: "grid" }}
          gridTemplateColumns={{ sm: "1fr", md: "200px 1fr" }}
          height="100%"
          gridTemplateRows="1fr"
        >
          <GridItem>
            <Navigation />
          </GridItem>
          <Grid
            padding={0}
            overflow={{ sm: "visible", md: "hidden" }}
            maxHeight={"100%"}
          >
            <Box overflow="auto">
              <Box padding={{ sm: 5, md: "32px 80px" }}>
                <Heading as="h1">{data.title}</Heading>
                <Box margin="40px 0 48px">
                  <Text fontSize="sm">{data.term}</Text>
                  <Text marginTop={2}>{data.role}</Text>
                </Box>
                <div
                  dangerouslySetInnerHTML={{ __html: content }}
                  className="markdown-style"
                ></div>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
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
