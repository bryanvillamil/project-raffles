import { statusTransactionEnum } from '@/enum/statusTransactioEnum';
import { IDataBase, INumeroUsado, INumeroUsadoApi } from '@/types/dataBaseType';
import { cipher } from '@/utils/encrypt';
import ListNumbers from '@/utils/listNumbers';
import { createKysely } from '@vercel/postgres-kysely';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function getNumbers(
	req: NextApiRequest,
	res: NextApiResponse<any>,
) {
	const { encrypt, decrypt } = cipher();

	const body = decrypt(req.body) as INumeroUsado;
	const db = createKysely<IDataBase>();

	try {
		const dataToOmit = await db
			.selectFrom('numeros_usados')
			.select('numero')
			.where(eb =>
				eb('estado_transaccion', '=', statusTransactionEnum.PENDING).or(
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
			.where('numero_transaccion', '=', body.numero_transaccion)
			.execute();
		if (dataTransaction.length !== 0) {
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

			await db
				.updateTable('numeros_usados')
				.set({
					estado_transaccion: body.estado_transaccion,
					numero: JSON.stringify(numbersAvailable),
				})
				.where('numero_transaccion', '=', body.numero_transaccion)
				.execute();
			res.status(200).json(encrypt({ message: 'success' }));
			return;
		}
	} catch (error) {
		res.status(500).json(encrypt({ error }));
	}
}
