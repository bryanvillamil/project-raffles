import { statusTransactionEnum } from '@/enum/statusTransactioEnum';
import { IDataBase, INumeroUsado } from '@/types/dataBaseType';
import { IEventWompi } from '@/types/evenType';
import { validTransaction } from '@/utils/validTransaction';
import { createKysely } from '@vercel/postgres-kysely';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function callBack(
	req: NextApiRequest,
	res: NextApiResponse<any>,
) {
	const body = req.body as IEventWompi;
	const db = createKysely<IDataBase>();
	try {
		if (validTransaction(body)) {
			await db
				.updateTable('numeros_usados')
				.set({ estado_transaccion: statusTransactionEnum.APPROVED })
				.where(
					'numero_transaccion',
					'=',
					body.data.transaction.reference,
				)
				.execute();
			res.status(200).json({ message: 'success' });
		}
	} catch (error) {
		res.status(200).json({ message: 'Error save' });
	}
}
