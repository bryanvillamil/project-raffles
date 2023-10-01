import React from 'react';
import styles from './progressBar.module.scss'; // Creamos esto en el siguiente paso

const ProgressBar = ({ progress }: { progress: number }) => {
	return (
		<div className={styles.container}>
			<small>Cantidad Vendida</small>
			<span className={styles.progressText}>{Math.round(progress)}%</span>
			<div className={styles.progress_container}>
				<div
					className={styles.progress}
					style={{ width: `${progress}%` }}></div>
			</div>
		</div>
	);
};

export default ProgressBar;
