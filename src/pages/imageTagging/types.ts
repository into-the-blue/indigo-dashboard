import { ConnectProps, TaggingState, Loading } from '@/models/connect';

export interface ImageTaggingViewModel {
  getProps: Readonly<IProps>;
}

export interface IProps extends ConnectProps {
  tagging: TaggingState;
  loading: Loading;
}
