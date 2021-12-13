import fs from "fs/promises";
import matter from "gray-matter";
import { markdownToHtml } from "../../lib/markdownToHtml";
import { PostMetaData } from "../../type";
import { Heading, Box, Text, Grid, GridItem, Image } from "@chakra-ui/react";
import { Navigation } from "../../components/Navigation";

type PostProps = {
  data: PostMetaData;
  content: string;
};

const StoryDetail = ({ data, content }: PostProps) => {
  return (
    <Box as="main" height="100%">
      <Grid
        gridTemplateColumns="200px 1fr"
        height="100%"
        gridTemplateRows="1fr"
      >
        <GridItem>
          <Navigation />
        </GridItem>
        <Grid padding={0} overflow="hidden" maxHeight={"100%"}>
          <Box overflow="auto">
            <Image
              src="/images/image1.jpg"
              width="100%"
              height="400px"
              fit="cover"
            ></Image>
            <Box padding="32px 80px">
              {/* <Heading as="h1">{data.title}</Heading> */}

              <Box textAlign="center" p={4} margin="40px 16px 48px">
                <Text fontSize="sm">{data.term}</Text>
                <Text marginTop={2}>{data.name}</Text>
                <Text fontSize="lg" marginTop={2}>
                  {data.description}
                </Text>
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
