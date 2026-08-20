import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { MenuButton } from '../../packages/ui-core/src/MenuButton';

describe('MenuButton', () => {
  it('referme le menu avec Escape et rend le focus au déclencheur', async () => {
    const user = userEvent.setup();

    render(
      <MenuButton label="Compte">
        <button type="button">Déconnexion</button>
      </MenuButton>,
    );

    const trigger = screen.getByRole('button', { name: 'Compte' });
    await user.click(trigger);
    expect(screen.getByRole('menu')).toBeVisible();

    await user.keyboard('{Escape}');

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
