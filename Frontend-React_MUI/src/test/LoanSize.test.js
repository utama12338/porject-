import React from 'react';
import { render, renderHook, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import jest-dom for extended matchers
import LoanSize from '../components/ola/LoanSize';

describe('Test Loan Size Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Testing should set state and render items of Loan Size', async () => {
    const { result } = renderHook(()=> <LoanSize/>)
    expect(result.current.loanSize).toBe(undefined)
   
  });

 
});
