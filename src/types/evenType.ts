export interface ITransactionData {
	transaction: {
		id: string;
		amount_in_cents: number;
		reference: string;
		customer_email: string;
		currency: string;
		payment_method_type: string;
		redirect_url: string;
		status: string;
		shipping_address: null | any; // Puedes actualizar esto con el tipo correcto si es necesario
		payment_link_id: null | any; // Puedes actualizar esto con el tipo correcto si es necesario
		payment_source_id: null | any; // Puedes actualizar esto con el tipo correcto si es necesario
	};
}

export interface ISignature {
	properties: string[];
	checksum: string;
}

export interface IEventWompi {
	event: string;
	data: ITransactionData;
	environment: string;
	signature: ISignature;
	timestamp: number;
	sent_at: string;
}
