import { nameStore } from '@/enum/nameStore';
import { cipher } from '@/utils/encrypt';

export const useStore = () => {
	const { encrypt, decrypt, encryptName } = cipher();

	const setStore = (data: any, name: nameStore, isEncrypt?: boolean) => {
		if (isEncrypt) {
			const nameEncrypt = encryptName(name).toString();
			const dataEncrypt = encrypt(data).toString();
			sessionStorage.setItem(nameEncrypt, dataEncrypt);
		} else {
			const dataToSave = JSON.stringify(data);
			sessionStorage.setItem(name, dataToSave);
		}
	};

	const getStore = (name: nameStore, isEncrypt?: boolean) => {
		if (isEncrypt) {
			const data = sessionStorage.getItem(encryptName(name));

			if (data === null) {
				return null;
			}
			return decrypt(data);
		}
		const data = sessionStorage.getItem(name);
		if (data === null) {
			return null;
		}
		return JSON.parse(data ?? '');
	};

	const deleteStore = () => {
		sessionStorage.clear();
	};

	return { setStore, getStore, deleteStore };
};
