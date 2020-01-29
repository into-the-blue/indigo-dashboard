import React from 'react';
import {} from 'antd';
import { IProps } from './types';
import { MapPresenter } from './map.presenter';
import { connect_ } from '@/utils';
class Tagging extends React.PureComponent<IProps> {
  presenter: MapPresenter;

  constructor(props: IProps) {
    super(props);
    this.presenter = new MapPresenter(this);
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
    return <div style={{ width: '100%', height: '100%' }} id={'bdMap-container'}></div>;
  }
}

export default connect_('map')(Tagging);
