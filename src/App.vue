<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Movies List</RouterLink>
        <RouterLink to="/add-new-movie-1">Add New Movie</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
