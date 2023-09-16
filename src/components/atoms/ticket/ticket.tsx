import React from 'react';
import styles from './ticket.module.scss';

export const Ticket = ({
	onClick,
	value,
	label,
}: {
	label: string;
	value: string;
	onClick: (param: any) => void;
}) => {
	return (
		<button className={styles.ticket} onClick={onClick}>
			<div className={styles.ticket_container}>
				<span>{label}</span>
				<span>{value}</span>
			</div>
		</button>
	);
};
