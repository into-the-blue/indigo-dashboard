import { MapViewModel } from './types';
import {} from '@/utils';
import {} from 'apollo-boost';
import { AAMap } from './mapController';
import { safelyCall } from '@/utils/utils';
import { IApartment } from '@/types';
import { next, XENO_EVENT, on } from '@/utils/xeno';
import {} from 'antd';

class MapPresenter {
  map?: AAMap;

  unlisten?: () => void;

  markers: {
    apartment: IApartment;
    marker: any;
  }[] = [];

  constructor(public viewModel: MapViewModel) {
    //
  }

  componentDidMount() {
    this.initializeMap();
    this.initializeListeners();
  }

  componentWillUnmount() {
    safelyCall(this.unlisten);
  }

  initializeMap = () => {
    this.map = new AAMap('bdMap-container');
    this.map.moveTo(121.52, 31.165, 11);
    this.map.addDefaultController();
    this.map.enableStyle();
  };

  initializeListeners = () => {
    const listenr1 = on(XENO_EVENT.ADD_MARKER).subscribe(this.AddMarker);
    const listenr2 = on(XENO_EVENT.CLEAN_MARKER).subscribe(this.cleanMarker);
    this.unlisten = () => {
      listenr1.unsubscribe();
      listenr2.unsubscribe();
    };
  };

  cleanMarker = ({ apartment }: { apartment: IApartment | IApartment[] }) => {
    if (!Array.isArray(apartment)) apartment = [apartment];
    const { markers } = this.viewModel.getProps.map;
    let markersToRm: any[];
    if (apartment.length === 0) {
      markersToRm = markers.map(o => o.marker);
    } else {
      markersToRm = apartment.map(a => markers.find(o => o.apartment.id === a.id)).filter(o => !!o);
    }
    markersToRm.forEach(this.map!.removeMarker);
  };

  AddMarker = ({ apartment }: { apartment: IApartment | IApartment[] }) => {
    if (!Array.isArray(apartment)) apartment = [apartment];
    const markers = apartment.map(apt => {
      return {
        marker: this.map?.addMarker(apt.lng, apt.lat, () => this.onPressMarker(apt), 'house', {
          label: { content: `<div id="marker">${apt.price}</div>` },
        }),
        apartment: apt,
      };
    });
    this.viewModel.getProps.next!('map/addNewMarkers', {
      markers,
    });
  };

  onPressMarker = (apartment: IApartment) => {
    // console.warn(apartment);
    this.map!.moveTo(apartment.lng, apartment.lat, 13);
    next(XENO_EVENT.ON_PRESS_MARKER, {
      apartment,
    });
  };
}

export { MapPresenter };
