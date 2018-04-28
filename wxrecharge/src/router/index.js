import Vue from 'vue'
import Router from 'vue-router'
import WxBind from '@/components/WxBind'
import Flash from '@/components/Flash'

Vue.use(Router)

export default new Router({
    routes: [
      {
            path: '/',
            name: 'Flash',
            component: Flash
        },
        {
          path: '/wxbind',
          name: 'WxBind',
          component: WxBind
        }
    ]
})
