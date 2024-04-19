<!-- Custom file. -->

<script setup lang="ts">
import { ImageIcon } from '@radix-icons/vue'
import AspectRatio from '@/components/aspect-ratio/AspectRatio.vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/shadcn/card'
import { Skeleton } from '@/components/shadcn/skeleton'

defineProps<{
  coverArtDataUrl: string
  plotSummary: string
  releaseYear: string
  title: string
}>()
</script>

<template>
  <Card
    :class="[
      'flex flex-col', // base layout
      'sm:flex-row sm:flex-wrap', // sm layout
      'bg-slate-900' // color
    ]"
  >
    <!-- Cover Art -->
    <div class="sm:w-1/3">
      <AspectRatio
        :class="[
          'flex justify-center items-center m-6 mb-0', // base layout
          'sm:mb-6 sm:mr-0', // sm layout
          'bg-black border-2 border-muted-foreground' // color
        ]"
        :ratio="3 / 4"
      >
        <img
          v-if="coverArtDataUrl != ''"
          class="object-cover w-full h-full"
          :src="coverArtDataUrl"
          :alt="`Cover Art for ${title}`"
        />

        <ImageIcon v-else class="h-20 w-20 text-muted-foreground" />

        <!-- TODO: Add slot so parent can inline an image uploader -->
      </AspectRatio>
    </div>

    <!-- Movie Details -->
    <div class="flex flex-col sm:w-2/3">
      <!-- Movie Title -->
      <CardHeader>
        <CardTitle class="prose-xlz text-2xl">
          {{ title }}
          ({{ releaseYear }})
        </CardTitle>
      </CardHeader>

      <!-- Plot Summary -->
      <CardContent>
        {{ plotSummary }}

        <div v-if="plotSummary == ''" class="space-y-3">
          <Skeleton class="w-5/6 h-4 rounded-lg bg-muted" />
          <Skeleton class="w-full h-4 rounded-lg bg-muted" />
          <Skeleton class="w-5/6 h-4 rounded-lg bg-muted" />
          <Skeleton class="w-2/3 h-4 rounded-lg bg-muted" />
        </div>
      </CardContent>
    </div>
  </Card>
</template>
