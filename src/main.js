import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import VueAxios from 'vue-axios';
import qs from 'qs';
import moment from 'moment';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import api from './global/api';
import global from './global/global';

Vue.use(VueAxios, axios);
Vue.prototype.qs = qs;
Vue.use(ViewUI);
Vue.use(global);

Vue.prototype.api = api;
Vue.config.productionTip = false;

Vue.filter('dateFormat', function (tick) {
    return moment(tick).format("YYYY-MM-DD HH:mm:ss");
});

axios.defaults.baseURL = process.env.VUE_APP_SERVER;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;

// http request 拦截器
axios.interceptors.request.use(request => {
    request.data = qs.stringify(request.data);
    return request;
});

// http response 拦截器
axios.interceptors.response.use(response => {
    let resp = response.data;
    if (resp.status === "010001" || resp.status === "010002") {
        store.commit("setStatus", resp.status);
        router.push("/error").then();
        return false;
    }
    return response;
});

// 统计页面浏览次数
router.afterEach(() => {
    axios.post(api.access.pageView).then();
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
