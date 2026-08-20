import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Button } from '../../packages/ui-core/src/Button';

describe('Button', () => {
  it('appelle son action quand il est disponible', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<Button onClick={onClick}>Réserver</Button>);

    await user.click(screen.getByRole('button', { name: 'Réserver' }));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('bloque son action pendant le chargement', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<Button loading onClick={onClick}>Réserver</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});
