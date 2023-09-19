// Interface para la tabla de Clientes
export interface ICliente {
	id: number;
	nombres: string;
	cedula: string;
	celular: string;
	email: string;
}

// Interface para la tabla de Sorteos
export interface ISorteo {
	id: number;
	cantidad_voletas: number;
	estado: 'Activo' | 'Inactivo';
	valor_voleta: number;
}

// Interface para la tabla de NumerosUsados
export interface INumeroUsado {
	id?: number;
	numero: number;
	numero_transaccion: string;
	estado_transaccion: string;
	fecha_compra: Date;
	cliente_id: number;
	sorteo_id: number;
}

export interface INumeroUsadoApi {
	id: number;
	numero: number[];
	cliente_id: number;
	sorteo_id: number;
	numero_transaccion: string;
}

export interface INumberAndPerson {
	numbers: number[];
	client: ICliente;
	sorteo_id: number;
	numero_transaccion: string;
}

export interface IDataBase {
	clientes: ICliente;
	sorteos: ISorteo;
	numeros_usados: INumeroUsado;
}
