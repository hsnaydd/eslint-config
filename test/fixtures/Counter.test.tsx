import { render, screen } from '@testing-library/react';

import { Counter } from './Counter';

describe('Counter', () => {
  it('shows the label', () => {
    render(<Counter label="Clicks" />);

    expect(screen.getByRole('button')).toHaveTextContent('Clicks: 0');
  });
});
