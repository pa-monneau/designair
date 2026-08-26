import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { PasswordInput } from '../../packages/ui-core/src/PasswordInput';

describe('PasswordInput', () => {
  it('masque le mot de passe par défaut et bascule au clic, en conservant la valeur saisie', async () => {
    const user = userEvent.setup();

    render(
      <PasswordInput
        aria-label="Mot de passe"
        showLabel="Afficher le mot de passe"
        hideLabel="Masquer le mot de passe"
      />,
    );

    const input = screen.getByLabelText('Mot de passe');
    expect(input).toHaveAttribute('type', 'password');

    await user.type(input, 's3cret!');
    expect(input).toHaveValue('s3cret!');

    await user.click(
      screen.getByRole('button', { name: 'Afficher le mot de passe' }),
    );
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveValue('s3cret!');

    await user.click(
      screen.getByRole('button', { name: 'Masquer le mot de passe' }),
    );
    expect(input).toHaveAttribute('type', 'password');
  });
});
