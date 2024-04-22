<!-- Custom file. -->

<script setup lang="ts">
/* IMPORTS > PAGE */

import PageHeading from '@/components/PageHeading.vue'

/* IMPORTS > FORM */

import { useRoute } from 'vue-router'
import { type PrivateFormContext } from 'vee-validate'
import { string as zodString } from 'zod'

import MovieCard from '@/components/MovieCard.vue'
import MovieFormBottomNav from '@/components/MovieFormBottomNav.vue'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/shadcn/form'
import { Input } from '@/components/shadcn/input'

import useVeeValidateZodTypedSchemasUtils from '@/lib/useVeeValidateZodTypedSchemasUtils'

import router from '@/router'

import { useMovieFormStore } from '@/stores/movieForm'

/* FORM > DATA */

const movieFormStore = useMovieFormStore()

/* FORM > VALIDATION */

const validationFields = {
  releaseYear: zodString().regex(/^\d{4}$/, { message: 'Must be a 4 digit year' }),
  title: zodString().min(1).max(512)
}

const { isFieldRequired, typedSchema } = useVeeValidateZodTypedSchemasUtils(validationFields)

/* FORM > NAV > EVENTS */

/** Validate form and navigate to next step */
function onClickNext(validate: PrivateFormContext['validate']) {
  // TODO: Use await try/catch
  validate().then((result) => {
    if (result.valid === true) {
      router.push({ name: 'add-new-movie-2' })
    }
  })
}

/* Reset form on first landing. */

const route = useRoute()

if (route.query.reset) {
  movieFormStore.$reset()

  if (route.name) {
    // Remove the "reset" query
    router.replace({
      name: route.name,
      params: route.params,
      query: {}
    })
  }
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
      class="my-6 space-y-6"
      :validationSchema="typedSchema"
      :initialValues="{
        title: movieFormStore.inputs.title ?? '',
        releaseYear: movieFormStore.inputs.releaseYear ?? ''
      }"
    >
      <!-- Title -->
      <FormField
        v-slot="{ componentField, handleChange, meta: metaField }"
        name="title"
        :validateOnMount="meta.initialValues!.title != ''"
      >
        <FormItem>
          <FormLabel>
            Title

            <span v-if="isFieldRequired('title')" aria-label="required">*</span>
          </FormLabel>

          <FormControl>
            <Input
              v-bind="{
                ...componentField,

                // Write to store on modelValue update
                ['onUpdate:modelValue']: (payload) =>
                  (movieFormStore.inputs.title = String(payload)),

                /*
                 * shouldValidate:
                 * - false: Lazy validation while input is invalid & unvalidated
                 * - true: Aggresive validation while input is valid or validated
                 */
                onInput: (event: Event) =>
                  handleChange(event, metaField.valid || metaField.validated)
              }"
              type="text"
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      </FormField>

      <!-- Year -->
      <FormField
        v-slot="{ componentField, handleChange, meta: metaField }"
        name="releaseYear"
        :validateOnMount="meta.initialValues!.releaseYear != ''"
      >
        <FormItem>
          <FormLabel>
            Year

            <span v-if="isFieldRequired('releaseYear')" aria-label="required">*</span>
          </FormLabel>

          <FormControl>
            <Input
              v-bind="{
                ...componentField,

                // Write to store on modelValue update
                ['onUpdate:modelValue']: (payload) =>
                  (movieFormStore.inputs.releaseYear = String(payload)),

                /*
                 * shouldValidate:
                 * - false: Lazy validation while input is invalid & unvalidated
                 * - true: Aggresive validation while input is valid or validated
                 */
                onInput: (event: Event) =>
                  handleChange(event, metaField.valid || metaField.validated)
              }"
              class="w-16"
              maxlength="4"
              placeholder="4 digit year"
              type="text"
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      </FormField>

      <MovieFormBottomNav :nextEnabled="meta.valid" @clickNext="onClickNext(validate)" />
    </Form>
  </main>
</template>
