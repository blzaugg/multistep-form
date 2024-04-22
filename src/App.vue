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
  <!-- TODO: Abstract to SiteHeader -->
  <header class="mb-3">
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

  <!-- TODO: Abstract to SiteFooter -->
  <footer
    class="my-3 flex h-5 w-full items-center justify-center space-x-4 text-sm text-muted-foreground"
  >
    <div>© Byran Zaugg</div>

    <div>
      <Button
        as="a"
        variant="link"
        class="text-muted-foreground underline hover:no-underline"
        href="https://github.com/blzaugg/multistep-form/"
      >
        Project source @ GitHub
      </Button>
    </div>
  </footer>

  <Toaster />
</template>
