/* Custom file. */

export enum RatingMpa {
  'NR' = 'NR',
  'G' = 'G',
  'PG' = 'PG',
  'PG-13' = 'PG-13',
  'R' = 'R',
  'NC-17' = 'NC-17'
}

export interface Movie {
  ratingMpa: RatingMpa
  // TODO: ratingArgus: RatingArgus
  /**
   * Cover Art in the form of a data URL
   *
   * data:image/png;base64,...
   */
  coverArtDataUrl: string
  plotSummary: string
  /**
   * 4 digit release year.
   *
   * Using `string` because `number` isn't working well with `<input>` and
   * validation.
   */
  releaseYear: string
  title: string
}

/**
 * Movie with all properties required.
 *
 * Used after record is created.
 */
export function MovieFactory(
  ratingMpa: Movie['ratingMpa'],
  coverArtDataUrl: Movie['coverArtDataUrl'],
  plotSummary: Movie['plotSummary'],
  releaseYear: Movie['releaseYear'],
  title: Movie['title']
): Movie {
  return {
    ratingMpa,
    coverArtDataUrl,
    plotSummary,
    releaseYear,
    title
  }
}

/**
 * Movie with all properties optional.
 *
 * Used while initially filling in values.
 */
export type MovieOptional = {
  [MovieKey in keyof Movie]: Movie[MovieKey] | undefined
}

export function MovieOptionalFactory(
  ratingMpa?: Movie['ratingMpa'],
  coverArtDataUrl?: Movie['coverArtDataUrl'],
  plotSummary?: Movie['plotSummary'],
  releaseYear?: Movie['releaseYear'],
  title?: Movie['title']
): MovieOptional {
  return {
    ratingMpa,
    coverArtDataUrl,
    plotSummary,
    releaseYear,
    title
  }
}
