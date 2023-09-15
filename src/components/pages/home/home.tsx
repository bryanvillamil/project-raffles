import React from 'react';
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

const Home = () => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};
	return (
		<Layout>
			<Slider {...settings} className={styles.slider}>
				<Image src={slide1} alt='slide1'></Image>

				<Image src={slide2} alt='slide2'></Image>
				<Image src={slide3} alt='slide3'></Image>
			</Slider>

			<ProgressBar progress={20}></ProgressBar>
		</Layout>
	);
};

export default Home;
