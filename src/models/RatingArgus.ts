/* Custom file. */

/**
 * TODO: NOT CURRENTLY IN USE.
 */

type DisplayOrder = 1 | 2 | 3 | 4 | 5 | 6

export type Rating = 0 | 1 | 2 | 3 | 4 | 5

interface RatingCategory<
  LabelLongType extends string,
  LabelShortType extends string,
  DO extends DisplayOrder
> {
  displayOrder: DO
  labelLong: LabelLongType
  labelShort: LabelShortType
  rating: Rating
}

export interface RatingCategories {
  violence: RatingCategory<'Violence', 'V', 1>
  gore: RatingCategory<'Gore', 'G', 2>
  nudity: RatingCategory<'Nudity', 'N', 3>
  sex: RatingCategory<'Sex', 'S', 4>
  language: RatingCategory<'Language', 'L', 5>
  drugs: RatingCategory<'Drugs', 'D', 6>
}

export interface ArgusRating {
  categories: RatingCategories
  // TODO: votesTotal
}
