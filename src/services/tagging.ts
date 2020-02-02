import { gqlClient } from '@/utils';
import { gql } from 'apollo-boost';
import { apartmentDefaultSchemas } from './helper';
export const queryUnlabeledApartments = async (limit: number = 50) => {
  return (
    await gqlClient.query({
      query: gql`
        query($limit: Int)  {
          queryApartmentsWithoutLabel(limit: $limit) {
            ${apartmentDefaultSchemas}
          }
        }
      `,
      variables: {
        limit,
      },
    })
  ).data.queryApartmentsWithoutLabel;
};
