import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import jest-dom for extended matchers
import Footer from '../components/ola/Footer';
import BoxColorSubject from '../components/ola-custom/BoxColorSubject';

describe('Test Structure Components', () => {
  it('Reader Footer Component', async () => {
    const expectedContent = '© 2023 Government Savings Bank';
    render(<Footer />);
    const contentElement = screen.getByTestId('credit-test');
    expect(contentElement).toBeInTheDocument();
    expect(contentElement).toHaveTextContent(expectedContent);
  });

  it('Render BoxColorSubject Component', async () => {
    const expectedContent = {
      textAlign: 'center',
      borderRadius: '0.5rem',
      py: '0.5rem',
      mb: '1rem',
      backgroundColor: '#F1DECF',
      width: '40px',
    };
    expect(BoxColorSubject()).toStrictEqual(expectedContent);
  });
});
