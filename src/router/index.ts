/*
 * Generated file.
 *
 * I then:
 *  - updated/added routes
 */

import { createRouter, createWebHistory } from 'vue-router'
import MoviesListView from '@/views/MoviesListView.vue'
import AddNewMovie1View from '@/views/AddNewMovie1View.vue'
import AddNewMovie2View from '@/views/AddNewMovie2View.vue'
import AddNewMovie3View from '@/views/AddNewMovie3View.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'movies-list',
      component: MoviesListView
    },
    {
      path: '/add-new-movie/1',
      name: 'add-new-movie-1',
      component: AddNewMovie1View
    },
    {
      path: '/add-new-movie/2',
      name: 'add-new-movie-2',
      component: AddNewMovie2View
    },
    {
      path: '/add-new-movie/3',
      name: 'add-new-movie-3',
      component: AddNewMovie3View
    }
  ]
})

export default router
