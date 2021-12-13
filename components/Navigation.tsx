import { Box, Flex, Image, Link, List, ListItem, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";

export const Navigation = () => {
  const router = useRouter();
  const isActivePath = (pathname: string) => pathname === router.pathname;
  return (
    <Box bgColor="#F3EBE2" padding={8} paddingTop={32} height="100%">
      <Flex flexDirection={"column"} alignItems={"center"}>
        <Image
          src="https://pbs.twimg.com/profile_images/1071207669170495488/onOG5c38_400x400.jpg"
          alt="メンダコの画像"
          borderRadius="50%"
          width="100px"
        />
        <Text fontSize="lg" fontWeight={600} marginTop={4}>
          Nakajima Yurie
        </Text>
        <Text>
          <Link
            href="https://github.com/yuriettys"
            target={"_blank"}
            rel={"noopener"}
          >
            @yuriettys
          </Link>
        </Text>
      </Flex>
      <Box as="nav" marginTop={40} textAlign={"center"}>
        <List spacing={5}>
          <ListItem fontWeight={isActivePath("/") ? "600" : "400"}>
            <NextLink href="/">Profile</NextLink>
          </ListItem>
          <ListItem fontWeight={isActivePath("/story") ? "600" : "400"}>
            <NextLink href="/story">Story</NextLink>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};
