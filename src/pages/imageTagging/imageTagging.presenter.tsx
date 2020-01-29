import { ImageTaggingViewModel } from './types';
import { gqlClient } from '@/utils';
import { gql } from 'apollo-boost';
import {} from '@/utils/utils';
import { IApartment } from '@/types';
import './index.scss';
import { next, XENO_EVENT } from '@/utils/xeno';
// import { useQuery } from '@apollo/react-hooks';

class ImageTaggingPresenter {
  constructor(public viewModel: ImageTaggingViewModel) {
    //
  }

  componentDidMount() {
    this.initializeData();
  }

  componentWillUnmount() {}

  initializeData = async () => {
    await this.viewModel.getProps.next!('tagging/queryUntaggedApartments');
    const { untaggedApartments } = this.viewModel.getProps.tagging;
    next(XENO_EVENT.ADD_MARKER, {
      apartment: untaggedApartments,
    });
  };
}

export { ImageTaggingPresenter };
