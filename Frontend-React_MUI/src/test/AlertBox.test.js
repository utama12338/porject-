import React from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import jest-dom for extended matchers
import AlertBox from '../components/ola-custom/AlertBox';

describe('Test AlertBox Component', () => {

  it('Testing Redner', async () => {
    render(<AlertBox color="warning" message="Hi Test Message" />);
    const snackbar = within(await screen.findByRole('alert'));
    expect(snackbar.getByText('Hi Test Message')).toBeInTheDocument();

  });
});
