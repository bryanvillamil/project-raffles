import client from '@client/index'
import { GET_DATA_HOME } from '@queries/index'

export const getDataHome = async () => {
  const { data } = await client.query({
    query: GET_DATA_HOME
  });

  // const { home } = data ?? {}
  // const { proyectosCollection } = home ?? {}
  // const items: any[] = proyectosCollection?.items ?? []
  // const dataItems: IPropsProject[] = items ?? []

  console.log('datadata', data);
  
  return null
}