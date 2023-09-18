import React, { useEffect, useState } from 'react';
import styles from './home.module.scss';
import Image from 'next/image';
import slide1 from '@/assets/slide-1.svg';
import slide2 from '@/assets/slide-2.svg';
import slide3 from '@/assets/slide-3.svg';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Layout from '@/components/templates/layout/layout';
import ProgressBar from '@/components/atoms/progressBar/progressBar';
import API from '@/services/API';
import { Ticket } from '@/components/atoms/ticket/ticket';
import { useModal } from '@/hook/useLoading';
import Link from 'next/link';
import { useStore } from '@/hook/useStore';
import { nameStore } from '@/enum/nameStore';
import Button from '@/components/atoms/button/button';

const Home = () => {
	const idRaffle = 1;
	const [percent, setPercent] = useState(0);
	const { setLoading } = useModal();
	const { setStore } = useStore();
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	const getNumbers = async (cantNumbers: number) => {
		setLoading(true);
		const Api = new API('/api');
		await Api.post<{ percentSold: number }>('getNumbersAvailable', {
			raffle: idRaffle, // tomar el sorteo id de contentful
			cant: cantNumbers, // tomar el sorteo id de contentful
		})
			.then(result => {
				setStore(result, nameStore.NUMBERS);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		const respuesta = async () => {
			const Api = new API('/api');
			await Api.post<{ percentSold: number }>('getPercentRaffle', {
				sorteo_id: idRaffle, // tomar el sorteo id de contentful
			}).then(result => {
				setPercent(result.percentSold);
			});
		};
		respuesta();
	}, []);

	// Tomar las img del contentful
	return (
		<Layout>
			<div className={styles.container}>
				<Slider {...settings} className={styles.slider}>
					<Image src={slide1} alt='slide1'></Image>
					<Image src={slide2} alt='slide2'></Image>
					<Image src={slide3} alt='slide3'></Image>
				</Slider>

				<div className={styles.info_raffle}>
					<h2>Nombre Articulo o Actividad</h2>
					<ProgressBar progress={percent}></ProgressBar>
					<h3>
						Valor de cada boleta <b>COP $5.000</b>
					</h3>

					<p>
						El sorteo se realizara por la l0teria de medellin cuando
						se alcance el 100% de la meta{' '}
					</p>
				</div>
			</div>

			<div className={styles.seller}>
				<h2>Compra tus números</h2>
				<div className={styles.container_tickets}>
					<Ticket
						onClick={() => {
							getNumbers(2);
						}}
						value='$10.000'
						label='2 Números'
					/>
					<Ticket
						onClick={() => {
							getNumbers(5);
						}}
						value='$25.000'
						label='5 Números'
					/>
					<Ticket
						onClick={() => {
							getNumbers(10);
						}}
						value='$50.000'
						label='10 Números'
					/>
				</div>
				<Button type='Link' label='Ir a pagar' url='/chequeout' />
			</div>
		</Layout>
	);
};

export default Home;
