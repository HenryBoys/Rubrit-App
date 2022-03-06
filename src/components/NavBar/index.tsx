//from chakra
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Link,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  useToast,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  BellIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
//from modules
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
//components
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import Login from "components/Login";
import Register from "components/Register";
import DarkModeSwitch from "components/DarkModeSwitch";
import Loading from "components/Loading";
//interfaces
import { IUser } from "models/User/IUser";
import EmailAuthModal from "./emailAuthModal";

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Servicios",
    children: [
      {
        label: "Albañil",
        subLabel: "A",
        href: "/",
      },
    ],
  },
  {
    label: "Buscar Servicios",
    href: "/findservices",
  },
  {
    label: "Ofrece tus Servicios",
    href: "/offerservices",
  },
  {
    label: "Bolsa De Trabajo",
    href: "/workbag",
  },
];

export default function WithSubnavigation() {
  const { isOpen, onToggle, onOpen, onClose } = useDisclosure();
  const [isAuth, setIsAuth] = useState<boolean>();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const { data: session, status } = useSession();
  const [user, setUser] = useState<any>();
  const toast = useToast();

  console.log(user);

  useEffect(() => {
    if (session && status === "authenticated") {
      setUser(session);
      toast({
        title: `Bienvenido ${session.name}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      if (!toast.isActive("verify-account")) {
        if (!session?.isAuthenticated) {
          toast({
            duration: 30 * 24 * 60 * 60,
            isClosable: false,
            id: "verify-account",
            render: () => <EmailAuthModal email={session?.email} />,
          });
        }
      }
    }

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, status]);

  return (
    <Box position={"sticky"} top={0} zIndex={10}>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={() => {
              onToggle();
              setIsAuth(false);
            }}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Link href="/" _hover={{ textDecoration: "none", scale: "2" }}>
            <Text
              fontFamily={"heading"}
              color={useColorModeValue("gray.800", "white")}
            >
              Logo
            </Text>
          </Link>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav NAV_ITEMS={NAV_ITEMS} />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
          alignItems={"center"}
        >
          <DarkModeSwitch />
          {!session &&
          (status === "loading" || status === "unauthenticated") ? (
            <Button
              display={{ base: "inline-flex", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"#2EB67D"}
              _hover={{
                bg: "#33a173",
              }}
              onClick={() => {
                setIsAuth(true);
                onOpen();
              }}
            >
              Comenzar
            </Button>
          ) : (
            <>
              <Menu>
                <MenuButton d={{ base: "none", md: "inline" }}>
                  <BellIcon fontSize={"2xl"} />
                </MenuButton>
              </Menu>
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  bg={"transparent"}
                >
                  {user && (
                    <Avatar
                      src={user?.image}
                      name={user?.name}
                      cursor={"pointer"}
                      size={"sm"}
                    />
                  )}
                </MenuButton>
                <MenuList>
                  <MenuItem>Mi Perfil</MenuItem>
                  <MenuDivider />
                  <MenuItem d={{ base: "inline", md: "none" }}>
                    Notificaciones
                  </MenuItem>
                  <MenuDivider d={{ base: "", md: "none" }} />
                  <MenuItem
                    onClick={() => {
                      signOut(), localStorage.clear();
                    }}
                  >
                    Cerrar Sesion
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          )}

          {isAuth && (
            <Modal
              isOpen={isOpen}
              onClose={() => {
                onClose(), setIsLogin(true);
              }}
              blockScrollOnMount
              preserveScrollBarGap
            >
              <ModalOverlay />
              {isLogin ? (
                <Login {...{ setIsLogin }} />
              ) : (
                <Register {...{ setIsAuth, setIsLogin }} />
              )}
            </Modal>
          )}
        </Stack>
      </Flex>

      {!isAuth && (
        <Collapse in={isOpen} animateOpacity>
          <MobileNav NAV_ITEMS={NAV_ITEMS} />
        </Collapse>
      )}
    </Box>
  );
}
