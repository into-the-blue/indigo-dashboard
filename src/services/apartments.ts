import { gqlClient } from '@/utils';
import { gql } from 'apollo-boost';

export const queryAllMetroStations = async (): Promise<any> => {
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
