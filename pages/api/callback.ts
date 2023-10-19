import { statusTransactionEnum } from '@/enum/statusTransactioEnum';
import { IDataBase } from '@/types/dataBaseType';
import { IEventWompi } from '@/types/evenType';
import ListNumbers from '@/utils/listNumbers';
import { validTransaction } from '@/utils/validTransaction';
import { createKysely } from '@vercel/postgres-kysely';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function callBack(
	req: NextApiRequest,
	res: NextApiResponse<any>,
) {
	const body = req.body as IEventWompi;
	const db = createKysely<IDataBase>();
	const isValid = await validTransaction(body);
	try {
		if (isValid) {
			const dataToOmit = await db
				.selectFrom('numeros_usados')
				.select('numero')
				.where(eb =>
					eb(
						'estado_transaccion',
						'=',
						statusTransactionEnum.PENDING,
					).or(
						'estado_transaccion',
						'=',
						statusTransactionEnum.APPROVED,
					),
				)
				.execute();

			const dataTransaction = await db
				.selectFrom('numeros_usados')
				.select([
					'sorteo_id',
					'cantidad',
					'cliente_id',
					'estado_transaccion',
				])
				.where(
					'numero_transaccion',
					'=',
					body.data.transaction.reference,
				)
				.execute();
			if (dataTransaction.length !== 0) {
				if (
					![statusTransactionEnum.PENDING].includes(
						dataTransaction[0]
							.estado_transaccion as statusTransactionEnum,
					)
				) {
					res.status(200).json({
						message: 'Transaction already approved or decline',
					});
					return;
				}
				const dataRaffle = await db
					.selectFrom('sorteos')
					.select('cantidad_voletas')
					.where('id', '=', dataTransaction[0].sorteo_id)
					.execute();

				const valueOmit: Array<number> = [];
				dataToOmit.forEach(item => {
					if (item.numero) {
						const numbers: number[] = JSON.parse(item.numero ?? '');
						numbers.forEach(num => {
							valueOmit.push(num);
						});
					}
				});

				const numbersAvailable = ListNumbers(
					1,
					dataRaffle[0].cantidad_voletas,
					valueOmit,
					dataTransaction[0].cantidad,
				);

				if (
					body.data.transaction.status !==
					statusTransactionEnum.APPROVED
				) {
					await db
						.updateTable('numeros_usados')
						.set({
							estado_transaccion: body.data.transaction.status,
						})
						.where(
							'numero_transaccion',
							'=',
							body.data.transaction.reference,
						)
						.execute();
					res.status(200).json({ message: 'success' });
					return;
				}
				await db
					.updateTable('numeros_usados')
					.set({
						estado_transaccion: body.data.transaction.status,
						numero: JSON.stringify(numbersAvailable),
					})
					.where(
						'numero_transaccion',
						'=',
						body.data.transaction.reference,
					)
					.execute();
				res.status(200).json({ message: 'success' });
				return;
			}
			res.status(200).json({ message: 'Transaction not exist' });
			return;
		}
		res.status(500).json({ message: 'Transaction not valid' });
	} catch (error) {
		res.status(500).json({ error });
	}
}
