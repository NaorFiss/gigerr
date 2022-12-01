import { createRouter, createWebHashHistory } from 'vue-router'

import home from './views/home.vue'
import chat from './views/chat.vue'
import gigApp from './views/gig-app.vue'
import reviewApp from './views/review-app.vue'
import login from './views/login.vue'
import signSup from './views/sign-up.vue'
import userDetails from './views/user-details.vue'
import gigDetails from './views/gig-details.vue'
import gigEdit from './views/gig-edit.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/gig',
    name: 'gig-app',
    component: gigApp
  },
  {
    path: '/review',
    name: 'review',
    component: reviewApp
  },
  {
    path: '/chat',
    name: 'chat',
    component: chat
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/signup',
    name: 'signup',
    component: signSup
  },
  {
    path: '/user/:id',
    name: 'user-details',
    component: userDetails
  },
  {
    path: '/gig/:id',
    name: 'gig-details',
    component: gigDetails
  },
  {
    path: '/gig/edit/:_id?',
    name: 'gig-edit',
    component: gigEdit
  },
]


export const router = createRouter({
  routes,
  history: createWebHashHistory()
  // base: process.env.BASE_URL,
})

