import { statusTransactionEnum } from '@/enum/statusTransactioEnum';
import { IDataBase, INumeroUsado, INumeroUsadoApi } from '@/types/dataBaseType';
import { cipher } from '@/utils/encrypt';
import { createKysely } from '@vercel/postgres-kysely';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function getNumbers(
	req: NextApiRequest,
	res: NextApiResponse<any>,
) {
	const { encrypt, decrypt } = cipher();

	const body = decrypt(req.body) as INumeroUsadoApi;
	const db = createKysely<IDataBase>();

	try {
		const numberUsed: INumeroUsado[] = body.numero.map(num => {
			return {
				estado_transaccion: statusTransactionEnum.PENDING,
				fecha_compra: new Date(),
				numero_transaccion: body.numero_transaccion,
				cliente_id: body.cliente_id,
				sorteo_id: body.sorteo_id,
				cantidad: body.cantidad,
			};
		});
		await db.insertInto('numeros_usados').values(numberUsed).execute();
		res.status(200).json(encrypt({ message: 'success' }));
	} catch (error) {
		res.status(500).json({ error });
	}
}
