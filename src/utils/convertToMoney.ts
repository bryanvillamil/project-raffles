export const convertToMoney = (value: number) => {
	return value.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
};
