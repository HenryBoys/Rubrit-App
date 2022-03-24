//from modules
import { ReactNode } from "react";
//chakra
import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  VisuallyHidden,
  chakra,
  useColorModeValue,
  Link as ChakraLink,
} from "@chakra-ui/react";
//assets
import { TwitterLogo, YoutubeLogo, InstagramLogo } from "phosphor-react";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

const SocialButton = ({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) => {
  return (
    <chakra.button
      // bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        backgroundColor: useColorModeValue("blackAlpha.300", "whiteAlpha.200"),
        transform: "translate(0, -4px)",
        transition: " all 250ms",
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const Footer: React.FC = () => {
  const { status } = useSession();
  const router = useRouter();
  return (
    <Box
      bg={useColorModeValue("medium_grey", "dark_green")}
      color={useColorModeValue("dark_green", "medium_grey")}
      // h="30vh"
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8}>
          <Stack align={"flex-start"}>
            <ListHeader>Rubrit</ListHeader>
            <Link href={"/"}>
              <a>Inicio</a>
            </Link>
            <Link href={"/findServices"}>
              <a>Como Buscar Servicios</a>
            </Link>
            <Link href={"/offerServices"}>
              <a>Como Ofrecer Servicios</a>
            </Link>
            <Link href={"/aboutUs"}>
              <a>Sobre Nosotros</a>
            </Link>
            <Text
              cursor={"pointer"}
              onClick={() => {
                status === "authenticated"
                  ? router.push("/myAccount?site=offerServices")
                  : document.getElementById("signInButton")?.click();
              }}
            >
              Registrate como Profesional
            </Text>
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader>Soporte</ListHeader>
            <Link href={"/faqs"}>
              <a>FAQs</a>
            </Link>
            <Link href={"/comunityPrinciply"}>
              <a>Principios de la Comunidad</a>
            </Link>
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader>Legales</ListHeader>
            <Link href={"/cookiesPolicy"}>
              <a>Politica de Cookies</a>
            </Link>
            <Link href={"/privacyPolicy"}>
              <a>Politicas de Privacidad</a>
            </Link>
            <Link href={"/termService"}>
              <a>Terminos del Servicio</a>
            </Link>
          </Stack>
        </SimpleGrid>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("dark_green", "medium_grey")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ md: "space-between" }}
          align={{ md: "center" }}
          // h="6vh"
        >
          <Text>© 2022 Rubrit. All rights reserved</Text>
          <Stack direction={"row"} spacing={6}>
            <ChakraLink href="https://twitter.com/rubritapp" isExternal={true}>
              <SocialButton label={"Twitter"}>
                <TwitterLogo size={32} color="#2EB67D" weight="fill" />
              </SocialButton>
            </ChakraLink>
            <ChakraLink
              href="https://www.youtube.com/channel/UCD_bGN2BCe0UCpqFQXt68xA"
              isExternal={true}
            >
              <SocialButton label={"YouTube"}>
                <YoutubeLogo size={32} color="#2EB67D" weight="fill" />
              </SocialButton>
            </ChakraLink>
            <ChakraLink
              href="https://www.instagram.com/rubritapp/"
              isExternal={true}
            >
              <SocialButton label={"Instagram"}>
                <InstagramLogo size={32} color="#2EB67D" weight="fill" />
              </SocialButton>
            </ChakraLink>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
