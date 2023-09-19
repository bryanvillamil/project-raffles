import React from 'react';
import styles from './ticket.module.scss';

export const Ticket = ({
	onClick,
	value,
	label,
	recommended,
}: {
	label: string;
	value: string;
	onClick: (param: any) => void;
	recommended?: boolean;
}) => {
	return (
		<button className={styles.ticket} onClick={onClick}>
			{recommended && <b>Recomendado</b>}
			<div className={styles.ticket_container}>
				<span>{label}</span>
				<span>{value}</span>
			</div>
		</button>
	);
};
