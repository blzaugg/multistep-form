/* Custom file. */

import { toTypedSchema } from '@vee-validate/zod'
import { object } from 'zod'
import { type ZodRawShape } from 'zod'

/** Utils for interacting with VeeValidate + Zod Typed Schemas. */
export default function (validationFields: ZodRawShape) {
  const typedSchema = toTypedSchema(object(validationFields))

  /**
   * Determines if the field is required, based on the FieldPath from the
   * Typed Schema.
   */
  function isFieldRequired(fieldPath: string) {
    if (typedSchema.describe == null) {
      // Unable to determine if field is required
      return false
    }

    const pathDescription = typedSchema.describe(fieldPath)
    return pathDescription.required ?? false
  }

  return {
    isFieldRequired,
    typedSchema
  }
}
