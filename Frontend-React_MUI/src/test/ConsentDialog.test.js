import React from 'react';
import { render, screen, within  } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect'; // Import jest-dom for extended matchers
import ConsentDialog from '../components/ola-custom/ConsentDialog';

describe('Test ConsentDialog Component', () => {
  it('Testing Redner', async () => {
    render(<ConsentDialog />);

    const button = await screen.findByRole('button', { name: 'เพิ่มเติม' });
    await userEvent.click(button);

    const modal = within(await screen.findByRole('dialog'));
    expect(modal.getByText('ข้อกำหนดและเงื่อนไขการใช้งานระบบแนะนำสินเชื่อธนาคารออมสิน (Term & Condition)')).toBeInTheDocument();

    const closeButton = modal.getByRole("button", { name: "ปิด" });
    await userEvent.click(closeButton);

  });

  it('Testing Click Open Event', async () => {
    render(<ConsentDialog />);

    expect(
      await screen.findByRole("button", { name: "เพิ่มเติม" }),
    ).toBeInTheDocument();

  });

  
});
