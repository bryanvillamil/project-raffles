export default function calculatePercent(
	cantTicket: number,
	cantTicketSold: number,
): number {
	if (cantTicket <= 0 || cantTicketSold < 0) {
		throw new Error(
			'La cantidad total de boletas debe ser mayor que cero y la cantidad de boletas vendidas no puede ser negativa.',
		);
	}

	if (cantTicketSold > cantTicket) {
		throw new Error(
			'La cantidad de boletas vendidas no puede ser mayor que la cantidad total de boletas.',
		);
	}

	const porcentajeVendidas = (cantTicketSold / cantTicket) * 100;
	return porcentajeVendidas;
}
