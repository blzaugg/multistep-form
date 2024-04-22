<!-- Custom file. -->

<script setup lang="ts">
/* IMPORTS > PAGE */

import { useRoute } from 'vue-router'

import router from '@/router'

import PageHeading from '@/components/PageHeading.vue'
import { useToast } from '@/components/shadcn/toast/use-toast'

/* IMPORTS > CAROUSEL */

import { computed, ref } from 'vue'
import { watchOnce } from '@vueuse/core'
import { RocketIcon, TrashIcon } from '@radix-icons/vue'

import { AspectRatio } from '@/components/shadcn/aspect-ratio'
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/shadcn/carousel'
import MovieCard from '@/components/MovieCard.vue'
import { Button } from '@/components/shadcn/button'

import { useMoviesStore } from '@/stores/movies'
import type { Movie } from '@/models/Movie'

/* TOAST > EVENTS */

const { toast } = useToast()

const route = useRoute()

/* Toast on successful Movie creation. */
if (route.query.addSuccess) {
  toast({
    title: 'Successfully Added Movie',
    variant: 'primary'
  })

  if (route.name) {
    // Remove the "addSuccess" query
    router.replace({
      name: route.name,
      params: route.params,
      query: {}
    })
  }
}

/* MOVIE > DATA */

const moviesStore = useMoviesStore()

const isMovieListEmpty = computed(() => Object.keys(moviesStore.movies).length == 0)

const movieListSortedNewestFirst = computed(() => Object.values(moviesStore.movies).reverse())

/* CAROUSEL > DATA */

/**
 * Embla Carousel API
 *
 * Docs: https://www.embla-carousel.com/api/options/
 */
const carouseApiLarge = ref<CarouselApi>()

/**
 * Embla Carousel API
 *
 * Docs: https://www.embla-carousel.com/api/options/
 */
const carouselApiThumbnail = ref<CarouselApi>()

const currentPosition = ref(0)

/* MOVIE > EVENTS */

function onCLickDeleteMovie(slug: Movie['slug']) {
  // TODO: Toast with confirmation.
  moviesStore.remove(slug)
}

function onClickLoadSampleData() {
  moviesStore.loadSampleData()
}

/* CAROUSEL > EVENTS */

/** Tracks position and syncs thumbnails. */
function onSelectLarge() {
  if (carouseApiLarge.value == null || carouselApiThumbnail.value == null) {
    // initApi hasn't run yet.
    return
  }

  // Track current position
  currentPosition.value = carouseApiLarge.value.selectedScrollSnap()

  // Sync Thumbnail to current position
  carouselApiThumbnail.value.scrollTo(currentPosition.value)
}

/** Scrolls to large to selection. */
function onClickThumbnail(index: number) {
  if (carouseApiLarge.value == null || carouselApiThumbnail.value == null) {
    // initApi hasn't run yet.
    return
  }

  carouseApiLarge.value.scrollTo(index)
}

/* Initialize events */
watchOnce(carouseApiLarge, (carouseApiLarge) => {
  if (!carouseApiLarge) {
    return
  }

  onSelectLarge()

  carouseApiLarge.on('select', onSelectLarge)
  carouseApiLarge.on('reInit', onSelectLarge)
})
</script>

<template>
  <main>
    <PageHeading headingText="Movie List" />

    <div class="relative w-full sm:w-auto">
      <template v-if="isMovieListEmpty">
        <Button
          variant="destructive"
          :class="[
            'absolute left-1/2 top-8 z-10 -translate-x-1/2 transform', // center
            'px-7 py-9 text-xl', // layout
            'opacity-40 drop-shadow-2xl transition-opacity hover:opacity-100' // color
          ]"
          @click="onClickLoadSampleData"
        >
          <RocketIcon class="mr-3 h-6 w-6" />

          Load Sample Data
        </Button>
      </template>

      <!-- Thumbnail Carousel -->
      <Carousel
        class="m-auto mb-6"
        @initApi="(payload: CarouselApi) => (carouselApiThumbnail = payload)"
      >
        <CarouselContent class="ml-0 gap-2">
          <!-- Thumbnail (Skeleton) -->
          <template v-if="isMovieListEmpty">
            <CarouselItem
              v-for="(_, index) in 6"
              :key="index"
              :class="[
                'opacity-25', // base color
                'basis-1/3 cursor-pointer pl-0', // base layout
                'sm:basis-1/5', // sm layout
                'md:basis-1/6' // sm layout
              ]"
            >
              <AspectRatio class="h-full w-full rounded-lg bg-muted object-cover" :ratio="2 / 3" />
            </CarouselItem>
          </template>

          <!-- Thumbnail -->
          <template v-else>
            <CarouselItem
              v-for="(movie, index) in movieListSortedNewestFirst"
              :key="movie.slug"
              :aria-label="`Select ${movie.title}`"
              :class="[
                'basis-1/3 cursor-pointer pl-0', // base layout
                'sm:basis-1/5', // sm layout
                'md:basis-1/6' // sm layout
              ]"
              @click="onClickThumbnail(index)"
            >
              <div :class="index === currentPosition ? '' : 'opacity-50'">
                <AspectRatio class="border-2 border-muted bg-black" :ratio="2 / 3">
                  <img
                    :alt="`Cover Art for ${movie.title}`"
                    class="h-full w-full object-cover"
                    :src="movie.coverArtDataUrl"
                  />
                </AspectRatio>
              </div>
            </CarouselItem>
          </template>
        </CarouselContent>
      </Carousel>

      <!-- Large Carousel -->
      <Carousel class="md:mx-8" @initApi="(payload: CarouselApi) => (carouseApiLarge = payload)">
        <CarouselContent>
          <!-- Large (Skeleton) -->
          <template v-if="isMovieListEmpty">
            <CarouselItem class="opacity-25">
              <MovieCard
                class="h-full"
                coverArtDataUrl=""
                plotSummary=""
                ratingMpa=""
                releaseYear=""
                title=""
              />
            </CarouselItem>
          </template>

          <!-- Large -->
          <template v-else>
            <CarouselItem
              v-for="movie in movieListSortedNewestFirst"
              :key="movie.slug"
              class="relative"
            >
              <MovieCard
                class="h-full"
                :coverArtDataUrl="movie.coverArtDataUrl"
                :plotSummary="movie.plotSummary"
                :ratingMpa="movie.ratingMpa"
                :releaseYear="movie.releaseYear"
                :title="movie.title"
              />
              <Button
                class="absolute bottom-3 right-3 opacity-10 transition-opacity hover:opacity-100"
                variant="destructive"
                @click="onCLickDeleteMovie(movie.slug)"
              >
                <TrashIcon class="mr-2 h-5 w-5" />

                Delete Movie
              </Button>
            </CarouselItem>
          </template>
        </CarouselContent>

        <!-- Arrows -->
        <CarouselPrevious class="ml-10 md:ml-0" />
        <CarouselNext class="mr-10 md:mr-0" />
      </Carousel>
    </div>
  </main>
</template>
