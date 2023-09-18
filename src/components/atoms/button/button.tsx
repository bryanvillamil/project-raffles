import React from 'react';
import styles from './button.module.scss';
import Link from 'next/link';

interface TypeButton {
	type: 'Link' | 'Button';
	url?: string;
	label?: string;
	onClick?: () => void;
	disable?: boolean;
}

const Button = ({ type, url, label, onClick, disable }: TypeButton) => {
	switch (type) {
		case 'Button':
			return (
				<button
					onClick={onClick}
					className={styles.button}
					disabled={!disable}>
					{label}
				</button>
			);
		case 'Link':
			if (!disable) {
				return (
					<button
						onClick={onClick}
						className={styles.button}
						disabled={!disable}>
						{label}
					</button>
				);
			}
			return (
				<Link href={url ?? ''} className={styles.button}>
					{label}
				</Link>
			);

		default:
			break;
	}

	return <div>Button</div>;
};

export default Button;
