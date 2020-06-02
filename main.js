import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import draggable from 'vuedraggable'
import 'noto-sans-tc/noto_sans_tc_regular/css.css'
import './style/style.styl'
import VueEllipseProgress from 'vue-ellipse-progress'
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'



// 根據 icon 的種類引用
import { faCheck, faPen, faTimes, faUndo, faSave, faPlay, faPause, faStepForward, faHome, faListUl, faCog } from '@fortawesome/free-solid-svg-icons'
library.add(faCheck, faPen, faTimes, faUndo, faSave, faPlay, faPause, faStepForward, faHome, faListUl, faCog)

// 註冊元件
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('draggable', draggable)
Vue.use(VueEllipseProgress, 'vep')
Vue.use(VueAnalytics, {
  id: 'UA-168209374-1'
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
