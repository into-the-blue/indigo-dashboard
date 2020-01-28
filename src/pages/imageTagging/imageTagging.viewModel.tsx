import React from 'react';
import { Button, Spin } from 'antd';
import { IProps } from './types';
import { ImageTaggingPresenter } from './imageTagging.presenter';
import { connect_ } from '@/utils';
import './index.scss';
class Tagging extends React.PureComponent<IProps> {
  presenter: ImageTaggingPresenter;

  constructor(props: IProps) {
    super(props);
    this.presenter = new ImageTaggingPresenter(this);
  }

  componentDidMount() {
    this.presenter.componentDidMount();
  }

  componentWillUnmount() {
    this.presenter.componentWillUnmount();
  }

  get getProps() {
    return this.props;
  }

  render() {
    const { loading, tagging } = this.props;
    return (
      <div>
        <Button>{'Search'}</Button>
        <Spin spinning={!!loading.effects['tagging/queryUntaggedApartments']} />

        <div>{tagging.untaggedApartments.length}</div>

        <div style={{ width: 1500, height: 800 }} id={'bdMap-container'}></div>
      </div>
    );
  }
}

export default connect_('loading', 'tagging')(Tagging);
