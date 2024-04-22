<!-- Custom file. -->

<script setup lang="ts">
/* IMPORTS > PAGE */

import PageHeading from '@/components/PageHeading.vue'

/* IMPORTS > FORM */

import { Cross2Icon } from '@radix-icons/vue'
import { type PrivateFormContext, type PrivateFieldContext } from 'vee-validate'
import { string as zodString } from 'zod'

import MovieCard from '@/components/MovieCard.vue'
import MovieFormBottomNav from '@/components/MovieFormBottomNav.vue'
import { Button } from '@/components/shadcn/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/shadcn/form'
import { Input } from '@/components/shadcn/input'
import { Textarea } from '@/components/shadcn/textarea'

import { fileBlobToDataUrl } from '@/lib/fileUtils'
import useVeeValidateZodTypedSchemasUtils from '@/lib/useVeeValidateZodTypedSchemasUtils'

import router from '@/router'

import { useMovieFormStore } from '@/stores/movieForm'

/* FORM > DATA */

const movieFormStore = useMovieFormStore()

/* FORM > VALIDATION */

const plotSummaryLengthMax = 200

const validationFields = {
  plotSummary: zodString().min(10).max(plotSummaryLengthMax),
  coverArtDataUrl: zodString().min(1, { message: 'Cover Art required' })
}

const { isFieldRequired, typedSchema } = useVeeValidateZodTypedSchemasUtils(validationFields)

/* FORM > INPUTS > EVENTS */

function onChangeFile($event: Event, handleChange: PrivateFieldContext['handleChange']) {
  const fileInputElement = $event.target as HTMLInputElement
  if (fileInputElement.files == null || fileInputElement.files.length == 0) {
    // TODO: Toast error
    console.error('TODO: Toast missing image')
    return
  }

  // TODO: Use await try/catch
  fileBlobToDataUrl(fileInputElement.files[0])
    .then((encodedString) => {
      // Run validation
      handleChange(encodedString, true)

      // Store encodedString
      movieFormStore.inputs.coverArtDataUrl = encodedString
    })
    .catch((error) => {
      // TODO: Toast error
      console.error(error)
    })
}

function onClickRemoveImage(handleChange: PrivateFieldContext['handleChange']) {
  movieFormStore.inputs.coverArtDataUrl = undefined

  // Force invalid
  handleChange('', true)
}

/* FORM > NAV > EVENTS */

/** Validate form and navigate to next step */
function onClickNext(validate: PrivateFormContext['validate']) {
  // TODO: Use await try/catch
  validate().then((result) => {
    if (result.valid === true) {
      router.push({ name: 'add-new-movie-3' })
    }
  })
}

/** Navigate to previous step */
function onClickPrevious() {
  router.push({ name: 'add-new-movie-1' })
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
        coverArtDataUrl: movieFormStore.inputs.coverArtDataUrl ?? '',
        plotSummary: movieFormStore.inputs.plotSummary ?? ''
      }"
    >
      <!-- Cover Art -->
      <FormField
        v-slot="{ componentField, handleChange }"
        name="coverArtDataUrl"
        :validateOnMount="meta.initialValues!.coverArtDataUrl != ''"
      >
        <FormItem>
          <FormLabel>
            Cover Art

            <span v-if="isFieldRequired('coverArtDataUrl')" aria-label="required">*</span>
          </FormLabel>

          <FormControl>
            <Input
              v-if="movieFormStore.inputs.coverArtDataUrl == null"
              accept="image/*"
              :class="[
                'w-60 p-0', // base layout
                'cursor-pointer', // base events
                'text-secondary-foreground', // base color
                'file:mr-4 file:h-full file:px-4', // button layout
                'file:bg-primary file:text-foreground' // button color
              ]"
              :name="componentField.name"
              type="file"
              @change="onChangeFile($event, handleChange)"
              @blur="handleChange(movieFormStore.inputs.coverArtDataUrl, true)"
            />

            <Button
              v-else
              class="flex gap-x-1"
              variant="destructive"
              type="button"
              @click="onClickRemoveImage(handleChange)"
            >
              <Cross2Icon class="-ml-1 h-5 w-5" />

              Remove Image
            </Button>
          </FormControl>

          <FormMessage />
        </FormItem>
      </FormField>

      <!-- Plot Summary -->
      <FormField
        v-slot="{ componentField, handleChange, meta: metaField }"
        name="plotSummary"
        :validateOnMount="meta.initialValues!.plotSummary != ''"
      >
        <FormItem>
          <FormLabel>
            Plot Summary

            <span v-if="isFieldRequired('plotSummary')" aria-label="required">*</span>
          </FormLabel>

          <FormControl>
            <Textarea
              v-bind="{
                ...componentField,

                // Write to store on modelValue update
                ['onUpdate:modelValue']: (payload) =>
                  (movieFormStore.inputs.plotSummary = String(payload)),

                /*
                 * shouldValidate:
                 * - false: Lazy validation while input is invalid & unvalidated
                 * - true: Aggresive validation while input is valid or validated
                 */
                onInput: (event: Event) =>
                  handleChange(event, metaField.valid || metaField.validated)
              }"
              class="min-h-28"
              >{{ movieFormStore.inputs.plotSummary }}</Textarea
            >
          </FormControl>

          <FormDescription class="font-semibold" aria-description="Remaining characters">
            <span :class="!metaField.valid && 'text-destructive'">
              {{
                movieFormStore.inputs.plotSummary != null
                  ? movieFormStore.inputs.plotSummary.length
                  : 0
              }}
            </span>

            / {{ plotSummaryLengthMax }}
          </FormDescription>
        </FormItem>
      </FormField>

      <MovieFormBottomNav
        previousEnabled
        previousShow
        :nextEnabled="meta.valid"
        @clickNext="onClickNext(validate)"
        @clickPrevious="onClickPrevious"
      />
    </Form>
  </main>
</template>
