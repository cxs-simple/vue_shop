import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [{ path: '/welcome', component: Welcome }]
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to：代表将要访问的路径
  // from：代表从哪个路径跳转而来
  // next：放行函数
  //       next() 放行；
  //       next('/login') 强制跳转

  // 如果用户访问登录页面，直接放行
  if (to.path === '/login') return next()
  // 从sessionStorage中获取保存的token值
  const tokenStr = window.sessionStorage.getItem('token')
  // token不存在时 强制跳转到登录页面
  if (!tokenStr) return next('/login')
  // token存在时，直接放行
  return next()
})
export default router
