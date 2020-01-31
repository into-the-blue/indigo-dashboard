import { ConnectProps, TaggingState, Loading, ApartmentState } from '@/models/connect';

export interface IState {
  width: number;
  height: number;
}
export interface ImageTaggingViewModel {
  getProps: Readonly<IProps>;
}

export interface IProps extends ConnectProps {
  tagging: TaggingState;
  loading: Loading;
  apartment: ApartmentState;
}
