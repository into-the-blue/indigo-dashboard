import { ImageTaggingViewModel } from './types';
import { gqlClient } from '@/utils';
import { gql } from 'apollo-boost';
// import { useQuery } from '@apollo/react-hooks';

class ImageTaggingPresenter {
  constructor(public viewModel: ImageTaggingViewModel) {
    //
  }

  componentDidMount() {
    this.viewModel.getProps.next!('tagging/queryUntaggedApartments');
  }

  componentWillUnmount() {}
}

export { ImageTaggingPresenter };
