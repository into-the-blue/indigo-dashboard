import { MapViewModel } from './types';
import {} from '@/utils';
import {} from 'apollo-boost';
import { AAMap } from './mapController';
import { safelyCall } from '@/utils/utils';
import { IApartment, IMetroStationClient } from '@/types';
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

  cleanMarker = ({
    apartment,
    type,
    station,
  }: {
    apartment?: IApartment | IApartment[];
    type: 'station' | 'apartment';
    station?: IMetroStationClient | IMetroStationClient[];
  }) => {
    if (type === 'apartment') {
      if (!Array.isArray(apartment)) apartment = [apartment!];
      const { markers } = this.viewModel.getProps.map;
      let markersToRm: any[];
      if (apartment!.length === 0) {
        markersToRm = markers.filter(o => o.type === 'apartment');
      } else {
        markersToRm = apartment
          .map(a => markers.find(o => o.apartment!.id === a.id))
          .filter(o => !!o);
      }
      markersToRm.map(o => o.marker).forEach(this.map!.removeMarker);
      this.viewModel.getProps.next!('map/removeMarkers', {
        markers: markersToRm,
      });
    }
    if (type === 'station') {
      if (!Array.isArray(station)) station = [station!];
      const { markers } = this.viewModel.getProps.map;
      let markersToRm: any[];
      if (station!.length === 0) {
        markersToRm = markers.filter(o => o.type === 'station');
      } else {
        markersToRm = station.map(a => markers.find(o => o.station!.id === a.id)).filter(o => !!o);
      }
      markersToRm.map(o => o.marker).forEach(this.map!.removeMarker);
      this.viewModel.getProps.next!('map/removeMarkers', {
        markers: markersToRm,
      });
    }
  };

  AddMarker = ({
    apartment,
    type,
    station,
  }: {
    apartment?: IApartment | IApartment[];
    type: 'station' | 'apartment';
    station?: IMetroStationClient | IMetroStationClient[];
  }) => {
    if (type === 'apartment') {
      if (!Array.isArray(apartment)) apartment = [apartment!];
      const markers = apartment.map(apt => {
        return {
          marker: this.map?.addMarker(
            apt.lng,
            apt.lat,
            () => this.onPressMarker(apt, type),
            'house',
            {
              label: { content: `<div id="marker">${apt.price}</div>` },
            },
          ),
          type,
          apartment: apt,
        };
      });
      this.viewModel.getProps.next!('map/addNewMarkers', {
        markers,
      });
    }

    if (type === 'station') {
      if (!Array.isArray(station)) station = [station!];
      const markers = station.map(v => {
        return {
          marker: this.map?.addMarker(
            v.coordinates[0],
            v.coordinates[1],
            () => this.onPressMarker(v, type),
            'metro',
            {
              label: { content: `<div id="marker">${v.stationName}</div>` },
            },
          ),
          type,
          station: v,
        };
      });
      this.viewModel.getProps.next!('map/addNewMarkers', {
        markers,
      });
    }
  };

  onPressMarker: {
    (value: IApartment, type: 'apartment'): void;
    (value: IMetroStationClient, type: 'station'): void;
  } = (value: IApartment | IMetroStationClient, type: 'apartment' | 'station') => {
    if (type === 'apartment') {
      this.map!.moveTo((value as IApartment).lng, (value as IApartment).lat);
      next(XENO_EVENT.ON_PRESS_MARKER, {
        apartment: value as IApartment,
        type: 'apartment',
      });
    }

    if (type === 'station') {
      this.map!.moveTo(
        (value as IMetroStationClient).coordinates[0],
        (value as IApartment).coordinates[1],
        // 13,
      );
      next(XENO_EVENT.ON_PRESS_MARKER, {
        station: value as IMetroStationClient,
        type: 'station',
      });
    }
  };
}

export { MapPresenter };
