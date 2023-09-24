import { IDataBase } from '@/types/dataBaseType';
import { cipher } from '@/utils/encrypt';
import { createKysely } from '@vercel/postgres-kysely';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function getNumbers(
	req: NextApiRequest,
	res: NextApiResponse<any>,
) {
	const { decrypt, encrypt } = cipher();
	const body = decrypt(req.body) as { idTransaction: string };
	const db = createKysely<IDataBase>();
	try {
		const data = await db
			.selectFrom('numeros_usados')
			.selectAll()
			.where('numero_transaccion', '=', body.idTransaction)
			.execute();
		if (data.length > 0) return res.status(200).json(encrypt(data[0]));
		return res.status(200).json(encrypt([]));
	} catch (error) {
		res.status(500).json({ error });
	}
}
