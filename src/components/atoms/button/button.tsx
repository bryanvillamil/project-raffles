import React, { MouseEventHandler } from 'react';
import styles from './button.module.scss';
import Link from 'next/link';

interface TypeButton {
	type: 'Link' | 'Button';
	typeButton: 'reset' | 'button' | 'submit';
	url?: string;
	label?: string;
	onClick?: (event: any) => void;
	disable?: boolean;
}

const Button = ({
	type,
	url,
	label,
	onClick,
	disable,
	typeButton,
}: TypeButton) => {
	switch (type) {
		case 'Button':
			return (
				<button
					type={typeButton}
					onClick={onClick}
					className={styles.button}
					disabled={disable}>
					{label}
				</button>
			);
		case 'Link':
			if (!disable) {
				return (
					<button
						type={typeButton}
						onClick={onClick}
						className={styles.button}
						disabled={disable}>
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
