import React from 'react';
import { Button, Spin, Row, Col, Input } from 'antd';
import { IProps, IState } from './types';
import { ImageTaggingPresenter } from './imageTagging.presenter';
import { connect_ } from '@/utils';
import { IMap } from '@/components/Map';
import { Rnd } from 'react-rnd';
import './index.scss';
class Tagging extends React.PureComponent<IProps, IState> {
  presenter: ImageTaggingPresenter;

  constructor(props: IProps) {
    super(props);
    this.state = {
      width: 1400,
      height: 700,
    };
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
        <div>
          <Button type={'primary'} onClick={this.presenter.queryMetroStations}>
            {'Show Metro Stations'}
          </Button>
          <Input.Search onSearch={this.presenter.onSearchAddress} />
        </div>
        <div>
          <Rnd
            size={{ width: this.state.width, height: this.state.height }}
            // position={{ x: this.state.x, y: this.state.y }}
            // onDragStop={(e, d) => {
            //   this.setState({ x: d.x, y: d.y });
            // }}
            // lockAspectRatio
            disableDragging
            onResizeStop={(e, direction, ref, delta, position) => {
              this.setState({
                width: +ref.style.width,
                height: +ref.style.height,
                // ...position,
              });
            }}
          >
            <IMap />
          </Rnd>
        </div>
      </div>
    );
  }
}

export default connect_('loading', 'tagging', 'map', 'apartment')(Tagging);
