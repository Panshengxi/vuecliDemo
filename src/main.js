import Vue from 'vue'
import '@/components/antd.js'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css'
import '@/assets/common.less'
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
