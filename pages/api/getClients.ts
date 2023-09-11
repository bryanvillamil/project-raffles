import { sql } from '@vercel/postgres';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function GET(
	req: NextApiRequest,
	res: NextApiResponse<any>,
) {
	try {
		const { rows } = await sql`SELECT * from clientes`;
		res.status(200).json(rows);
	} catch (error) {
		res.status(200).json({ message: 'Hello from Next.js!' });
	}
}
