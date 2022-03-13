//library
import {
  Container,
  Box,
  Divider,
  Flex,
  Text,
  Center,
  Stack,
  Heading,
  Button,
  useTheme,
  SimpleGrid,
  Image,
  Grid,
  GridItem,
} from "@chakra-ui/react";

import { Star, Check, Checks, CheckCircle } from "phosphor-react";
//native libraries
import Link from "next/link";
//components
import Layout from "../layout";
import Comments from "../Comments";
import Loading from "../Loading";
//assets

import { useEffect, useState } from "react";
import { NextPage } from "next/types";
import Map from "../Maps/Map";
import LocatorButton from "../Maps/LocatorButton";
const categories = [
  {
    name: "Electricista",
    subcategories: ["Instalaciones", "Iluminacion", "Electricidad general"],
  },
  {
    name: "Plomero",
    subcategories: [
      "Sanitarios",
      "Griferia",
      "Filtraciones",
      "Calderas",
      "Bombas de agua",
      "Pozos septicos",
      "Tanques de agua",
    ],
  },
  {
    name: "Gasista",
    subcategories: [
      "Artefactos a gas",
      "Instalacion de calderas",
      "Reparacion de calderas",
    ],
  },
];

interface User {
  userId: string;
}

const ProfessionalLanding: React.FC<any> = (props) => {
  const theme = useTheme();
  const [dataUser, setDataUser] = useState<any>({});
  const [mapObject, setMapObject] = useState(null);
  const user = JSON.parse(props.user);

  useEffect(() => {}, [user]);

  if (!user) return <Loading />;

  return (
    <Layout>
      <Container maxW={"container.xl"}>
        <Flex
          flexDirection={"row"}
          justifyContent={"space-evenly"}
          alignItems={"center"}
          flexWrap={{ base: "wrap", md: "wrap", lg: "nowrap" }}
        >
          <Box margin={"1rem"}>
            <Image
              src={user.profilePic}
              borderRadius="full"
              boxSize={{ base: "150px", md: "200px", lg: "250px" }}
              margin={{ base: "0rem", md: "1rem", lg: "1rem" }}
              alt={user.name}
              objectFit={"cover"}
            ></Image>
          </Box>
          <Flex flexDirection={"column"}>
            <Flex
              flexDirection={"row"}
              alignItems={"center"}
              flexWrap={{ base: "wrap", md: "wrap", lg: "nowrap" }}
              justifyContent={"center"}
            >
              <Flex padding={"1rem"} flexDirection={"column"}>
                <Heading fontSize={{ base: "1rem", md: "1.2rem", lg: "2rem" }}>
                  {user.name}
                </Heading>

                <Text color={"medium_green"}>Plomero</Text>
                <Text>{user.address.name}</Text>

                <Flex flexDirection={"column"}>
                  <Flex flexDirection={"row"}>
                    <Star size={20} weight="fill" />

                    <Text
                      ml={"0.5rem"}
                      fontSize={{ base: "0.7rem", md: "0.8rem", lg: "1rem" }}
                    ></Text>
                  </Flex>
                  <Flex flexDirection={"row"}>
                    <Check size={20} weight="fill" />
                    <Text
                      ml={"0.5rem"}
                      fontSize={{ base: "0.7rem", md: "0.8rem", lg: "1rem" }}
                    >
                      900 Trabajos realizados
                    </Text>
                  </Flex>
                  <Flex flexDirection={"row"}>
                    <Checks size={20} weight="fill" />
                    <Text
                      ml={"0.5rem"}
                      fontSize={{ base: "0.7rem", md: "0.8rem", lg: "1rem" }}
                    >
                      97% formalidad
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
              <Flex flexDirection={"column"} alignItems={"center"}>
                <Link
                  href={{ pathname: "/request/new", query: { id: "123" } }}
                  as="nueva-solicitud"
                  passHref
                >
                  <Box
                    as={"button"}
                    width={{ base: "150px", md: "200px", lg: "250px" }}
                    height={{ base: "30px", md: "35px", lg: "40px" }}
                    borderRadius={"10px"}
                    bg={"medium_green"}
                    color={"white"}
                    fontSize={{ base: "1rem", md: "1.2rem", lg: "1.4rem" }}
                  >
                    Pedir Cotizacion
                  </Box>
                </Link>
                <Flex
                  flexDirection={"row"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  padding={"0.5rem"}
                >
                  <CheckCircle
                    size={30}
                    weight="fill"
                    color={theme.colors.medium_green}
                  />
                  <Text fontSize={"0.6rem"}>
                    TOP (dentro de los 20 mejores de la zona)
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Container maxW={"container.lg"} p={"0 "} margin={"0 1em"}>
          <Flex margin={"1rem"} flexDirection={"column"} textAlign={"start"}>
            <Heading fontSize={"1.5rem"} margin={"1rem"}>
              {user.description}
            </Heading>
            <Text fontSize={"1rem"} margin={"0.5rem"}></Text>
          </Flex>
          <Divider margin={"1em 0"}></Divider>
        </Container>
        <Container maxW={"container.lg"} p={"0 "} margin={"0 1em"}>
          <Flex flexDirection={"column"}>
            <Flex
              flexWrap={{
                base: "wrap",
                md: "wrap",
                lg: "nowrap",
              }}
            >
              <Stack>
                <Box>
                  <Heading
                    fontSize={{ base: "1rem", md: "1.2rem", lg: "1.5rem" }}
                    color={"light_grey_sub"}
                  >
                    DESCRIPCION
                  </Heading>
                  <Text margin={"1em"}>
                    Me gusta la cumbia y coleccionar cupones de descuentos.
                  </Text>
                </Box>
                <Divider></Divider>
                <Box margin={"1em 0"}>
                  <Heading
                    fontSize={{
                      base: "1rem",
                      md: "1.2rem",
                      lg: "1.5rem",
                    }}
                    color={"light_grey_sub"}
                  >
                    TRABAJOS REALIZADOS
                  </Heading>
                  <Flex
                    flexDirection={"row"}
                    flexWrap={{ base: "wrap", md: "wrap", lg: "nowrap" }}
                  >
                    <Image
                      maxW="100px"
                      src="https://s03.s3c.es/imag/_v0/770x420/6/4/2/Google-maps-nueva-york.jpg"
                      borderRadius={"0.3rem"}
                      alt="Dan Abramov"
                      margin={"1rem"}
                    ></Image>
                    <Image
                      maxW="100px"
                      src="https://s03.s3c.es/imag/_v0/770x420/6/4/2/Google-maps-nueva-york.jpg"
                      borderRadius={"0.3rem"}
                      alt="Dan Abramov"
                      margin={"1rem"}
                    ></Image>
                    <Image
                      maxW="100px"
                      src="https://s03.s3c.es/imag/_v0/770x420/6/4/2/Google-maps-nueva-york.jpg"
                      borderRadius={"0.3rem"}
                      alt="Dan Abramov"
                      margin={"1rem"}
                    ></Image>
                    <Image
                      maxW="100px"
                      src="https://s03.s3c.es/imag/_v0/770x420/6/4/2/Google-maps-nueva-york.jpg"
                      borderRadius={"0.3rem"}
                      alt="Dan Abramov"
                      margin={"1rem"}
                    ></Image>
                  </Flex>
                  <Divider margin={"1em 0"}></Divider>
                </Box>
                <Flex flexDirection={"column"} margin={"1rem"}>
                  <Heading
                    fontSize={{
                      base: "1rem",
                      md: "1.2rem",
                      lg: "1.5rem",
                    }}
                    color={"light_grey_sub"}
                  >
                    DOCUMENTACION
                  </Heading>
                  <Flex flexDirection={"row"}>
                    <Image
                      maxW="100px"
                      src="https://www.mercurynews.com/wp-content/uploads/2019/06/SCHWARZENEGGER_DIPLOMAS_2_.jpg?w=1442"
                      borderRadius="0.4rem"
                      alt="Dan Abramov"
                      margin={"1rem"}
                    ></Image>
                    <Image
                      maxW="100px"
                      src="https://m.media-amazon.com/images/I/81q4U2Jtg7L._AC_SL1500_.jpg"
                      borderRadius="0.4rem"
                      alt="Dan Abramov"
                      margin={"1rem"}
                    ></Image>
                  </Flex>
                  <Divider margin={"1em 0"}></Divider>
                </Flex>
              </Stack>
              <Box margin={"1rem"}>
                <Heading
                  fontSize={{ base: "1rem", md: "1.2rem", lg: "1.5rem" }}
                  color={"light_grey_sub"}
                >
                  UBICACION
                </Heading>
                <Map setMapObject={setMapObject}></Map>
              </Box>
            </Flex>
            <Flex flexWrap={{ base: "wrap", md: "wrap", lg: "nowrap" }}>
              <Flex
                maxH={{ base: "550px", sm: "350px", md: "550px" }}
                overflowY="auto"
              >
                <Comments />
              </Flex>
              <Box borderRadius={"10px"} margin={"2em"}>
                <Flex
                  flexDirection={"column"}
                  padding={"1em"}
                  boxShadow={"lg"}
                  overflowY={"auto"}
                >
                  {categories?.map((cat, index) => {
                    return (
                      <Flex flexDirection={"column"} key={cat.name}>
                        <Heading
                          fontSize={{
                            base: "1rem",
                            md: "1.2rem",
                            lg: "1.5rem",
                          }}
                          color={"light_grey_sub"}
                          key={cat.name}
                        >
                          {cat.name}
                        </Heading>
                        <Box>
                          {cat.subcategories.map((sub, index) => (
                            <Text key={index}>{sub}</Text>
                          ))}
                        </Box>
                      </Flex>
                    );
                  })}
                </Flex>
              </Box>
            </Flex>
          </Flex>
        </Container>
      </Container>
    </Layout>
  );
};

export default ProfessionalLanding;
