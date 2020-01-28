/* eslint-disable */
import MarkerImg from '@/assets/marker.png';
import HouseImg from '@/assets/house.png';

// 上海的经纬度是东经120°52′-122°12′，北纬30°40′-31°53′之间。
// export class BDMap {
//   elmId: string;

//   map: any;

//   constructor(elmId: string) {
//     this.elmId = elmId;
//     this.map = new BMap.Map(this.elmId, {
//       enableBizAuthLogo: false,
//     });
//     // this.map.setCurrentCity('上海');
//   }

//   moveTo = (lng: number, lat: number, scale: number = 15) => {
//     const point = new BMap.Point(lng, lat);
//     this.map.centerAndZoom(point, scale);
//   };

//   panTo = (lng: number, lat: number) => {
//     this.map.panTo(new BMap.Point(lng, lat));
//   };

//   enableZoom = () => {
//     this.map.enableScrollWheelZoom(true);
//   };

//   addDefaultController = () => {
//     this.map.addControl(new BMap.NavigationControl());
//     this.map.addControl(new BMap.ScaleControl());
//     this.map.addControl(new BMap.OverviewMapControl());
//     this.map.addControl(new BMap.MapTypeControl());
//   };

//   enableStyle = () => {
//     const styleId = '6f0eac61751ff77ccbb5e967c5538605';
//     this.map.setMapStyleV2({
//       styleId,
//     });
//   };

//   addMarker = (lng: number, lat: number, onClick: () => void) => {
//     const point = new BMap.Point(lng, lat);
//     const myIcon = new BMap.Icon(HouseImg, new BMap.Size(25, 25), {
//       // 指定定位位置。
//       // 当标注显示在地图上时，其所指向的地理位置距离图标左上
//       // 角各偏移10像素和25像素。您可以看到在本例中该位置即是
//       // 图标中央下端的尖角位置。
//       // anchor: new BMap.Size(10, 25),
//       // 设置图片偏移。
//       // 当您需要从一幅较大的图片中截取某部分作为标注图标时，您
//       // 需要指定大图的偏移位置，此做法与css sprites技术类似。
//       // imageOffset: new BMap.Size(0, 0 - index * 25)   // 设置图片偏移
//     });
//     // 创建标注对象并添加到地图
//     const marker = new BMap.Marker(point, { icon: myIcon });
//     this.map.addOverlay(marker);
//     marker.addEventListener('click', onClick);

//     return marker;
//   };
// }

export class AAMap {
  elmId: string;

  map: any;

  constructor(elmId: string) {
    this.elmId = elmId;
    this.map = new AMap.Map(this.elmId, {
      // enableBizAuthLogo: false,
    });
    // this.map.setCurrentCity('上海');
  }

  moveTo = (lng: number, lat: number, scale: number = 15) => {
    this.map.setZoomAndCenter(scale, [lng, lat]);
  };

  // panTo = (lng: number, lat: number) => {
  //   this.map.panTo(new BMap.Point(lng, lat));
  // };

  // enableZoom = () => {
  //   this.map.enableScrollWheelZoom(true);
  // };

  addDefaultController = () => {
    // 同时引入工具条插件，比例尺插件和鹰眼插件
    AMap.plugin(
      ['AMap.ToolBar', 'AMap.Scale', 'AMap.OverView', 'AMap.MapType', 'AMap.Geolocation'],
      () => {
        // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
        this.map.addControl(new AMap.ToolBar());

        // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
        this.map.addControl(new AMap.Scale());

        // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
        // this.map.addControl(new AMap.OverView({ isOpen: true }));

        // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
        this.map.addControl(new AMap.MapType());

        // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
        // this.map.addControl(new AMap.Geolocation());
      },
    );
  };

  enableStyle = () => {
    this.map.setMapStyle('amap://styles/6682cfb187c36b5dd65862fd72bd3936');
  };

  addMarker = (
    lng: number,
    lat: number,
    onClick: () => void,
    markerType: 'house' | 'metro' | 'point',
    addtionalProps?: any,
  ) => {
    const marker = new AMap.Marker({
      icon: HouseImg,
      position: [lng, lat],
      offset: new AMap.Pixel(-12.5, -25),
      size: new AMap.Size(25, 25),
      ...addtionalProps,
    });

    marker.on('click', onClick);
    this.map.add(marker);
    return marker;
  };

  getAllMarkers = () => this.map.getAllOverlays('marker');

  cleanMap = () => this.map.clearMap();
}
