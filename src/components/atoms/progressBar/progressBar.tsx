import React from 'react';
import styles from './progressBar.module.scss'; // Creamos esto en el siguiente paso

const ProgressBar = ({ progress }: { progress: number }) => {
	return (
		<div className={styles.progress_container}>
			<div className={styles.progress} style={{ width: `${progress}%` }}>
				{progress}%
			</div>
		</div>
	);
};

export default ProgressBar;