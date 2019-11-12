import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const examples = [{
  path: '/examples/bee-icons',
  component: () => import(/* webpackChunkName: "bee-icons" */ './views/examples/bee-icons.vue')
}, {
  path: '/examples/bee-pop',
  component: () => import(/* webpackChunkName: "bee-pop" */ './views/examples/bee-pop.vue')
}, {
  path: '/examples/bee-dialog',
  component: () => import(/* webpackChunkName: "bee-toast" */ './views/examples/bee-dialog.vue')
}, {
  path: '/examples/bee-picker',
  component: () => import(/* webpackChunkName: "bee-picker" */ './views/examples/picker.vue')
}, {
  path: '/examples/buttons',
  component: () => import(/* webpackChunkName: "buttons" */ './views/examples/buttons.vue')
}, {
  path: '/examples/reset',
  component: () => import(/* webpackChunkName: "reset" */ './views/examples/reset.vue')
}, {
  path: '/examples/flex',
  component: () => import(/* webpackChunkName: "flex" */ './views/examples/flex.vue')
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
