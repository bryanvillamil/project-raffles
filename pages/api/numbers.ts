import { sql } from '@vercel/postgres';
import type { NextApiRequest, NextApiResponse } from 'next';
import ListNumbers from '../../src/utils/listNumbers';

export default async function getNumbers(
	req: NextApiRequest,
	res: NextApiResponse<any>,
) {
	const { raffle, cant } = req.body;
	try {
		const data =
			await sql`SELECT Numero from numeros_usados where Sorteo_id = ${raffle}`;

		const dataRaffle =
			await sql`SELECT cantidad_voletas from sorteos where Id = ${raffle}`;

		const numbersAvailable = ListNumbers(
			1,
			dataRaffle.rows[0].cantidad_voletas,
			data.rows.map(num => num.numero),
			cant,
		);

		res.status(200).json(numbersAvailable);
	} catch (error) {
		res.status(500).json({ message: 'Error list numbers' });
	}
}
