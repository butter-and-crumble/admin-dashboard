import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import firebase from 'firebase'
Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
    {
        path: '*',
        redirect: '/'
    },
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/orders',
        name: 'Orders',
        component: () => import('../views/Orders.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/products',
        name: 'Products',
        component: () => import('../views/Products.vue'),
        meta: {
            requiresAuth: true
        }
    },
	{
		path: '/calendar',
		name: 'Calendar',
		component: () => import('../views/Calendar.vue'),
		meta: {
			requiresAuth: true
		}
	},
    {
        path: '/blackouts',
        name: 'Blackouts',
        component: () => import('../views/Blackouts.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/product/:id',
        name: 'Product',
        component: () => import('../views/Product.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../components/Login.vue')
    },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
    const currentUser = firebase.auth().currentUser

    if (requiresAuth && !currentUser) {
        next('/login')
    } else if (requiresAuth && currentUser) {
        next()
    } else {
        next()
    }
})

export default router
