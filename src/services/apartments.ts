import { gqlClient } from '@/utils';
import { gql } from 'apollo-boost';
import { IMetroStationClient, IApartment } from '@/types';
import { apartmentDefaultSchemas } from './helper';
export const queryAllMetroStations = async (): Promise<IMetroStationClient> => {
  return (
    await gqlClient.query({
      query: gql`
        query {
          queryStations {
            stationId
            stationName
            coordinates
            city
            lines {
              lineId
              lineName
              url
            }
          }
        }
      `,
    })
  ).data.queryStations;
};
export const queryApartmentsNearbyMetroStation = async (
  stationId: string,
  distance: number = 500,
  limit: number = 50,
): Promise<IApartment> => {
  return (
    await gqlClient.query({
      query: gql`
        query($stationId: String, $distance: Int, $limit: Int) {
          queryApartmentsNearbyStation(stationId: $stationId, distance: $distance, limit: $limit) {
            ${apartmentDefaultSchemas}
          }
        }
      `,
      variables: {
        stationId,
        distance,
        limit,
      },
    })
  ).data.queryApartmentsNearbyStation;
};

export const queryApartmentsNearbyAddress = async (
  address: string,
  city: string,
  distance: number = 500,
  limit: number = 50,
): Promise<{
  coordinates: number[];
  apartments: IApartment[];
}> => {
  const { data } = await gqlClient.query({
    query: gql`
      query($address: String!, $city: String!, $distance: Int!, $limit: Int!){
        queryApartmentsNearbyAddress(address: $address, city:$city, distance:$distance, limit:$limit){
          coordinates
          apartments {
            ${apartmentDefaultSchemas}
          }
        }
      }
    `,
    variables: {
      address,
      city,
      distance,
      limit,
    },
  });
  return data.queryApartmentsNearbyAddress;
};
