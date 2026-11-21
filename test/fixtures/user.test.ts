import { describe, expect, it } from 'vitest';

import { getDisplayName } from './user';

describe('getDisplayName', () => {
  it('falls back to a default name', () => {
    expect(getDisplayName({ id: 1, name: '' })).toBe('Anonymous');
  });
});
