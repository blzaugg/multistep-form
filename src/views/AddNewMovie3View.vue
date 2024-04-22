<!-- Custom file. -->

<script setup lang="ts">
/* IMPORTS > PAGE */

import PageHeading from '@/components/PageHeading.vue'

/* IMPORTS > FORM */

import { type PrivateFormContext } from 'vee-validate'
import { enum as zodEnum } from 'zod'
import { ref } from 'vue'

import MovieCard from '@/components/MovieCard.vue'
import MovieFormBottomNav from '@/components/MovieFormBottomNav.vue'
import { Checkbox } from '@/components/shadcn/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/shadcn/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/shadcn/select'
import { useToast } from '@/components/shadcn/toast/use-toast'

import useVeeValidateZodTypedSchemasUtils from '@/lib/useVeeValidateZodTypedSchemasUtils'

import { RatingMpa, MovieFactory } from '@/models/Movie'

import router from '@/router'

import { useMovieFormStore } from '@/stores/movieForm'
import { useMoviesStore } from '@/stores/movies'

/* FORM > DATA */

const movieFormStore = useMovieFormStore()
const moviesStore = useMoviesStore()

const movieFormForceError = ref(true)

const savingMovie = ref(false)

const ratingMpaSelectOpen = ref(false)

/* FORM > VALIDATION */

const validationFields = {
  ratingMpa: zodEnum(
    [RatingMpa.NR, RatingMpa.G, RatingMpa.PG, RatingMpa['PG-13'], RatingMpa.R, RatingMpa['NC-17']],
    {
      errorMap: () => ({ message: 'An MPA Rating is required.' })
    }
  )
}

const { isFieldRequired, typedSchema } = useVeeValidateZodTypedSchemasUtils(validationFields)

/* FORM > NAV > EVENTS */

const { toast } = useToast()

/** Navigate to previous step */
function onClickPrevious() {
  router.push({ name: 'add-new-movie-2' })
}

/** Validate form and save Movie to persistent storage. */
function onClickSave(validate: PrivateFormContext['validate']) {
  // TODO: Use await try/catch
  validate().then((validationResult) => {
    if (validationResult.valid === true) {
      saveMovieToStore()
    }
  })
}

/** Copies Movie from movieFormStore to a new record in moviesStore. */
async function saveMovieToStore() {
  // Disable Footer Nav
  savingMovie.value = true

  if (movieFormForceError.value == true) {
    toast({
      title: 'Unable to Save Movie',
      description: 'Manual faux error via checkbox',
      variant: 'destructive'
    })

    // Enable Footer Nav
    savingMovie.value = false

    // Nothing else to do
    return
  }

  // TODO: Catch MovieFactory errors
  const newMovie = MovieFactory(movieFormStore.inputs)

  let saveResult: string | undefined

  try {
    saveResult = await moviesStore.save(newMovie)
  } catch (error: Error) {
    console.error(error)

    toast({
      title: 'Unable to Save Movie',
      description:
        "Something went wrong. Please try again. If the problem persists; maybe it's you?",
      variant: 'destructive'
    })
  }

  // Were there any anticipated problems?
  if (typeof saveResult === 'string') {
    toast({
      title: 'Unable to Save Movie',
      description: saveResult,
      variant: 'destructive'
    })

    // Enable Footer Nav
    savingMovie.value = false

    // Nothing else to do
    return
  }

  // Redirect to Movie List
  router.push({ name: 'movies-list', query: { addSuccess: 'true' } })
}
</script>

<template>
  <main>
    <PageHeading headingText="Add a New Movie" />

    <MovieCard
      :coverArtDataUrl="movieFormStore.inputs.coverArtDataUrl ?? ''"
      :plotSummary="movieFormStore.inputs.plotSummary ?? ''"
      :ratingMpa="movieFormStore.inputs.ratingMpa ?? ''"
      :releaseYear="movieFormStore.inputs.releaseYear ?? ''"
      :title="movieFormStore.inputs.title ?? ''"
    />

    <!-- TODO: Abstract to MovieForm -->
    <Form
      v-slot="{ validate, meta }"
      class="mt-6 space-y-6"
      :validationSchema="typedSchema"
      :initialValues="{
        ratingMpa: movieFormStore.inputs.ratingMpa ?? '',
        forceError: movieFormForceError
      }"
    >
      <!-- MPA Rating -->
      <FormField
        v-slot="{ componentField, handleChange }"
        name="ratingMpa"
        :validateOnMount="meta.initialValues!.ratingMpa != ''"
      >
        <FormItem>
          <FormLabel @click="() => (ratingMpaSelectOpen = !ratingMpaSelectOpen)">
            MPA Rating

            <span v-if="isFieldRequired('ratingMpa')" aria-label="required">*</span>
          </FormLabel>

          <FormControl>
            <Select
              v-bind="componentField"
              v-model:open="ratingMpaSelectOpen"
              class="w-16"
              @update:modelValue="movieFormStore.inputs.ratingMpa = $event as RatingMpa"
            >
              <SelectTrigger
                class="w-36"
                @blur="handleChange(movieFormStore.inputs.ratingMpa, true)"
              >
                <SelectValue placeholder="Select a rating" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem :value="RatingMpa.NR">No MPA Rating</SelectItem>
                <SelectItem :value="RatingMpa.G">{{ RatingMpa.G }}</SelectItem>
                <SelectItem :value="RatingMpa.PG">{{ RatingMpa.PG }}</SelectItem>
                <SelectItem :value="RatingMpa['PG-13']">{{ RatingMpa['PG-13'] }}</SelectItem>
                <SelectItem :value="RatingMpa.R">{{ RatingMpa.R }}</SelectItem>
                <SelectItem :value="RatingMpa['NC-17']">{{ RatingMpa['NC-17'] }}</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>

          <FormMessage />
        </FormItem>
      </FormField>

      <!-- Force error on Save -->
      <FormField
        v-slot="{ componentField }"
        name="forceError"
        type="checkbox"
        :modelValue="movieFormForceError"
      >
        <FormItem>
          <div class="flex space-x-2">
            <FormControl>
              <Checkbox v-bind="componentField" v-model:checked="movieFormForceError" />
            </FormControl>

            <FormLabel>Force error on Save</FormLabel>
          </div>
        </FormItem>
      </FormField>

      <MovieFormBottomNav
        :previousEnabled="!savingMovie"
        previousShow
        nextChevronHide
        :nextEnabled="!savingMovie && meta.valid"
        nextLabel="Save"
        @clickNext="onClickSave(validate)"
        @clickPrevious="onClickPrevious"
      />
    </Form>
  </main>
</template>
