import client from '@client/index'
import { GET_DATA_HOME } from '@queries/index'

export const getDataHome = async () => {
  const { data } = await client.query({
    query: GET_DATA_HOME
  });

  const queryImagesSort = data?.homeRifas?.imagenesCollection?.items;

  return {
    marca: data?.homeRifas?.marca,
    precio: data?.homeRifas?.precio,
    idSorteo: data?.homeRifas?.idSorteo,
    logo: data?.homeRifas?.logo,
    imagenes : queryImagesSort
  }
}