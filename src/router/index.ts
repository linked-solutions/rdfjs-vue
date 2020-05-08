import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import EditorDemo from '../views/EditorDemo.vue'
import DatasetEditorDemo from '../views/DatasetEditorDemo.vue'
import DatasetBrowserDemo from '../views/DatasetBrowserDemo.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/dataset-browser-demo',
    name: 'dataset-browser-demo',
    component: DatasetBrowserDemo
  },
  {
    path: '/dataset-editor-demo',
    name: 'dataset-editor-demo',
    component: DatasetEditorDemo
  },
  {
    path: '/editor-demo',
    name: 'editor-demo',
    component: EditorDemo
  },
  {
    path: '/about',
    name: 'about',
    component: About
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
