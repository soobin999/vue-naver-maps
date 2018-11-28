import Map from './Map.vue';
import InfoWindow from './InfoWindow.vue';
import Marker from './overlays/NaverMarker.vue';
import NaverCircle from './overlays/NaverCircle.vue';
import NaverRectangle from "./overlays/NaverRectangle.vue";
import NaverEllipse from "./overlays/NaverEllipse.vue";
import Vue from 'vue';

const vueNaverMaps = {
  /**
   * @param Vue
   * @param {
   * { clientID:string
   *  useOpenAPI?:boolean
   *  subModules:string}
   * } options
   */
  install(Vue, options) {
    if (process.browser) {
      if (options.clientID) {
        window.$naverMapsCallback = [];
        const URL = `https://openapi.map.naver.com/openapi/v3/maps.js?${options.useOpenAPI ? 'c' : 'ncpC'}lientId=${options.clientID}${(options.subModules ? `&submodules=${options.subModules}` : '')}`;
        const SCRIPT = document.createElement('script');
        if (SCRIPT) {
          SCRIPT.setAttribute('src', URL);
          SCRIPT.id = 'naver-map-load';
          SCRIPT.setAttribute('async', '');
          SCRIPT.setAttribute('defer', '');
          document.head.appendChild(SCRIPT);
        } else throw new Error('api can\'t loaded');
      } else throw new Error('options must be included clientID');
      Vue.component('naver-maps', Map);
      Vue.component('naver-info-window', InfoWindow);
      Vue.component('naver-marker', Marker);
      Vue.component('naver-circle', NaverCircle);
      Vue.component('naver-ellipse', NaverEllipse);
      Vue.component('naver-rectangle', NaverRectangle);
    } else throw new Error('Sorry, this plugin is only available in browsers at now. If you are using Nuxt.js, turn off ssr for this plugin.');
  }
};

export default vueNaverMaps;
