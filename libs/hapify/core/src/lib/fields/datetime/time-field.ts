import { Field } from '../field';

export class TimeField extends Field {}

/**
 * Checks if a field is time field
 */
export function isTime(field: Field): field is TimeField {
  return field instanceof TimeField;
}
