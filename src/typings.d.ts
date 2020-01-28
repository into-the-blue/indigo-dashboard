declare module 'slash2';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'omit.js';

// google analytics interface
interface GAFieldsObject {
  eventCategory: string;
  eventAction: string;
  eventLabel?: string;
  eventValue?: number;
  nonInteraction?: boolean;
}
interface Window {
  ga: (
    command: 'send',
    hitType: 'event' | 'pageview',
    fieldsObject: GAFieldsObject | string,
  ) => void;
  reloadAuthorized: () => void;
}

declare let ga: Function;

// preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
declare let ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: 'site' | undefined;

declare class BMap {
  static Map: any;

  static Point: any;

  static Convertor: any;

  static NavigationControl: any;

  static MapTypeControl: any;

  static ScaleControl: any;

  static OverviewMapControl: any;

  static Icon: any;

  static Size: any;

  static Marker: any;
}

declare class AMap {
  static Map: any;

  static Pixel: any;

  static plugin: any;

  static Size: any;

  static Marker: any;

  static ToolBar: any;

  static Scale: any;

  static OverView: any;

  static MapType: any;

  static Geolocation: any;
}
