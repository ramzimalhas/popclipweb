// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import Theme from "vitepress/theme";
import "./style.css";

// vercel
import Vercel from '../../src/Vercel.vue';

// local
import AaButton from '../../src/AaButton.vue';
import AaLink from '../../src/AaLink.vue';
import DownloadButton from '../../src/DownloadButton.vue';
import EditionSwitcher from '../../src/EditionSwitcher.vue';
import Edition from '../../src/Edition.vue';

// element-plus css
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/es/components/switch/style/css'
import 'element-plus/es/components/radio/style/css'
import 'element-plus/es/components/radio-button/style/css'
import 'element-plus/es/components/tag/style/css'
import '../../src/style/overrides.css'

export default {
  extends: Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'layout-bottom': () => h(Vercel)
    });
  },
  enhanceApp({ app, router, siteData }) {        
    // local
    app.component("AaButton", AaButton);
    app.component("AaLink", AaLink);
    app.component("DownloadButton", DownloadButton);
    app.component("EditionSwitcher", EditionSwitcher);
    app.component("Edition", Edition);
  },
};
