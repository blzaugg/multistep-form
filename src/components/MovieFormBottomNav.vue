<!-- Custom file. -->

<!--
  Usage examples:

  First step:

  <MovieFormBottomNav
    :nextEnabled="formIsValid"
    @clickNext="onClickNext"
  />
  
  Middle step:

  <MovieFormBottomNav
    previousShow
    :nextEnabled="formIsValid"
    @clickNext="onClickNext"
    @clickPrevious="onClickPrevious"
  />

  Final/Save step:

  <MovieFormBottomNav
    previousShow
    nextChevronHide
    :nextEnabled="formIsValid"
    nextLabel="Save"
    @clickNext="onClickSave"
    @clickPrevious="onClickPrevious"
  />
-->

<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-icons/vue'

import { Button } from '@/components/shadcn/button'

withDefaults(
  defineProps<{
    // TODO: Busy prop
    nextEnabled?: boolean
    nextLabel?: string
    nextChevronHide?: boolean
    previousLabel?: string
    previousShow?: boolean
  }>(),
  {
    nextLabel: 'Next',
    previousLabel: 'Previous'
  }
)

defineEmits(['clickPrevious', 'clickNext'])
</script>

<template>
  <div class="flex justify-between">
    <Button
      v-if="previousShow"
      :aria-label="previousLabel"
      type="button"
      variant="secondary"
      @click="$emit('clickPrevious')"
    >
      <ChevronLeftIcon class="-ml-1 -mr-1 h-5 w-5" />
    </Button>

    <Button class="ml-auto" :disabled="!nextEnabled" type="button" @click="$emit('clickNext')">
      {{ nextLabel }}

      <!-- TODO: Busy icon -->
      <ChevronRightIcon v-if="!nextChevronHide" class="-mr-1 h-5 w-5" />
    </Button>
  </div>
</template>
