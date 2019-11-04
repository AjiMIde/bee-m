import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const examples = [{
  path: '/examples/bee-pop',
  component: () => import(/* webpackChunkName: "test" */ './views/examples/bee-pop.vue')
}, {
  path: '/examples/the-style',
  component: () => import(/* webpackChunkName: "test" */ './views/examples/the-style.vue')
}, {
  path: '/examples/buttons',
  component: () => import(/* webpackChunkName: "test" */ './views/examples/buttons.vue')
}]

const routes = examples.concat([
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    path: '/test',
    component: () => import(/* webpackChunkName: "test" */ './views/test.vue')
  }
])

export default new Router({
  routes
})
