//chakra
import {
  Avatar,
  Text,
  Flex,
  ButtonGroup,
  Button,
  Box,
  Alert,
  AlertIcon,
  useDisclosure,
  Menu,
  MenuButton,
  IconButton,
  MenuItem,
  MenuList,
  MenuDivider,
} from "@chakra-ui/react";
import {
  EditIcon,
  DragHandleIcon,
  StarIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons";
//interfaces
import { Session } from "next-auth";
//components
import EditProfile from "./EditProfile";
import UpdateDescription from "./UpdateDescription";
import Preferences from "./Preferences";
//from modules
import Link from "next/link";

const MiPerfil: React.FC<{
  user: Session;
}> = ({ user }) => {
  const {
    isOpen: isOpenUpdateDescription,
    onOpen: onOpenUpdateDescription,
    onClose: onCloseUpdateDescription,
  } = useDisclosure();

  const {
    isOpen: isOpenEditProfile,
    onOpen: onOpenEditProfile,
    onClose: onCloseEditProfile,
  } = useDisclosure();

  const {
    isOpen: isOpenPreferences,
    onOpen: onOpenPreferences,
    onClose: onClosePreferences,
  } = useDisclosure();

  return (
    <Flex
      alignItems={"center"}
      flexDirection={"column"}
      h={"max-content"}
      w={"40rem"}
    >
      <Avatar
        src={user.image}
        name={user.name}
        borderRadius={10}
        w={180}
        h={180}
        marginTop={10}
      />
      <Text
        marginTop={5}
        fontWeight={700}
        fontSize={{ base: "md", md: "lg" }}
        textTransform={"capitalize"}
      >
        {user.name}
      </Text>
      <Text
        textAlign={"center"}
        marginTop={5}
        fontSize={{ base: "md", md: "lg" }}
      >
        {user.description ? user.description : " "}
      </Text>
      <ButtonGroup marginTop={10}>
        <Box
          d={"flex"}
          alignItems={"center"}
          flexDirection={"column"}
          w={"33%"}
          cursor={"pointer"}
          onClick={onOpenUpdateDescription}
        >
          <Button leftIcon={<StarIcon />} iconSpacing={0} w={"max-content"} />
          <Text
            textAlign={"center"}
            fontSize={{ base: "sm", lg: "md" }}
            marginTop={3}
            color="gray"
          >
            Editar Descripción
          </Text>
          <UpdateDescription
            {...{ user, isOpenUpdateDescription, onCloseUpdateDescription }}
          />
        </Box>
        <Box
          d={"flex"}
          alignItems={"center"}
          flexDirection={"column"}
          w={"33%"}
          onClick={onOpenEditProfile}
        >
          <Button leftIcon={<EditIcon />} iconSpacing={0} />
          <Text
            textAlign={"center"}
            fontSize={{ base: "sm", lg: "md" }}
            marginTop={3}
            color="gray"
          >
            Editar Tu Perfil
          </Text>
          <EditProfile
            {...{
              user,
              isOpenEditProfile,
              onCloseEditProfile,
            }}
          />
        </Box>
        <Box
          d={"flex"}
          alignItems={"center"}
          flexDirection={"column"}
          w={"33%"}
        >
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Más"
              icon={<DragHandleIcon />}
              iconSpacing={0}
            />
            <MenuList>
              <Link href={"myAccount"} passHref>
                <MenuItem icon={<ExternalLinkIcon />}>
                  Ajustes De La Cuenta
                </MenuItem>
              </Link>
              <MenuDivider />
              <MenuItem onClick={onOpenPreferences}>Preferencias</MenuItem>
              <MenuDivider />
              {/* */}
              <Preferences
                {...{ user, isOpenPreferences, onClosePreferences }}
              />
              {/* */}
              <Link
                href={{ pathname: "myAccount", query: { site: "myfiles" } }}
                passHref
              >
                <MenuItem>Ver Tus Archivos</MenuItem>
              </Link>
            </MenuList>
          </Menu>

          <Text
            textAlign={"center"}
            fontSize={{ base: "sm", lg: "md" }}
            marginTop={3}
            color="gray"
          >
            Más
          </Text>
        </Box>
      </ButtonGroup>
      <Box w={"100%"} marginTop={5}>
        <Text color="gray" fontSize={{ base: "sm", lg: "md" }}>
          Email
        </Text>
        <Text fontSize={{ base: "sm", lg: "md" }}>{user.email}</Text>
        <Text color="gray" marginTop={5} fontSize={{ base: "sm", lg: "md" }}>
          Número De Teléfono
        </Text>
        <Text>
          {user.phone ? `${user.phone.diallingCode} ${user.phone.number}` : "-"}
        </Text>
        <Text color="gray" marginTop={5} fontSize={{ base: "sm", lg: "md" }}>
          Tipo De Usuario
        </Text>
        <Text>{user.isWorker ? "Profesional" : "Contratista"}</Text>
        <Text color="gray" fontSize={{ base: "sm", lg: "md" }} marginTop={5}>
          Zona Horaria
        </Text>
        <Text>{user.address.timeZone ? user.address.timeZone : "-"}</Text>
        <Text color="gray" fontSize={{ base: "sm", lg: "md" }} marginTop={5}>
          Dirección
        </Text>
        <Text>{user.address.name ? user.address.name : "-"}</Text>
        <Text
          marginTop={5}
          color={user.isAuthenticated ? "medium_green" : "warning_red"}
        >
          {user.isAuthenticated ? "Cuenta Verificada" : "Cuenta Sin Verificar"}
        </Text>
      </Box>

      {(!user.address.name || !user.phone.number) && (
        <Alert status="warning" flexDirection={"column"} borderRadius={10}>
          <Flex>
            <AlertIcon />
            Recordá que debes completar tu perfil antes de poder disfrutar todo
            lo que tenemos para ofrecerte
          </Flex>
          <Button
            leftIcon={<EditIcon />}
            w={"100%"}
            variant={"ghost"}
            onClick={() => onOpenEditProfile()}
          >
            Completar Perfil
          </Button>
        </Alert>
      )}
    </Flex>
  );
};

export default MiPerfil;
