import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { render, screen, act, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FinaacialInfo from '../components/ola/FinancialInfo';
import api from '../services/api';
jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

describe('Test FinancialInfo Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Testing useState useLocation and useNavigate', async () => {
    const mockState = {
      uuid: 'test-224-1111-test',
      appno: '231101000001',
      sizeCode: 'S',
      sizeDesc: 'ไม่เกิน 20,000 บาท',
    };
    const mockNavigate = jest.fn();

    useLocation.mockReturnValue({
      state: mockState,
    });
    useNavigate.mockReturnValue(mockNavigate);

    render(<FinaacialInfo />);

    expect(useLocation).toHaveBeenCalled();
    expect(useLocation().state).toEqual(mockState);

    expect(useNavigate).toHaveBeenCalled();
    expect(useNavigate()).toEqual(mockNavigate);
  });

  it('Testing Content', async () => {
    const expectText = 'กรุณาเลือกวัตถุประสงค์การใช้เงิน';
    render(<FinaacialInfo />);
    const elements = screen.getByTestId('checkObjectiveText');
    expect(elements).toHaveTextContent(expectText);
  });

  it('Testing Income and Debt Onchange', async () => {
    render(<FinaacialInfo />);
    const inputIncome = await screen.findByTestId('income-input-test');
    fireEvent.change(inputIncome, { target: { value: '15000' } });
    expect(inputIncome.value).toBe('15000');

    const inputDebt = await screen.findByTestId('debt-input-test');
    fireEvent.change(inputDebt, { target: { value: '3000' } });
    expect(inputDebt).toHaveValue('3000');
  });

  it('Testing Reset OnClick Button', async () => {
    render(<FinaacialInfo />);
    const buttonReset = await screen.findByRole('button', { name: 'ล้างข้อมูล' });
    act(() => fireEvent.click(buttonReset));

    const inputIncome = await screen.findByTestId('income-input-test');
    expect(inputIncome.value).toBe('');
  });

  it('Testing Suggestion OnClick Button', async () => {
    render(<FinaacialInfo />);

    const inputIncome = await screen.findByTestId('income-input-test');
    fireEvent.change(inputIncome, { target: { value: '3000' } });

    const buttonSugestion = await screen.findByRole('button', {
      name: 'สินเชื่อที่เหมาะกับคุณ',
    });
    act(() => fireEvent.click(buttonSugestion));

    expect(inputIncome.value).toBe('3000');
  });

  it('Testing checkbox consent', async () => {
    const { getByRole } = render(<FinaacialInfo />);
    const checkbox = getByRole('checkbox', { name: 'Checkbox demo' });

    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('Testing onclick button for loan suggestion', async () => {
    render(<FinaacialInfo />);

    const inputIncome = await screen.findByTestId('income-input-test');
    fireEvent.change(inputIncome, { target: { value: '15000' } });

    const button = await screen.findByRole('button', { name: 'สินเชื่อที่เหมาะกับคุณ' });
    act(() => fireEvent.click(button));

    expect(inputIncome.value).toBe('15000');
  });

  it('Testing onChange Objective and Occupation', async () => {
    const callApi = jest.spyOn(api, 'getLoanObjective');
    render(<FinaacialInfo />);

    api.getLoanObjective().then((response) => {
      expect(callApi).toHaveBeenCalled();
    });

    const selectObj = await screen.findByTestId('select-obj-test');
    fireEvent.change(selectObj, { target: { value: '0' } });
    expect(selectObj.value).toBe('0');

    const selectOcct = await screen.findByTestId('select-occt-test');
    fireEvent.change(selectOcct, { target: { value: '-' } });
    expect(selectOcct.value).toBe('-');
  });
});
