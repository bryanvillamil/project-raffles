
export interface ILogo {
	title: string
	url: string
}

export interface IAward {
	titulo: string
	imagenPremio: {
    title: string
    url: string
  }
}

export interface IPropsHome {
	marca: string;
	facebook: string;
	instagram: string;
  precio: number;
  idSorteo: string;
  logo: ILogo;
  imagenes: [IAward]
}