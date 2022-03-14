import { Heading, Box, Alert, AlertIcon, Text, Button } from "@chakra-ui/react";
import CardProfesional from "components/CardProfesional";
import Loading from "components/Loading";
import { useSession } from "next-auth/react";
import { useUsers } from "Provider/UsersProvider";
import { useEffect, useState } from "react";
import Slider from "react-slick";

const settings = {
  dots: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 5,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1950,
      settings: {
        centerMode: true,
        centerPadding: "10px",
        slidesToShow: 4,
        dots: true,
      },
    },
    {
      breakpoint: 1640,
      settings: {
        centerMode: true,
        centerPadding: "10px",
        slidesToShow: 3,
        dots: true,
      },
    },
    {
      breakpoint: 1150,
      settings: {
        centerMode: true,
        centerPadding: "10px",
        slidesToShow: 2,
        dots: true,
      },
    },
    {
      breakpoint: 843,
      settings: {
        centerMode: true,
        centerPadding: "1px",
        slidesToShow: 1,
        dots: true,
      },
    },
  ],
};

const NearProfesionals: React.FC = () => {
  const { users, status } = useUsers();
  const { data: Session, status: auth } = useSession();
  const [slider, setSlider] = useState<Slider | null>(null);

  useEffect(() => {}, [Session]);

  if (status === "true" || status === "false") {
    return <Loading />;
  }

  return (
    <Box
      position={"relative"}
      height={"750px"}
      width={"full"}
      overflow={"hidden"}
      mt={4}
    >
      {/* CSS files for react-slick */}
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      <Heading fontSize={{ base: "lg", md: "2rem" }} textAlign={"center"} p={4}>
        Profesionales cerca de{" "}
        {Session?.address.name && auth === "authenticated"
          ? Session.address.name
          : "Cordoba Capital, Argentina"}
      </Heading>
      {!Session ||
        (!Session.address.lat && (
          <Alert status="info" justifyContent={"center"}>
            <AlertIcon />
            Recuerde que para Obtener información personalizada debe registrarse
            y completar la informacion de su perfil!
            <Text
              ml={2}
              cursor="pointer"
              textDecor={"underline"}
              onClick={() =>
                !Session
                  ? document.getElementById("signInButton")?.click()
                  : document.getElementById("profile")?.click()
              }
            >
              ¡Vamos Allá!
            </Text>
          </Alert>
        ))}

      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {users.slice(0, 10).map((item, index: number) => (
          <CardProfesional
            key={index}
            _id={item._id}
            name={item.name}
            img={item.items[0].category.picture_small}
            avatar={item.profilePic}
            city={item.address.name}
            description={item.description}
          />
        ))}
      </Slider>
    </Box>
  );
};

export default NearProfesionals;
