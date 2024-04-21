/* Custom file. */

import { ref } from 'vue'
import { defineStore } from 'pinia'

import { MovieOptionalFactory } from '@/models/Movie'

export const useMovieFormStore = defineStore(
  'movieForm',
  () => {
    /* STATE */

    /** Form input values */
    // TODO: Maybe not nest movie props under inputs?
    const inputs = ref(MovieOptionalFactory())

    /* GETTERS */

    // Nothing yet.

    /* ACTIONS */

    function $reset() {
      inputs.value = MovieOptionalFactory()
    }

    return {
      /* STATE */

      inputs,

      /* GETTERS */

      // Nothing yet.

      /* ACTIONS */

      $reset
    }
  },
  {
    /*
     * pinia-plugin-persistedstate
     * Docs: https://prazdevs.github.io/pinia-plugin-persistedstate/guide/config.html
     */
    persist: {
      // Using sessionStorage so form doesn't persist across windows/sessions
      storage: sessionStorage
    }
  }
)
