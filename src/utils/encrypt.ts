import CryptoJS from 'crypto-js';

export const cipher = () => {
	const encrypt = (obj: object | string) => {
		const cipherText = CryptoJS.AES.encrypt(
			JSON.stringify(obj),
			process.env.NEXT_PUBLIC_API_KEY ?? '',
		).toString();

		return cipherText;
	};

	const decrypt = (data: string): object => {
		const bytes = CryptoJS.AES.decrypt(
			data,
			process.env.NEXT_PUBLIC_API_KEY ?? '',
		);
		const obj = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

		return obj;
	};

	const encryptName = (name: string) => {
		const cipherText = CryptoJS.SHA256(name).toString();

		return cipherText;
	};

	return { encrypt, decrypt, encryptName };
};
