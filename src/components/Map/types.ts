import { ConnectProps, MapState, Loading } from '@/models/connect';

export interface MapViewModel {
  getProps: Readonly<IProps>;
}

export interface IProps extends ConnectProps {
  map: MapState;
  loading: Loading;
}
