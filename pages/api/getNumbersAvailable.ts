import { sql } from '@vercel/postgres';
import type { NextApiRequest, NextApiResponse } from 'next';
import ListNumbers from '../../src/utils/listNumbers';
import { cipher } from '@/utils/encrypt';
import { createKysely } from '@vercel/postgres-kysely';
import { IDataBase } from '@/types/dataBaseType';
import { statusTransactionEnum } from '@/enum/statusTransactioEnum';

export default async function getNumbers(
	req: NextApiRequest,
	res: NextApiResponse<any>,
) {
	const { encrypt, decrypt } = cipher();
	const { raffle, cant } = decrypt(req.body) as {
		raffle: number;
		cant: number;
	};
	const db = createKysely<IDataBase>();

	try {
		const data = await db
			.selectFrom('numeros_usados')
			.select('numero')
			.where('sorteo_id', '=', raffle)
			.where(eb =>
				eb('estado_transaccion', '=', statusTransactionEnum.PENDING).or(
					'estado_transaccion',
					'=',
					statusTransactionEnum.APPROVED,
				),
			)
			.execute();
		const dataRaffle = await db
			.selectFrom('sorteos')
			.select('cantidad_voletas')
			.where('id', '=', raffle)
			.execute();
		const numbersAvailable = ListNumbers(
			1,
			dataRaffle[0].cantidad_voletas,
			data.map(num => num.numero),
			cant,
		);

		res.status(200).json(encrypt(numbersAvailable));
	} catch (error) {
		res.status(500).json(encrypt({ message: 'Error list numbers' }));
	}
}
