export default (api, opts) => {
  api.addHTMLHeadScript({
    type: 'text/javascript',
    src: 'https://webapi.amap.com/maps?v=1.4.15&key=a9ab8c5ddd064b1ad35d1f5648af28d7',
  });

  api.addHTMLHeadScript({
    type: 'text/javascript',
    src: '  https://webapi.amap.com/subway?v=1.0&amp;key=a9ab8c5ddd064b1ad35d1f5648af28d7&amp;callback=cbk',
  });
};
