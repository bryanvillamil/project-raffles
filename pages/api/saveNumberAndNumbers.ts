import { statusTransactionEnum } from '@/enum/statusTransactioEnum';
import {
	ICliente,
	IDataBase,
	INumberAndPerson,
	INumeroUsado,
} from '@/types/dataBaseType';
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
		let numbers = await db
			.selectFrom('numeros_usados')
			.select('numero')
			.where('sorteo_id', '=', body.sorteo_id)
			.execute();
		if (numbers.length > 0) {
			res.status(500).json(
				encrypt({ error: 'Números asignados ya fueron usado' }),
			);
			return;
		}

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

		const numberUsed: INumeroUsado[] = body.numbers.map(num => {
			return {
				numero: num,
				cliente_id: data[0].id,
				sorteo_id: body.sorteo_id,
				estado_transaccion: statusTransactionEnum.PENDING,
				fecha_compra: new Date(),
				numero_transaccion: body.numero_transaccion,
			};
		});
		await db.insertInto('numeros_usados').values(numberUsed).execute();

		res.status(200).json(encrypt({ message: 'success save' }));
	} catch (error) {
		res.status(500).json(encrypt({ error }));
	}
}
