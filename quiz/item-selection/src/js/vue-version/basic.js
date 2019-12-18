import Vue from 'vue';

import App from './components/editor-with-mask.vue';
//import { itemGroup } from '../data';

// * ----------------

const $container = document.querySelector('#container');
const $context = document.createElement('div');
$container.appendChild($context);

export const app = new Vue({
  render: (h) =>
    h(App, {
      props: { /* itemGroup, */ mask: false },
      methods: {
        updateComponentData() {
          // console.warn(this.$refs, this.itemGroup);
          // this.$refs.component.open = true;
        },
      },
    }),
}).$mount($context);

window.Vue = Vue;
window.app = app;
// window.appData = appData;
