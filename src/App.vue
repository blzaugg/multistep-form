<script setup lang="ts">
/*
 * Generated file.
 * 
 * I then:
 *  - Updated nav
 */

import { RouterLink, RouterView } from 'vue-router'

import { Button } from '@/components/shadcn/button'
</script>

<template>
  <header class="mb-3">
    <nav>
      <Button as-child>
        <RouterLink to="/">Movies List</RouterLink>
      </Button>
      <Button as-child>
        <RouterLink to="/add-new-movie/1">Add A New Movie</RouterLink>
      </Button>
    </nav>
  </header>

  <RouterView />
</template>
