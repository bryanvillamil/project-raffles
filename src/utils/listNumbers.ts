export default function ListNumbers(
	x: number,
	y: number,
	omitir: number[],
	cant: number,
): number[] {
	const numbersAvailable: number[] = [];
	for (let i = x; i <= y; i++) {
		const paddedNumber = i.toString().padStart(4, '0');
		if (paddedNumber.length === 4 && !omitir.includes(i)) {
			numbersAvailable.push(i);
		}
	}

	if (cant > numbersAvailable.length) {
		throw new Error(
			`No hay suficientes números disponibles entre ${x} y ${y} después de omitir.`,
		);
	}

	const aleatoryNumbers: number[] = [];
	while (aleatoryNumbers.length < cant) {
		const indice = Math.floor(Math.random() * numbersAvailable.length);
		const aleatoryNumber = numbersAvailable.splice(indice, 1)[0];
		aleatoryNumbers.push(aleatoryNumber);
	}

	return aleatoryNumbers;
}
