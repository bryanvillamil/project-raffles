import { statusTransactionEnum } from '@/enum/statusTransactioEnum';
import { IDataBase } from '@/types/dataBaseType';
import calculatePercent from '@/utils/calculatePercent';
import { cipher } from '@/utils/encrypt';
import { createKysely } from '@vercel/postgres-kysely';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>,
) {
	const { encrypt, decrypt } = cipher();
	const body = decrypt(req.body) as { sorteo_id: number };

	const db = createKysely<IDataBase>();
	try {
		let numbers = await db
			.selectFrom('numeros_usados')
			.selectAll()
			.where('sorteo_id', '=', body.sorteo_id)
			.where('estado_transaccion', '=', statusTransactionEnum.APPROVED)
			.where('estado_transaccion', '=', statusTransactionEnum.PENDING)
			.execute();
		let raffle = await db
			.selectFrom('sorteos')
			.select('cantidad_voletas')
			.where('id', '=', body.sorteo_id)
			.execute();
		res.status(200).json(
			encrypt({
				percentSold: calculatePercent(
					raffle[0].cantidad_voletas,
					numbers.length,
				),
			}),
		);
	} catch (error) {
		res.status(500).json(encrypt({ message: error }));
	}
}