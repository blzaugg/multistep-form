<!-- Custom file. -->

<!--
  Usage example:

  <MovieCard
    coverArtDataUrl="data:image/png;base64,ABCxyz123..."
    plotSummary="A short plot summary of the movie."
    ratingMpa="PG-13"
    releaseYear="1995"
    title="My Movie Title"
  />
-->

<script setup lang="ts">
import { ImageIcon } from '@radix-icons/vue'
import { AspectRatio } from '@/components/shadcn/aspect-ratio'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/shadcn/card'
import { Skeleton } from '@/components/shadcn/skeleton'

import { RatingMpa } from '@/models/Movie'

import MpaRatingNR from '@/assets/svgs/mpa_rating_nr.svg'
import MpaRatingG from '@/assets/svgs/mpa_rating_g.svg'
import MpaRatingPG from '@/assets/svgs/mpa_rating_pg.svg'
import MpaRatingPG13 from '@/assets/svgs/mpa_rating_pg-13.svg'
import MpaRatingR from '@/assets/svgs/mpa_rating_r.svg'
import MpaRatingNC17 from '@/assets/svgs/mpa_rating_nc-17.svg'

const mpaRatingComponentMap = {
  [RatingMpa.NR]: MpaRatingNR,
  [RatingMpa.G]: MpaRatingG,
  [RatingMpa.PG]: MpaRatingPG,
  [RatingMpa['PG-13']]: MpaRatingPG13,
  [RatingMpa.R]: MpaRatingR,
  [RatingMpa['NC-17']]: MpaRatingNC17
}

defineProps<{
  coverArtDataUrl: string
  plotSummary: string
  ratingMpa: RatingMpa | ''
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
          'm-6 mb-0 flex items-center justify-center', // base layout
          'sm:mb-6 sm:mr-0', // sm layout
          'border-2 border-muted-foreground bg-black' // color
        ]"
        :ratio="2 / 3"
      >
        <img
          v-if="coverArtDataUrl != ''"
          :alt="`Cover Art for ${title}`"
          class="h-full w-full object-cover"
          :src="coverArtDataUrl"
        />

        <ImageIcon v-else class="h-20 w-20 text-muted-foreground" />

        <!-- TODO: Add slot so parent can inline an image uploader -->
      </AspectRatio>
    </div>

    <!-- Movie Details -->
    <div class="flex flex-col sm:w-2/3">
      <CardHeader>
        <CardTitle class="prose-xlz flex gap-x-2 text-2xl">
          <!-- Title -->
          <template v-if="title != ''">
            {{ title }}
          </template>

          <Skeleton v-else class="mt-1 inline h-7 w-4/6 rounded-lg bg-muted" />

          <!-- Year -->
          <template v-if="releaseYear != ''"> ({{ releaseYear }}) </template>

          <Skeleton v-else class="mt-1 inline h-7 w-1/6 rounded-lg bg-muted" />
        </CardTitle>
      </CardHeader>

      <!-- Plot Summary -->
      <CardContent class="prose dark:prose-invert">
        <p v-if="plotSummary != ''">{{ plotSummary }}</p>

        <div v-else class="space-y-3 pb-1 pt-2">
          <Skeleton class="h-4 w-5/6 rounded-lg bg-muted" />
          <Skeleton class="h-4 w-full rounded-lg bg-muted" />
          <Skeleton class="h-4 w-5/6 rounded-lg bg-muted" />
          <Skeleton class="h-4 w-2/3 rounded-lg bg-muted" />
        </div>

        <!-- Rating -->
        <p :aria-label="`MPA Rating: ${ratingMpa}`">
          <component
            :is="mpaRatingComponentMap[ratingMpa]"
            v-if="ratingMpa != ''"
            class="mr-auto h-12 border-2 border-white"
          />

          <Skeleton v-else class="h-12 w-20 rounded-xl bg-muted" />
        </p>
      </CardContent>
    </div>
  </Card>
</template>
