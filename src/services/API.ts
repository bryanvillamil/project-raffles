import { cipher } from '@/utils/encrypt';

class API {
	private readonly baseURL: string;

	constructor(baseURL: string) {
		this.baseURL = baseURL;
	}

	async get<T>(endpoint: string): Promise<T> {
		const { decrypt } = cipher();
		const response = await fetch(`${this.baseURL}/${endpoint}`);
		const data = decrypt(await response.json());
		return data as T;
	}

	async post<T>(endpoint: string, body: any): Promise<T> {
		const { encrypt, decrypt } = cipher();
		const response = await fetch(`${this.baseURL}/${endpoint}`, {
			method: 'POST',
			// headers: {
			// 	'Content-Type': 'application/json',
			// },
			body: encrypt(body),
		});
		// const data = await response.json();
		const data = decrypt(await response.json());

		return data as T;
	}
}

export default API;
