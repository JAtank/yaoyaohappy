/**
 * Created by Administrator on 2017/9/28.
 */
const router=[
  {
    path: '/welcome',
    component: function (resolve) {require(['@/views/welcome/welcome.vue'], resolve)
    }
  }
]

export default router
