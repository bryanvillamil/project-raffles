import { gql } from '@apollo/client';

export const GET_DATA_HOME = gql`
  query GetDataHome {
    homeRifas(id: "7s8c6jjrDAld3IaBapqvFd") {
      logo {
        url
        title
      }
      marca 
      precio
      idSorteo
      imagenesCollection {
        items {
          ... on ImagenesDeRifa {
            titulo
            imagenPremio {
              url
              title
            }
          }
        }
      }
    }
  }
`;








