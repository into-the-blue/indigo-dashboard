import { gqlClient } from '@/utils';
import { gql } from 'apollo-boost';

export const queryUnlabeledApartments = async (limit: number = 50) => {
  return (
    await gqlClient.query({
      query: gql`
        query($limit: Int)  {
          queryApartmentsWithoutLabel(limit: $limit) {
            id
            houseUrl
            houseId
            airCondition
            area
            bed
            bizcircle
            buildingTotalFloors
            carport
            checkInDate
            city
            closet
            communityName
            communityUrl
            district
            electricity
            elevator
            floor
            floorAccessibility
            floorFullInfo
            fridge
            gas
            heating
            houseType
            imgUrls
            lat
            lng
            naturalGas
            orient
            price
            pricePerSquareMeter
            subwayAccessibility
            tags
            washingMachine
            water
            waterHeater
            wifi
            title
            createdAt
            createdTime
          }
        }
      `,
      variables: {
        limit,
      },
    })
  ).data.queryApartmentsWithoutLabel;
};
