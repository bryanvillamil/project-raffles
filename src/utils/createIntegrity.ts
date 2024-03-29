export const createIntegrityKey = async ({
	Referencia,
	Moneda,
	Monto,
	SecretoIntegridad,
}: {
	Referencia: string;
	Monto: string;
	Moneda: string;
	SecretoIntegridad: string;
}) => {
	const concatIntegrity = Referencia + Monto + Moneda + SecretoIntegridad;

	const encondedText = new TextEncoder().encode(concatIntegrity);
	const hashBuffer = await crypto.subtle.digest('SHA-256', encondedText);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray
		.map(b => b.toString(16).padStart(2, '0'))
		.join('');

	return hashHex;
};
