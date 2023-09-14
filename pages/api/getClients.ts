import { cipher } from '@/utils/encrypt';
import { sql } from '@vercel/postgres';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function GET(
	_req: NextApiRequest,
	res: NextApiResponse<any>,
) {
	const { encrypt } = cipher();

	try {
		const { rows } = await sql`SELECT * from clientes`;
		res.status(200).json(encrypt(rows));
	} catch (error) {
		res.status(200).json({ message: 'Hello from Next.js!' });
	}
}
