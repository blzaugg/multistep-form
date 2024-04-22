/* Custom file. */

import { ref } from 'vue'
import { defineStore } from 'pinia'

import { type Movie, type MovieOptional, MovieFactory } from '@/models/Movie'

type Movies = Record<Movie['slug'], Movie>

export const useMoviesStore = defineStore(
  'movies',
  () => {
    /* STATE */

    const movies = ref<Movies>({})

    /* GETTERS */

    // Nothing yet.

    /* ACTIONS */

    /** Loads sample Movie data from static JSON file. */
    async function loadSampleData() {
      // TODO: Catch load errors
      const sampleData = await import('./sample_movies.json')

      Object.values(sampleData.movies).map(async (movie) => {
        // TODO: Catch MovieFactory errors
        const newMovie = MovieFactory(movie as MovieOptional)

        await save(newMovie)
      })
    }

    /** Removed a given Movie from the Movies collection. */
    function remove(slug: Movie['slug']) {
      // Nothing yet.

      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete movies.value[slug]
    }

    /**
     * Saves the Movie to the Movies collection.
     *
     * @returns
     *  - `undefined`: When successful.
     *  - `string`: An Error message when something goes wrong.
     */
    function save(movie: Movie): Promise<string | undefined> {
      return new Promise((resolve) => {
        // Fake a delay
        setTimeout(() => {
          // Does slug already exist?
          if (movies.value[movie.slug]) {
            resolve(`${movie.title} (${movie.releaseYear}) already exists. Please try another.`)
          }

          movies.value[movie.slug] = movie

          resolve(undefined)
        }, 1000)
      })
    }

    return {
      /* STATE */

      movies,

      /* GETTERS */

      // Nothing yet.

      /* ACTIONS */

      loadSampleData,
      remove,
      save
    }
  },
  {
    /*
     * pinia-plugin-persistedstate
     * Docs: https://prazdevs.github.io/pinia-plugin-persistedstate/guide/config.html
     */
    persist: {
      // Nothing yet.
    }
  }
)
