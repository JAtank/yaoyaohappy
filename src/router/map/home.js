/**
 * Created by Administrator on 2017/9/28.
 */
const router=[
  {
    path: '/home',
    component: function (resolve) {require(['@/views/home/home.vue'], resolve)
    }
  }
]

export default router
