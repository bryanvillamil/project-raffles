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
		let response = true;
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
		dataToOmit.forEach(item => {});

		for (const element of dataToOmit) {
			const item = element;
			let numbers = JSON.parse(item.numero ?? '');
			if (numbers.includes(Number(body.number))) {
				// return res.status(200).json(encrypt({ response: false }));
				response = false;
				// return;
				break;
			}
		}

		return res.status(200).json(encrypt({ response }));
	} catch (error) {
		res.status(500).json({ error });
	}
}
