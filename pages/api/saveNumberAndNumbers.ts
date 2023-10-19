import { statusTransactionEnum } from '@/enum/statusTransactioEnum';
import { IDataBase, INumberAndPerson } from '@/types/dataBaseType';
import { cipher } from '@/utils/encrypt';
import { createKysely } from '@vercel/postgres-kysely';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function getNumbers(
	req: NextApiRequest,
	res: NextApiResponse<any>,
) {
	const { decrypt, encrypt } = cipher();
	const body = decrypt(req.body) as INumberAndPerson;
	const db = createKysely<IDataBase>();
	try {
		let data = await db
			.selectFrom('clientes')
			.select(['id'])
			.where('cedula', '=', body.client.cedula)
			.execute();

		if (data.length < 1) {
			await db.insertInto('clientes').values(body.client).execute();
			data = await db
				.selectFrom('clientes')
				.select(['id'])
				.where('cedula', '=', body.client.cedula)
				.execute();
		}
		await db
			.insertInto('numeros_usados')
			.values({
				cliente_id: data[0].id ?? 0,
				sorteo_id: body.sorteo_id,
				estado_transaccion: statusTransactionEnum.PENDING,
				fecha_compra: new Date(),
				numero_transaccion: body.numero_transaccion,
				cantidad: body.cantidad,
			})
			.execute();

		res.status(200).json(encrypt({ message: 'success save' }));
	} catch (error) {
		res.status(500).json(encrypt({ error }));
	}
}
