import { isRelationField } from './is-relation-field';
import { Relation } from '../../models';
import { Field } from '../field';
import { ForeignField } from '../foreign-field';
import { PrimaryField } from '../primary-field';
import { StringField } from '../string-field';
import { VirtualField } from '../virtual-field';

describe('isRelationField', () => {
  it('should return true if the field is a primary field', () => {
    const field = {
      type: 'primary',
      name: 'id',
      pluralName: 'ids',
      scalar: 'string',
      relations: [],
    } satisfies PrimaryField;

    expect(isRelationField(field)).toBeTruthy();
  });

  it('should return true if the field is a virtual field', () => {
    const field = {
      type: 'virtual',
      scalar: null,
      name: 'fullName',
      pluralName: 'fullNames',
      relation: {} as Relation,
    } satisfies VirtualField;

    expect(isRelationField(field)).toBeTruthy();
  });

  it('should return true if the field is a foreign field', () => {
    const field = {
      type: 'foreign',
      name: 'user',
      pluralName: 'users',
      scalar: 'string',
      relation: {} as Relation,
    } satisfies ForeignField;

    expect(isRelationField(field)).toBeTruthy();
  });

  it('should return false if the field is not a relation field', () => {
    const field = {
      type: 'string',
      name: 'name',
      pluralName: 'names',
      scalar: 'string',
    } satisfies StringField;

    expect(isRelationField(field)).not.toBeTruthy();
  });

  it('should narrow the field type if the field is a relation field', () => {
    const fields = [
      {
        type: 'primary',
        name: 'id',
        pluralName: 'ids',
        scalar: 'string',
        relations: [],
      },
    ] satisfies Field[];

    const result: (VirtualField | PrimaryField | ForeignField)[] =
      fields.filter(isRelationField);

    expect(result).toEqual(fields);
  });
});
