import { type ArgusRating } from './ArgusRating'

export interface Movie {
  argusRating: ArgusRating
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
  argusRating: Movie['argusRating'],
  coverArtDataUrl: Movie['coverArtDataUrl'],
  plotSummary: Movie['plotSummary'],
  releaseYear: Movie['releaseYear'],
  title: Movie['title']
): Movie {
  return {
    argusRating,
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
  argusRating?: Movie['argusRating'],
  coverArtDataUrl?: Movie['coverArtDataUrl'],
  plotSummary?: Movie['plotSummary'],
  releaseYear?: Movie['releaseYear'],
  title?: Movie['title']
): MovieOptional {
  return {
    argusRating,
    coverArtDataUrl,
    plotSummary,
    releaseYear,
    title
  }
}
