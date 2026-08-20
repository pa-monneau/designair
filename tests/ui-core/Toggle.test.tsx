import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Toggle } from '../../packages/ui-core/src/Toggle';

describe('Toggle', () => {
  it('gère son état non contrôlé', async () => {
    const user = userEvent.setup();

    render(<Toggle ariaLabel="Notifications email" />);

    const toggle = screen.getByRole('checkbox', { name: 'Notifications email' });
    expect(toggle).not.toBeChecked();
    await user.click(toggle);
    expect(toggle).toBeChecked();
  });
});
