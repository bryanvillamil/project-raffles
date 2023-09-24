import { IEventWompi } from '@/types/evenType';

export const validTransaction = async (event: IEventWompi) => {
	if (event.signature.properties.length === 3) {
		const properties = event.signature.properties;
		const newV: Array<'id' | 'status' | 'amount_in_cents'> = [];
		properties.forEach(element => {
			newV.push(
				element.split('.')[1] as 'id' | 'status' | 'amount_in_cents',
			);
		});
		let checksumInit =
			event.data.transaction[newV[0]].toString() +
			event.data.transaction[newV[1]].toString() +
			event.data.transaction[newV[2]].toString() +
			event.timestamp +
			process.env.NEXT_PUBLIC_EVENT_KEY_WOMPI;
		const encondedText = new TextEncoder().encode(checksumInit);
		const hashBuffer = await crypto.subtle.digest('SHA-256', encondedText);
		const hashArray = Array.from(new Uint8Array(hashBuffer));
		const hashHex = hashArray
			.map(b => b.toString(16).padStart(2, '0'))
			.join('');
		if (hashHex === event.signature.checksum) {
			return true;
		}
		return false;
	}
	return false;
};
