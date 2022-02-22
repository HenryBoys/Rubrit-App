//libraries
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
} from "@chakra-ui/react";
import {
  CalendarCheck,
  MagnifyingGlass,
  Calendar,
  CheckCircle,
  NumberCircleOne,
  NumberCircleTwo,
  NumberCircleThree,
  NumberCircleFour,
} from "phosphor-react";

//native libraries
import Link from "next/link";
//componentes
import Layout from "../layout";
import Comments from "../Comments";
//styles
import styles from "./FindServices.module.css";

const FindServices: React.FC = () => {
  const theme = useTheme();

  return (
    <Layout>
      <Container maxW="container.lg">
        <Flex justifyContent="center" padding={5}>
          <Text
            fontSize={{ base: "1.5rem", md: "2rem", lg: "2.5rem" }}
            fontWeight={500}
          >
            COMO FUNCIONA RUBRIT
          </Text>
        </Flex>
        <Flex>
          <Box>
            <div className={styles.containerCircles}>
              <div className={styles.circle}>
                <NumberCircleOne
                  size={80}
                  weight="fill"
                  color={theme.colors.medium_green}
                />
                <div className={styles.line}></div>
              </div>
              <div className={styles.circle}>
                <NumberCircleTwo
                  size={80}
                  weight="fill"
                  color={theme.colors.medium_green}
                />
                <div className={styles.line}></div>
              </div>
              <div className={styles.circle}>
                <NumberCircleThree
                  size={80}
                  weight="fill"
                  color={theme.colors.medium_green}
                />
              </div>
            </div>
          </Box>

          <Box>
            <SimpleGrid columns={1}>
              <Flex>
                <Box
                  margin={{ base: "1rem", md: "1.2rem", lg: "1.5rem" }}
                  height="200px"
                >
                  <Flex alignItems="center" marginBottom={2}>
                    <Box>
                      <CalendarCheck
                        size={70}
                        weight="regular"
                        color={theme.colors.medium_green}
                      />
                    </Box>
                    <Heading
                      fontSize={{ base: "1rem", md: "1.2rem", lg: "1.5rem" }}
                      marginLeft={5}
                    >
                      DESCRIBI LAS TAREAS
                    </Heading>
                  </Flex>
                  <Text fontSize={{ base: "1rem", md: "1.2rem", lg: "1.5rem" }}>
                    Haces una breve descripcion del trabajo que estas
                    necesitando hacer. Si queres podes adjuntar fotos para que
                    el profesional que lo vea tenga una idea mas exacta de lo
                    que hay que hacer.
                  </Text>
                </Box>
              </Flex>
              <Flex>
                <Box margin={5} height="200px">
                  <Flex alignItems="center" marginBottom={2}>
                    <MagnifyingGlass
                      size={70}
                      weight="regular"
                      color={theme.colors.medium_green}
                    />
                    <Heading
                      fontSize={{ base: "1rem", md: "1.2rem", lg: "1.5rem" }}
                      marginLeft={5}
                    >
                      BUSCAR PROFESIONALES Y PRECIOS
                    </Heading>
                  </Flex>
                  <Text fontSize={{ base: "1rem", md: "1.2rem", lg: "1.5rem" }}>
                    Busca en nuestra lista de profesionales cual te parece el
                    mas indicado, vas a poder elegir varios filtros. Entre
                    estos, calificaciones, reseñas, material grafico de sus
                    trabajos.
                  </Text>
                </Box>
              </Flex>

              <Flex>
                <Box margin={5}>
                  <Box display="flex" alignItems="center" marginBottom={2}>
                    <CheckCircle
                      size={70}
                      weight="regular"
                      color={theme.colors.medium_green}
                    />
                    <Heading
                      fontSize={{ base: "1rem", md: "1.2rem", lg: "1.5rem" }}
                      marginLeft={5}
                    >
                      CONFIRMA
                    </Heading>
                  </Box>
                  <Text fontSize={{ base: "1rem", md: "1.2rem", lg: "1.5rem" }}>
                    Felicitaciones!!! ya completaste todo el formulario. nunca
                    antes fue tan facil y seguro contratar a un profesional para
                    que te haga el trabajo.
                  </Text>
                </Box>
              </Flex>
            </SimpleGrid>
          </Box>
        </Flex>
        <Center height="20px">
          <Divider orientation="horizontal" />
        </Center>
        <Flex direction="column" marginTop={10}>
          <Heading
            fontSize={{ base: "1rem", md: "1.2rem", lg: "1.5rem" }}
            textAlign="center"
            marginLeft={5}
          >
            ESTAS LISTO PARA BUSCAR QUIEN TE HAGA EL TRABAJO
          </Heading>
          <Text
            fontSize={{ base: "1rem", md: "1.2rem", lg: "1.5rem" }}
            textAlign="center"
          >
            Chatea rápidamente con profesionales de servicios para tu casa.
            ¡Elige entre +175 categorías!
          </Text>
          <Flex justifyContent="center" padding={5}>
            <Flex flexDirection="column">
              <Link href="/">
                <Box
                  as="button"
                  width="20rem"
                  height="3rem"
                  borderRadius="10px"
                  bg={theme.colors.medium_green}
                  color="white"
                  fontSize="1.8rem"
                >
                  COMENZAR
                </Box>
              </Link>
              <Flex flexDirection="row" justifyContent="center" padding={2}>
                <Text marginRight={4}>YA TENES UNA CUENTA?</Text>
                <Link href="/">
                  <Text color={theme.colors.medium_green}>
                    <span className={styles.link}>LOG IN</span>
                  </Text>
                </Link>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Container>
      <Flex margin={5}>
        <Comments />
      </Flex>
    </Layout>
  );
};

export default FindServices;
