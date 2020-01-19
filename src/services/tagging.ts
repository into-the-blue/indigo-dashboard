import { gqlClient } from '@/utils';
import { gql } from 'apollo-boost';

export const queryUnlabeledApartments = async (limit: number = 50) => {
  return (
    await gqlClient.query({
      query: gql`
        {
          queryApartmentsWithoutLabel(limit: ${limit}) {
            title
          }
        }
      `,
    })
  ).data.queryApartmentsWithoutLabel;
};
