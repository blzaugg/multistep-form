<!-- Custom file. -->

<!--
  Usage example:

  <PageHeading headingText="Add a New Movie" />
-->

<script setup lang="ts">
defineProps<{
  headingText: string
}>()
</script>

<template>
  <header class="my-6">
    <div class="prose prose-invert">
      <h1 class="text-2xl">{{ headingText }}</h1>
    </div>
  </header>
</template>
