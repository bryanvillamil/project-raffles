import { ICliente, IDataBase } from '@/types/dataBaseType';
import { cipher } from '@/utils/encrypt';
import { createKysely } from '@vercel/postgres-kysely';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function getNumbers(
	req: NextApiRequest,
	res: NextApiResponse<any>,
) {
	const { decrypt, encrypt } = cipher();
	const body = decrypt(req.body) as ICliente;
	const db = createKysely<IDataBase>();
	try {
		await db.insertInto('clientes').values(body).execute();
		const data = await db
			.selectFrom('clientes')
			.select(['id'])
			.where('cedula', '=', body.cedula)
			.execute();

		res.status(200).json(encrypt(data));
	} catch (error) {
		res.status(500).json({ error });
	}
}
