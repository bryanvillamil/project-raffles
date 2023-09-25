import Link from 'next/link';
import React from 'react';
import styles from './goBack.module.scss';

const GoBack = () => {
	return (
		<Link href='/' className={styles.goBack}>
			{'<'} Volver al inicio{' '}
		</Link>
	);
};

export default GoBack;
