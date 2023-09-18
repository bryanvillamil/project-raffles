import { nameStore } from '@/enum/nameStore';
import { cipher } from '@/utils/encrypt';

export const useStore = () => {
	const { encrypt, decrypt } = cipher();

	const setStore = (data: any, name: nameStore, isEncrypt?: boolean) => {
		if (isEncrypt) {
			sessionStorage.setItem(encrypt(name), encrypt(data));
		} else {
			const dataToSave = JSON.stringify(data);
			sessionStorage.setItem(name, dataToSave);
		}
	};

	const getStore = (name: nameStore, isEncrypt?: boolean) => {
		if (isEncrypt) {
			return decrypt(sessionStorage.getItem(encrypt(name)) ?? '');
		}
		const data = sessionStorage.getItem(name);
		return JSON.parse(data ?? '');
	};

	const deleteStore = () => {
		sessionStorage.clear();
	};

	return { setStore, getStore, deleteStore };
};
