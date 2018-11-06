import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import MyPosts from '@/components/MyPosts'
import Signup from '@/components/Signup'
import Login from '@/components/Login'
import EditorSingle from '@/components/EditorSingle'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/posts',
      name: 'Posts',
      component: MyPosts
    },
    {
      path: '/posts/new',
      name: 'PostsNew',
      component: EditorSingle
    },
    {
      path: '/posts/:uuid/edit',
      name: 'PostsEdit',
      component: EditorSingle
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
