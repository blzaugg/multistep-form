<script setup lang="ts">
/*
 * Generated file.
 *
 * I then:
 *  - Updated nav
 */
import { computed } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { PlusIcon, ListBulletIcon } from '@radix-icons/vue'

import { Button } from '@/components/shadcn/button'
import Toaster from '@/components/shadcn/toast/Toaster.vue'

const route = useRoute()
const underAddNewMovieFlow = computed(() => route.path.startsWith('/add-new-movie'))
</script>

<template>
  <header class="mb-3">
    <!-- TODO: Rework navigation -->
    <nav>
      <Button v-if="underAddNewMovieFlow" asChild>
        <RouterLink class="flex gap-x-1" to="/">
          <ListBulletIcon class="mr-1 h-5 w-5" />

          Movie List
        </RouterLink>
      </Button>

      <Button v-else asChild>
        <RouterLink
          class="flex gap-x-1"
          :to="{ name: 'add-new-movie-1', query: { reset: 'true' } }"
        >
          <PlusIcon class="-ml-1 h-5 w-5" />

          Add A New Movie
        </RouterLink>
      </Button>
    </nav>
  </header>

  <RouterView />

  <Toaster />
</template>
