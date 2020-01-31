import { ImageTaggingViewModel } from './types';
import { gqlClient } from '@/utils';
import { gql } from 'apollo-boost';
import { safelyCall } from '@/utils/utils';
import { IApartment, IMetroStationClient } from '@/types';
import './index.scss';
import { next, XENO_EVENT, on } from '@/utils/xeno';
import { tap } from 'rxjs/operators';
import { message } from 'antd';
// import { useQuery } from '@apollo/react-hooks';

class ImageTaggingPresenter {
  unlisten?: () => void;

  constructor(public viewModel: ImageTaggingViewModel) {
    //
  }

  componentDidMount() {
    this.initializeData();
    this.initializeListener();
  }

  componentWillUnmount() {
    safelyCall(this.unlisten);
  }

  initializeListener = () => {
    const listener1 = on(XENO_EVENT.ON_PRESS_MARKER).subscribe(p => {
      if (p.type === 'apartment') {
        this.onPressApartmentMarker(p.apartment as IApartment);
      }
      if (p.type === 'station') {
        this.onPressStationMarker(p.station as IMetroStationClient);
      }
    });

    this.unlisten = () => {
      listener1.unsubscribe();
    };
  };

  initializeData = async () => {
    await this.viewModel.getProps.next!('tagging/queryUntaggedApartments');
    const { untaggedApartments } = this.viewModel.getProps.tagging;
    next(XENO_EVENT.ADD_MARKER, {
      apartment: untaggedApartments,
      type: 'apartment',
    });
  };

  queryMetroStations = async () => {
    await this.viewModel.getProps.next!('apartment/queryMetroStations');
  };

  onPressApartmentMarker = (apartment: IApartment) => {
    message.info(apartment.title + apartment.price);
    console.warn(apartment);
  };

  onPressStationMarker = (station: IMetroStationClient) => {
    console.warn(station);
    message.success(station.stationName);
    this.viewModel.getProps.next!('apartment/queryApartmentsNearbyStation', {
      stationId: station.stationId,
      distance: 1000,
      limit: 1000,
    });
  };
}

export { ImageTaggingPresenter };
