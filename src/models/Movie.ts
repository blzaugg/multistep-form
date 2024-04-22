/* Custom file. */

import slugLib from 'slug'

export enum RatingMpa {
  'NR' = 'NR',
  'G' = 'G',
  'PG' = 'PG',
  'PG-13' = 'PG-13',
  'R' = 'R',
  'NC-17' = 'NC-17'
}

/**
 * Movie with all properties required.
 *
 * Used on/after record creation.
 */
export interface Movie {
  /**
   * Cover Art in the form of a data URL
   *
   * Eg. data:image/png;base64,...
   */
  coverArtDataUrl: string
  // TODO: ratingArgus: RatingArgus
  ratingMpa: RatingMpa
  plotSummary: string
  /**
   * 4 digit release year.
   *
   * Using `string` because `number` isn't working well with `<input>` and
   * validation.
   *
   * TODO: Maybe use v-model.number + zod.coerce/zod.transform?
   */
  releaseYear: string
  /**
   * Slugified title + releaseYear
   *
   * Eg. my-movie-title-1995
   */
  slug: string
  title: string
}

/**
 * Builds a slug from title + releaseYear
 *
 * Eg.
 *  buildSlug('My Movie Title', '1995')
 *  // my-movie-title-1995
 */
function buildSlug(title: Movie['title'], releaseYear: Movie['releaseYear']) {
  return slugLib(`${title} ${releaseYear}`)
}

/** Creates a new Movie from MovieOptional; validating all props. */
export function MovieFactory(movie: MovieOptional): Movie {
  // Type Guards
  if (movie.coverArtDataUrl == null) {
    throw new Error(`coverArtDataUrl required. Received: ${JSON.stringify(movie.coverArtDataUrl)}`)
  }
  if (movie.plotSummary == null) {
    throw new Error(`plotSummary required. Received: ${JSON.stringify(movie.plotSummary)}`)
  }
  if (movie.ratingMpa == null) {
    throw new Error(`ratingMpa required. Received: ${JSON.stringify(movie.ratingMpa)}`)
  }
  if (movie.releaseYear == null) {
    throw new Error(`releaseYear required. Received: ${JSON.stringify(movie.releaseYear)}`)
  }
  if (movie.title == null) {
    throw new Error(`title required. Received: ${JSON.stringify(movie.title)}`)
  }

  const slug = buildSlug(movie.title, movie.releaseYear)

  return {
    coverArtDataUrl: movie.coverArtDataUrl,
    plotSummary: movie.plotSummary,
    ratingMpa: movie.ratingMpa,
    releaseYear: movie.releaseYear,
    title: movie.title,
    slug
  }
}

type MovieWithoutSlug = Omit<Movie, 'slug'>

/**
 * Movie with all properties optional, and no slug.
 *
 * Used while initially filling in values.
 */
export type MovieOptional = {
  [MovieKey in keyof MovieWithoutSlug]: MovieWithoutSlug[MovieKey] | undefined
}

export function MovieOptionalFactory(
  coverArtDataUrl?: Movie['coverArtDataUrl'],
  plotSummary?: Movie['plotSummary'],
  ratingMpa?: Movie['ratingMpa'],
  releaseYear?: Movie['releaseYear'],
  title?: Movie['title']
): MovieOptional {
  return {
    coverArtDataUrl,
    plotSummary,
    ratingMpa,
    releaseYear,
    title
  }
}
