//types
import {
  Box,
  Flex,
  Text,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Alert,
  AlertIcon,
  Input,
} from "@chakra-ui/react";
import {
  AddIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DeleteIcon,
  EditIcon,
} from "@chakra-ui/icons";
import { Session } from "next-auth/core/types";
//helper
import useHelper from "./useHelper";

type Props = {
  isOpen: boolean;
  images: string[];
  typeImages: string;
  setImages(value: string[]): void;
  onClose(): void;
};

const UploadImages = ({
  isOpen,
  images,
  typeImages,
  setImages,
  onClose,
}: Props) => {
  const {
    loading,
    numberPage,
    inputFileRef,
    uploadedImages,
    unselectedImages,
    numberPageUnselected,
    setNumberPageUnselected,
    onChangeUploadImages,
    handleReSelectImage,
    handleUnselectImage,
    setUnselectedImages,
    setUploadedImages,
    setNumberPage,
    handleSubmit,
  } = useHelper({
    images,
    typeImages,
    setImages,
    onClose,
  });

  return (
    <Modal
      {...{ isOpen }}
      onClose={() => {
        onClose();
        setUploadedImages([...images]);
        setUnselectedImages([]);
        setNumberPage(0);
        setNumberPageUnselected(0);
        inputFileRef.current && (inputFileRef.current.value = "");
      }}
      size={"xl"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color={"medium_green"}>
          {typeImages === "certification"
            ? "Documentación del Perfil"
            : "Imagenes de Servicios"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody minH={unselectedImages.length ? "890px" : "445px"}>
          <Flex flexWrap={"wrap"} justifyContent={"space-between"} h={"356px"}>
            {uploadedImages.length <= 0 && (
              <Flex
                alignItems={"center"}
                justifyContent={"center"}
                w={"100%"}
                h={"100%"}
              >
                <Flex flexDirection={"column"} alignItems={"center"}>
                  <Button
                    iconSpacing={0}
                    leftIcon={<AddIcon boxSize={"5rem"} />}
                    colorScheme={"green"}
                    borderRadius={"full"}
                    w={"8rem"}
                    h={"8rem"}
                    onClick={() => inputFileRef.current?.click()}
                  />
                  <Text mt={3} textAlign={"center"} fontSize={"lg"}>
                    ¡Comencemos a subir algunas imagenes!
                  </Text>
                </Flex>
              </Flex>
            )}
            {uploadedImages.length > 0 &&
              uploadedImages
                .slice(numberPage, numberPage + 4)
                .map((m, i: number) => (
                  <Box
                    key={i}
                    position={"relative"}
                    w={"48%"}
                    h={"150px"}
                    bgGradient="linear(to-r, #ddd, #e8e8e8)"
                    mt={7}
                    backgroundImage={m}
                    backgroundPosition={"center"}
                    backgroundSize={"cover"}
                    borderRadius={7}
                  >
                    <Button
                      iconSpacing={0}
                      leftIcon={<DeleteIcon />}
                      position={"absolute"}
                      top={"-12px"}
                      right={"-12px"}
                      colorScheme={"red"}
                      borderRadius={"full"}
                      w={"2.5rem"}
                      h={"2.5rem"}
                      value={`${m}`}
                      onClick={handleUnselectImage}
                    />
                  </Box>
                ))}
          </Flex>

          <Flex
            justifyContent={{ base: "center", md: "space-evenly" }}
            w={"100%"}
            flexDirection={{ base: "column", md: "row" }}
            mt={3}
          >
            <Text
              color="gray"
              fontSize={{ base: "sm", md: "lg" }}
              textAlign={{ base: "center", md: "start" }}
            >
              Mostrando{" "}
              {uploadedImages.slice(numberPage, numberPage + 4).length} de{" "}
              {uploadedImages.length}{" "}
              {uploadedImages.length === 1 ? "Elemento" : "Elementos"}
            </Text>

            <Flex w={{ base: "100%", md: "50%" }}>
              {numberPage !== 0 ? (
                <Text
                  cursor={"pointer"}
                  onClick={() => {
                    numberPage === 0 ? "" : setNumberPage(numberPage - 4);
                  }}
                  width={"50%"}
                  textAlign={"center"}
                >
                  <ChevronLeftIcon w={6} h={6} />
                  Anterior
                </Text>
              ) : (
                <Text width={"50%"}></Text>
              )}
              {numberPage / 4 + 1 !== Math.ceil(uploadedImages.length / 4) &&
              uploadedImages.length !== 0 ? (
                <Text
                  cursor={"pointer"}
                  onClick={() => {
                    numberPage / 4 === Math.ceil(uploadedImages.length / 4) - 1
                      ? ""
                      : setNumberPage(numberPage + 4);
                  }}
                  width={"50%"}
                  textAlign={"center"}
                >
                  Siguiente
                  <ChevronRightIcon w={6} h={6} />
                </Text>
              ) : (
                <Text width={"50%"}></Text>
              )}
            </Flex>
          </Flex>

          {unselectedImages.length > 0 && (
            <>
              <Text
                mt={1}
                color={"medium_green"}
                fontWeight={"600"}
                fontSize={"lg"}
              >
                Volver a Seleccionar
              </Text>
              <Flex
                flexWrap={"wrap"}
                justifyContent={"space-between"}
                h={"350px"}
              >
                {unselectedImages
                  .slice(numberPageUnselected, numberPageUnselected + 4)
                  .map((m, i: number) => (
                    <Box
                      key={i}
                      position={"relative"}
                      w={"48%"}
                      h={"150px"}
                      bg={"blue"}
                      mt={6}
                      bgGradient="linear(to-r, #ddd, #e8e8e8)"
                      backgroundImage={m}
                      backgroundPosition={"center"}
                      backgroundSize={"cover"}
                      borderRadius={7}
                    >
                      <Button
                        iconSpacing={0}
                        leftIcon={<AddIcon />}
                        position={"absolute"}
                        top={"-12px"}
                        right={"-12px"}
                        colorScheme={"green"}
                        borderRadius={"full"}
                        w={"2.5rem"}
                        h={"2.5rem"}
                        value={`${m}`}
                        onClick={handleReSelectImage}
                      />
                    </Box>
                  ))}
              </Flex>
              <Flex mt={3}>
                <Text color="gray" fontSize={{ base: "sm", md: "lg" }}>
                  Mostrando{" "}
                  {
                    unselectedImages.slice(
                      numberPageUnselected,
                      numberPageUnselected + 4
                    ).length
                  }{" "}
                  de {unselectedImages.length}{" "}
                  {unselectedImages.length === 1 ? "Elemento" : "Elementos"}
                </Text>
                <Flex w={{ base: "100%", md: "50%" }} alignItems={"center"}>
                  {numberPageUnselected !== 0 ? (
                    <Text
                      cursor={"pointer"}
                      onClick={() => {
                        numberPageUnselected === 0
                          ? ""
                          : setNumberPageUnselected(numberPageUnselected - 4);
                      }}
                      width={"50%"}
                      textAlign={"center"}
                    >
                      <ChevronLeftIcon w={6} h={6} />
                      Anterior
                    </Text>
                  ) : (
                    <Text width={"50%"}></Text>
                  )}
                  {numberPageUnselected / 4 !==
                  Math.ceil(unselectedImages.length / 4) - 1 ? (
                    <Text
                      cursor={"pointer"}
                      onClick={() => {
                        numberPageUnselected / 4 ===
                        Math.ceil(unselectedImages.length / 4) - 1
                          ? ""
                          : setNumberPageUnselected(numberPageUnselected + 4);
                      }}
                      width={"50%"}
                      textAlign={"center"}
                    >
                      Siguiente
                      <ChevronRightIcon w={6} h={6} />
                    </Text>
                  ) : (
                    <Text width={"50%"}></Text>
                  )}
                </Flex>
              </Flex>
            </>
          )}
        </ModalBody>
        <ModalFooter
          justifyContent={
            uploadedImages.length > 0 ? "space-between" : "flex-end"
          }
        >
          <Button
            position={"relative"}
            w={"200px"}
            h={"40px"}
            onClick={() => inputFileRef.current?.click()}
            d={uploadedImages.length > 0 ? "inline-block" : "none"}
          >
            Subir Imagenes
            <Input
              type="file"
              multiple
              accept="image/*"
              name="src-file"
              w={"200px"}
              position={"absolute"}
              zIndex={"-1"}
              top={0}
              left={0}
              opacity={0}
              bg={"blue"}
              h={"40px"}
              id="src-file"
              ref={inputFileRef}
              onChange={(e) =>
                e.target.files && onChangeUploadImages(e.target.files)
              }
            />
          </Button>

          <Flex>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                onClose();
                setUploadedImages([...images]);
                setUnselectedImages([]);
                setNumberPage(0);
                setNumberPageUnselected(0);
                inputFileRef.current && (inputFileRef.current.value = "");
              }}
            >
              Cancelar
            </Button>
            <Button
              colorScheme={"green"}
              isLoading={loading}
              onClick={handleSubmit}
            >
              Actualizar
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UploadImages;
