import React from 'react';
import styles from './home.module.scss';
import Image from 'next/image';
import img from '@/assets/logo.svg';
import facebook from '@/assets/facebook.svg';
import instagram from '@/assets/instagram.svg';
import slide1 from '@/assets/slide-1.svg';
import slide2 from '@/assets/slide-2.svg';
import slide3 from '@/assets/slide-3.svg';
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home = () => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};
	return (
		<div className={styles.container_principal}>
			<header className={styles.header}>
				<div className={styles.header_logo}>
					<Link href='/'>
						<Image
							src={img}
							alt='Logo'
							width={506}
							height={145}></Image>
					</Link>
				</div>
			</header>
			<main className={styles.container}>
				<Slider {...settings} className={styles.slider}>
					<div>
						<Image src={slide1} alt='slide1'></Image>
					</div>
					<div>
						<Image src={slide2} alt='slide2'></Image>
					</div>
					<div>
						<Image src={slide3} alt='slide3'></Image>
					</div>
				</Slider>
			</main>
			<footer className={styles.footer}>
				<div className={styles.footer_container}>
					<a
						href='#'
						rel='noopener noreferrer'
						target='_blank'
						className={styles.button_social}>
						<Image src={facebook} alt='icon-facebook'></Image>
					</a>
					<a
						href='#'
						rel='noopener noreferrer'
						target='_blank'
						className={styles.button_social}>
						<Image src={instagram} alt='icon-facebook'></Image>
					</a>
				</div>
			</footer>
		</div>
	);
};

export default Home;
