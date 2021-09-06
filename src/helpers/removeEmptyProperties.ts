import omitBy from 'lodash/omitBy';
import isNil from 'lodash/isNil';

export const removeEmptyProperties = (obj: Record<string, unknown>): Record<string, unknown> =>
    (omitBy({ ...obj }, isNil));