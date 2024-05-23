import { createRouter, createWebHistory } from 'vue-router';

import Home from "../views/pages/Home.vue"
import Collection from"../views/pages/Collection.vue"
import Login from"../views/pages/Login.vue"
import Explore from"../views/pages/Explore.vue"
import Cart from"../views/pages/Cart.vue"
import Aboutus from"../views/pages/Aboutus.vue"
import Byyou from"../views/pages/Byyou.vue"
import Register from "../views/pages/Register.vue"
import Forgotpassword from "../views/pages/Forgotpassword.vue"
import Product from '../views/pages/Product.vue'
import Accountpage from '../views/pages/Accountpage.vue'
import Checkout from '../views/pages/Checkout.vue'
import Order from '../views/pages/Order.vue'
import Chatbox from '../views/pages/Chatbox.vue'

const ifAuthenticated = (to, from, next) => {
    const loggedin = localStorage.getItem('session_token')
    if(loggedin) {
        next()
        return
    }
    next('/login')
}

const routes = [
    { path: "/", component: Home },
    { path: "/collection", component: Collection },
    { path: "/login", component: Login },
    { path: "/explore", component: Explore },
    { path: "/cart", component: Cart },
    { path: "/aboutus", component: Aboutus },
    { path: "/byyou", component: Byyou },
    { path: "/register", component: Register },
    { path: "/forgotpassword", component: Forgotpassword },
    { path: "/product/:id", component: Product },
    { path: "/accountpage", component: Accountpage, beforeEnter: ifAuthenticated },
    { path: "/checkout", component: Checkout },
    { path: "/order/:id", component: Order },
    { path: "/chatbox", component: Chatbox }
]

const router = createRouter({
    history: createWebHistory('/Fullstack-App/'),  // Use the base URL
    routes,
})

export default router
