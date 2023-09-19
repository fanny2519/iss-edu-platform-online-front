import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import axios from "./http/axios";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/icon/iconfont.css';
import * as echarts from 'echarts'

Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts

Vue.prototype.$avatarUrl = 'http://localhost:8080/edu-platform/background/image/';
Vue.prototype.$uploadAvatar = 'http://localhost:8080/edu-platform/background/upload/uploadAvatar';

Vue.use(ElementUI);

let vue = new Vue({
    router,
    render: h => h(App),
}).$mount('#app')

export default vue
