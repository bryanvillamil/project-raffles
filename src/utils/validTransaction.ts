import { IEventWompi } from '@/types/evenType';

export const validTransaction = (event: IEventWompi) => {
	if (event.signature.properties.length === 3) {
		const properties = event.signature.properties;
		let checksumInit =
			properties.join('') +
			event.timestamp +
			process.env.NEXT_PUBLIC_EVENT_KEY_WOMPI;
		let checksumEncrypt = CryptoJS.SHA256(checksumInit);
		if (checksumEncrypt.toString() === event.signature.checksum) {
			return true;
		}
		return false;
	}
	return false;
};
