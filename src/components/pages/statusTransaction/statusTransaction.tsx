import Layout from '@/components/templates/layout/layout';
import { statusTransactionEnum } from '@/enum/statusTransactioEnum';
import API from '@/services/API';
import { IDataTransactionID } from '@/types/ITransactionID';
import { INumeroUsado } from '@/types/dataBaseType';
import React, { useEffect, useState } from 'react';
import styles from './statusTransaction.module.scss';

const StatusTransaction = () => {
	const [dataTransaction, setDataTransaction] =
		useState<IDataTransactionID>();

	const [numberAssigned, setNumberAssigned] = useState<string>();
	const getDataTransaction = async (id: string) => {
		const api = new API('/api');
		await api
			.post<INumeroUsado>('getNumbers', { idTransaction: id })
			.then(result => {
				console.log(result);
				console.log(
					'💩 ~ file: StatusTransaction.tsx:25 ~ StatusTransaction ~ JSON.parse(numberAssigned):',
					JSON.parse(numberAssigned ?? ''),
				);
				setNumberAssigned(result.numero);
			});
	};

	const callStatus = async () => {
		const urlParams = new URLSearchParams(window.location.search);
		const id = urlParams.get('id');
		const api = new API(process.env.NEXT_PUBLIC_URL_WOMPI ?? '');
		await api
			.getOut<IDataTransactionID>('transactions/' + id)
			.then(async result => {
				setDataTransaction(result);

				if (result.data.status === statusTransactionEnum.APPROVED) {
					await getDataTransaction(result.data.reference);
				}
			});
	};

	useEffect(() => {
		callStatus();
	}, []);

	return (
		<Layout>
			<div className={styles.container}>
				<a href='/' className={styles.goBack}>
					{'<-'} go back{' '}
				</a>
				<div className={styles.card_status}>
					<div
						className={`${styles.card_status_header} ${
							dataTransaction?.data.status ===
							statusTransactionEnum.APPROVED
								? styles.card_status_header_success
								: styles.card_status_header_error
						}`}>
						<p>!Pago exitoso¡</p> {/* Success */}
						{/* <p>!Error a la hora del pago¡</p> */}
						{/* Error de pago */}
					</div>
					<div
						className={`${styles.card_status_body} ${styles.card_status_bo}`}>
						<div className={styles.card_status_body_content}>
							<div className={styles.table}>
								<p className={styles.table_title}>
									Datos de la transacción
								</p>
								<div className={styles.table_data}>
									<div className={styles.table_data_item}>
										<p>ID de transacción</p>
										<b>{dataTransaction?.data.id}</b>
									</div>
									<div className={styles.table_data_item}>
										<p>Fecha</p>
										<b>
											{new Date(
												dataTransaction?.data
													.created_at ?? '',
											).toLocaleDateString()}
										</b>
									</div>
									<div className={styles.table_data_item}>
										<p>Tu transacción ha sido</p>{' '}
										<b>aprobada</b>
									</div>
									<div className={styles.table_data_item}>
										<p>Tu número de compra es</p>
										<b>{dataTransaction?.data.reference}</b>
									</div>

									{numberAssigned && (
										<div className={styles.table_data_item}>
											<p>Tus números asignados </p>
											<div>
												{JSON.parse(numberAssigned).map(
													(num: number) => (
														<span>{num}</span>
													),
												)}
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <div className={styles.title}>
				<h1>Finalizar compra</h1>
			</div> */}
		</Layout>
	);
};

export default StatusTransaction;
