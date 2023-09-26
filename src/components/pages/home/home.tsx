import React, { useEffect, useState } from "react";
import styles from "./home.module.scss";
import Image from "next/image";
import slide1 from "@/assets/slide-1.svg";
import slide2 from "@/assets/slide-2.svg";
import slide3 from "@/assets/slide-3.svg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Layout from "@/components/templates/layout/layout";
import ProgressBar from "@/components/atoms/progressBar/progressBar";
import API from "@/services/API";
import { Ticket } from "@/components/atoms/ticket/ticket";
import { useModal } from "@/hook/useLoading";
import { useStore } from "@/hook/useStore";
import { nameStore } from "@/enum/nameStore";
import { useRouter } from "next/router";
import { convertToMoney } from "@/utils/convertToMoney";
import { IPropsHome } from "@/types/home";

const Home = ({ marca, precio, idSorteo, logo, imagenes }: IPropsHome) => {
  const [percent, setPercent] = useState(0);

  const router = useRouter();
  const { setLoading } = useModal();
  const { setStore } = useStore();

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const getNumbers = async (cantNumbers: number) => {
    setLoading(true);
    // const Api = new API('/api');
    // await Api.post<number[]>('getNumbersAvailable', {
    // 	raffle: idSorteo, // tomar el sorteo id de contentful
    // 	cant: cantNumbers, // tomar el sorteo id de contentful
    // })
    // 	.then(result => {
    setStore(cantNumbers, nameStore.NUMBERS, true);
    router.push("/finalizar-compra");
    // })
    // .finally(() => {
    setLoading(false);
    // });
  };

  useEffect(() => {
    const respuesta = async () => {
      const Api = new API("/api");
      await Api.post<{ percentSold: number }>("getPercentRaffle", {
        sorteo_id: idSorteo, // tomar el sorteo id de contentful
      }).then((result) => {
        setPercent(result.percentSold);
      });
    };
    respuesta();
    setStore({ marca, precio, idSorteo }, nameStore.DATA_RIFA, true);
  }, []);

  // Tomar las img del contentful
  return (
    <Layout logo={logo}>
      <div className={styles.container}>
        <h1 className={styles.container_name_activity}>{marca}</h1>
        <Slider {...settings} className={styles.slider}>
          {imagenes.map((e, i) => {
            return (
              <Image
                key={i}
                src={e.imagenPremio.url}
                alt={e.titulo}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33.3vw"
                width={1800}
                height={500}
              />
            );
          })}
        </Slider>

        <div className={styles.info_raffle}>
          <ProgressBar progress={percent}></ProgressBar>
          <h3>
            Valor de cada boleta <b>COP {convertToMoney(precio)}</b>
          </h3>

          <p>
            El sorteo se realizara por la l0teria de medellin cuando se alcance
            el 100% de la meta{" "}
          </p>
        </div>
      </div>

      <div className={styles.seller}>
        <h2>Compra tus números</h2>
        <p>Selecciona cuantos números quiere comprar</p>
        <div className={styles.container_tickets}>
          <Ticket
            onClick={() => {
              getNumbers(2);
            }}
            value={convertToMoney(precio * 2)}
            label="2 Números"
          />
          <Ticket
            recommended
            onClick={() => {
              getNumbers(5);
            }}
            value={convertToMoney(precio * 5)}
            label="5 Números"
          />
          <Ticket
            onClick={() => {
              getNumbers(10);
            }}
            value={convertToMoney(precio * 10)}
            label="10 Números"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
