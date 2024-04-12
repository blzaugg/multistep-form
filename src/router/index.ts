import { createRouter, createWebHistory } from 'vue-router'
import MoviesListView from '../views/MoviesListView.vue'
import AddNewMovie1View from '../views/AddNewMovie1View.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'movies-list',
      component: MoviesListView
    },
    {
      path: '/add-new-movie-1',
      name: 'add-new-movie-1',
      component: AddNewMovie1View
    }
  ]
})

export default router
