import { ImageTaggingViewModel } from './types';
import { gqlClient } from '@/utils';
import { gql } from 'apollo-boost';
import { AAMap } from './mapController';
import { sleep } from '@/utils/utils';
import TaggingState from '@/models/tagging';
import { IApartment } from '@/types';
// import { useQuery } from '@apollo/react-hooks';

class ImageTaggingPresenter {
  map?: AAMap;

  markers: {
    apartment: IApartment;
    marker: any;
  }[] = [];

  constructor(public viewModel: ImageTaggingViewModel) {
    //
  }

  componentDidMount() {
    this.initializeMap();
    this.initializeData();
  }

  componentWillUnmount() {}

  initializeMap = () => {
    this.map = new AAMap('bdMap-container');
    this.map.moveTo(121.52, 31.165, 11);
    this.map.addDefaultController();
    this.map.enableStyle();
  };

  initializeData = async () => {
    await this.viewModel.getProps.next!('tagging/queryUntaggedApartments');
    const { untaggedApartments } = this.viewModel.getProps.tagging;
    this.markers = untaggedApartments.map(apartment => {
      return {
        marker: this.map?.addMarker(
          apartment.lng,
          apartment.lat,
          () => this.onPressMarker(apartment),
          'house',
          {
            content: `<div class="marker">${apartment.price}</div>`,
          },
        ),
        apartment,
      };
    });
  };

  onPressMarker = (apartment: IApartment) => {
    console.warn(apartment);
  };
}

export { ImageTaggingPresenter };
