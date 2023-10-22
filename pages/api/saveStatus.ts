import { statusTransactionEnum } from '@/enum/statusTransactioEnum';
import { IDataBase } from '@/types/dataBaseType';
import { cipher } from '@/utils/encrypt';
import { createKysely } from '@vercel/postgres-kysely';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function saveStatus(
	req: NextApiRequest,
	res: NextApiResponse<any>,
) {
	const { decrypt, encrypt } = cipher();
	const body = decrypt(req.body) as {
		numero_transaccion: string;
		estado_transaccion: statusTransactionEnum;
	};
	const db = createKysely<IDataBase>();
	try {
		await db
			.updateTable('numeros_usados')
			.set({
				estado_transaccion: body.estado_transaccion,
			})
			.where('numero_transaccion', '=', body.numero_transaccion)
			.execute();
		res.status(200).json(encrypt({ message: 'success' }));
		return;
	} catch (error) {
		res.status(500).json({ error });
	}
}
