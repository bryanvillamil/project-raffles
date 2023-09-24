export const createReferences = (): string => {
	const caracteresPermitidos = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	const longitudReferencia = 10;

	let referencia = '';
	for (let i = 0; i < longitudReferencia; i++) {
		const indiceAleatorio = Math.floor(
			Math.random() * caracteresPermitidos.length,
		);
		referencia += caracteresPermitidos.charAt(indiceAleatorio);
	}

	return referencia;
};
