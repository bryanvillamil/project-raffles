import { statusTransactionEnum } from '@/enum/statusTransactioEnum';
import { IDataBase } from '@/types/dataBaseType';
import { cipher } from '@/utils/encrypt';
import { createKysely } from '@vercel/postgres-kysely';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function validNumber(
	req: NextApiRequest,
	res: NextApiResponse<any>,
) {
	const { decrypt, encrypt } = cipher();
	const body = decrypt(req.body) as { number: string };
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

		dataToOmit.forEach(item => {
			if (item.numero === body.number) {
				return res.status(200).json(encrypt({ response: false }));
			}
		});

		res.status(200).json(encrypt({ response: true }));
	} catch (error) {
		res.status(500).json({ error });
	}
}
