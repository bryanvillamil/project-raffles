import React from 'react';
import styles from './progressBar.module.scss'; // Creamos esto en el siguiente paso

const ProgressBar = ({ progress }: { progress: number }) => {
	return (
		<div className={styles.container}>
			<small>Cantidad vendida</small>
			<div className={styles.progress_container}>
				<div
					className={styles.progress}
					style={{ width: `${progress}%` }}>
					{Math.trunc(progress)}%
				</div>
			</div>
		</div>
	);
};

export default ProgressBar;
