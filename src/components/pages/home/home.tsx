import ProgressBar from '@/components/atoms/progressBar/progressBar';
import { Ticket } from '@/components/atoms/ticket/ticket';
import Layout from '@/components/templates/layout/layout';
import { nameStore } from '@/enum/nameStore';
import { useModal } from '@/hook/useLoading';
import { useStore } from '@/hook/useStore';
import API from '@/services/API';
import { IPropsHome } from '@/types/home';
import { convertToMoney } from '@/utils/convertToMoney';
import randomKey from '@/utils/randoKey';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import styles from './home.module.scss';

const Home = ({
	marca,
	precio,
	idSorteo,
	logo,
	imagenes,
	facebook,
	instagram,
}: IPropsHome) => {
	const [percent, setPercent] = useState(0);
	const [loadingValidNumber, setLoadingValidNumber] = useState(false);
	const [isValidNumber, setIsValidNumber] = useState(false);
	const router = useRouter();
	const { setLoading } = useModal();
	const { setStore } = useStore();

	const settings = {
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 480,
				settings: {
					dots: false,
					arrows: false,
					infinite: true,
					autoplay: true,
					fade: true,
				},
			},
			{
				breakpoint: 991,
				settings: {
					arrows: false,
				},
			},
		],
	};

	const validNumber = (event: any) => {
		setLoadingValidNumber(true);
		setIsValidNumber(false);
		event.preventDefault();
		const Api = new API('/api');
		Api.post<{ response: boolean }>('validNumber', {
			number: event.target.numberToValid.value, // tomar el sorteo id de contentful
		}).then(result => {
			console.log(
				'💩 ~ file: home.tsx:68 ~ validNumber ~ result:',
				result,
			);

			setIsValidNumber(result.response);
			setLoadingValidNumber(false);
		});
	};

	const getNumbers = async (cantNumbers: number) => {
		setLoading(true);
		setStore(cantNumbers, nameStore.NUMBERS, true);
		router.push('/finalizar-compra');
		setLoading(false);
	};

	useEffect(() => {
		const respuesta = async () => {
			const Api = new API('/api');
			await Api.post<{ percentSold: number }>('getPercentRaffle', {
				sorteo_id: idSorteo, // tomar el sorteo id de contentful
			}).then(result => {
				setPercent(result.percentSold);
			});
		};
		respuesta();
		setStore({ marca, precio, idSorteo }, nameStore.DATA_RIFA, true);
	}, []);

	// Tomar las img del contentful
	return (
		<Layout logo={logo} facebook={facebook} instagram={instagram}>
			<div className={styles.container}>
				<div className={styles.boxAward}>
					<Slider {...settings} className={styles.slider}>
						{imagenes.map(e => {
							return (
								<Image
									key={randomKey('img-slider')}
									src={e.imagenPremio.url}
									alt={e.titulo}
									style={{
										width: '100%',
										height: '100%',
									}}
									sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33.3vw'
									width={1800}
									height={500}
								/>
							);
						})}
					</Slider>

					<div className={styles.info_raffle}>
						<ProgressBar progress={percent}></ProgressBar>
						<h3>
							Valor de cada boleta{' '}
							<b>COP {convertToMoney(precio)}</b>
						</h3>

						<p>
							El sorteo se realizara por la loteria de medellin
							cuando se alcance el 100% de la meta{' '}
						</p>
					</div>
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
						label='2 Números'
					/>
					<Ticket
						recommended
						onClick={() => {
							getNumbers(5);
						}}
						value={convertToMoney(precio * 5)}
						label='5 Números'
					/>
					<Ticket
						onClick={() => {
							getNumbers(10);
						}}
						value={convertToMoney(precio * 10)}
						label='10 Números'
					/>
				</div>
			</div>
			<section className={styles.selectNumber}>
				<h2>Compra tus números</h2>
				<p>Busca tu numero de la suerte y participa</p>
				<div className={styles.selectNumber_container}>
					<div className={styles.selectNumber_container_form}>
						<form onSubmit={validNumber}>
							<div>
								<label htmlFor='numberToValid'>
									Escribe los números que quieres comprar aquí
								</label>
								<input
									type='text'
									name='numberToValid'
									minLength={4}
									maxLength={4}
									min={1}
									max={9999}
									id='numberToValid'
								/>
								{loadingValidNumber ? (
									<>
										<div className={styles.loading}>
											Loading
										</div>
									</>
								) : (
									<>
										{isValidNumber && (
											<p>El número ya fue comprado</p>
										)}
									</>
								)}
							</div>
							<button>valid</button>
						</form>
					</div>
					<div className={styles.selectNumber_container_number}>
						<p>Números seleccionados</p>
						<div className={styles.numbers}>
							<span className={styles.number}>1234</span>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default Home;
