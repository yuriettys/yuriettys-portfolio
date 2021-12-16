import { Grid, GridItem, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { Navigation } from "../components/Navigation";
import bioJson from "../data/bio.json";
import likeJson from "../data/like.json";
import skillJson from "../data/skill.json";
import historyJson from "../data/history.json";
import { History } from "../components/History";
import { Skill } from "../components/Skill";
import { Like } from "../components/Like";
import { Bio } from "../components/Bio";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>yuriettys portfolio</title>
        <meta name="description" content="yuriettysのポートフォリオです" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Grid
        display={{ sm: "block", md: "grid" }}
        gridTemplateColumns={{ sm: "1fr", md: "200px 1fr" }}
        height="100%"
        gridTemplateRows="1fr"
      >
        <GridItem position={{ sm: "sticky" }} top={{ sm: 0 }}>
          <Navigation />
        </GridItem>
        <Grid
          backgroundColor="#F5F5F5"
          padding={8}
          gridTemplateColumns={{ sm: "1fr", md: "50% 1fr", xl: "70% 1fr" }}
          gridTemplateRows="auto auto auto"
          gap={8}
          alignContent="flex-start"
        >
          <Heading as="h1" fontSize="xl" gridColumn={{ sm: "1", md: "1/3" }}>
            Profile
          </Heading>
          <Bio items={bioJson} />
          <History items={historyJson} />
          <Skill items={skillJson} />
          <Like items={likeJson} />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
