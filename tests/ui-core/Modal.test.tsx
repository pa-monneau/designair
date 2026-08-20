import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Modal } from '../../packages/ui-core/src/Modal';

describe('Modal', () => {
  it('ferme la modale avec Escape et restaure le focus précédent', async () => {
    const user = userEvent.setup();
    const ModalExample = () => {
      const [open, setOpen] = useState(false);

      return (
        <>
          <button type="button" onClick={() => setOpen(true)}>Ouvrir</button>
          <Modal open={open} onClose={() => setOpen(false)} closeLabel="Fermer" labelledBy="modal-title">
            <h2 id="modal-title">Confirmer</h2>
            <button type="button">Valider</button>
          </Modal>
        </>
      );
    };

    render(<ModalExample />);

    const trigger = screen.getByRole('button', { name: 'Ouvrir' });
    await user.click(trigger);
    expect(screen.getByRole('dialog')).toBeVisible();
    await user.keyboard('{Escape}');

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
