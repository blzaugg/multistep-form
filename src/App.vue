<script setup lang="ts">
/*
 * Generated file.
 *
 * I then:
 *  - Updated nav
 */
import { computed } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'

import { Button } from '@/components/shadcn/button'

const route = useRoute()
const underAddNewMovieFlow = computed(() => route.path.startsWith('/add-new-movie'))
</script>

<template>
  <header class="mb-3">
    <!-- TODO: Rework navigation -->
    <nav>
      <Button v-if="underAddNewMovieFlow" asChild>
        <RouterLink to="/">Movies List</RouterLink>
      </Button>

      <Button v-else asChild>
        <RouterLink :to="{ name: 'add-new-movie-1', query: { reset: 'true' } }"
          >Add A New Movie</RouterLink
        >
      </Button>
    </nav>
  </header>

  <RouterView />
</template>
