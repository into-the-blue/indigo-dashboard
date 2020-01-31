import { gqlClient } from '@/utils';
import { gql } from 'apollo-boost';
import { IMetroStationClient, IApartment } from '@/types';

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
        query($stationId:String, $distance:Int, $limit: Int) {
          queryApartmentsNearByStation(stationId:$stationId, distance:$distance, limit: $limit) {
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
        stationId,
        distance,
        limit,
      },
    })
  ).data.queryApartmentsNearByStation;
};
