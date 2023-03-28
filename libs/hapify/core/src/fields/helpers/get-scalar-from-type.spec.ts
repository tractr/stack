import { getScalarFromType } from './get-scalar-from-type';
import { FieldType, ScalarType } from '../field';

describe('getScalarFromType', () => {
  it('should return the scalar type associated to the field type', () => {
    const types = [
      ['string', 'string'],
      ['number', 'number'],
      ['boolean', 'boolean'],
      ['object', 'object'],
      ['date', 'date'],
      ['enum', 'string'],
      ['file', 'string'],
      ['foreign', 'string'],
      ['primary', 'string'],
      ['virtual', 'object'],
    ] satisfies [FieldType, ScalarType][];

    types.forEach(([type, scalar]) => {
      expect(getScalarFromType(type)).toEqual(scalar);
    });
  });
});
