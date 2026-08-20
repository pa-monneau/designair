import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { DatePicker } from '../../packages/ui-core/src/DatePicker';

describe('DatePicker', () => {
  it('retourne une date sélectionnée dans ses bornes et ferme le calendrier', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <DatePicker
        label="Choisir une date"
        locale="fr"
        min="2026-08-01"
        max="2026-08-31"
        onChange={onChange}
      />,
    );

    const trigger = screen.getByRole('button', { name: 'Choisir une date' });
    await user.click(trigger);
    await user.click(screen.getByRole('button', { name: '15' }));

    expect(onChange).toHaveBeenCalledWith('2026-08-15');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveTextContent('15 août 2026');
  });
});
