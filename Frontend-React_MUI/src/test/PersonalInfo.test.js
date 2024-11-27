import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { render, screen, act, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PersonalInfo from '../components/ola/PersonalInfo';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

describe('Test PersonalInfo Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Testing useState useLocation and useNavigate', async () => {
    const mockState = {
        uuid: 'test-224-1111-test',
        appno: '231101000001',
        sizeDesc: 'ไม่เกิน 20,000 บาท',
        productSelect: {
            
        }
      };
      const mockNavigate = jest.fn();
  
      useLocation.mockReturnValue({
        state: mockState,
      });
      useNavigate.mockReturnValue(mockNavigate);
  
      render(<PersonalInfo />);
  
      expect(useLocation).toHaveBeenCalled();
      expect(useLocation().state).toEqual(mockState);
  
      expect(useNavigate).toHaveBeenCalled();
      expect(useNavigate()).toEqual(mockNavigate);
  });


  it('Testing Input TextField and Onchange', async () => {
    render(<PersonalInfo />);

    const inputIdcard = await screen.findByTestId("idcard-test")
    fireEvent.change(inputIdcard, { target: { value: '1111111111119' } });
    expect(inputIdcard.value).toBe('1111111111119');
    expect(inputIdcard.value).not.toBe('');

    const inputFirstName = await screen.findByTestId("firstName-test");
    fireEvent.change(inputFirstName, { target: { value: 'ทดสอบ' } });
    expect(inputFirstName.value).toBe("ทดสอบ");
    expect(inputFirstName.value).not.toBe('');

    const inputLastName = await screen.findByTestId("lastName-test");
    fireEvent.change(inputLastName, { target: { value: 'ทดสอบอีก' } });
    expect(inputLastName.value).toBe("ทดสอบอีก");
    expect(inputLastName.value).not.toBe('');

    const inputTelno = await screen.findByTestId("telno-test");
    fireEvent.change(inputTelno, { target: { value: '0831112222' } });
    expect(inputTelno.value).toBe("0831112222");
    expect(inputTelno.value).not.toBe('');

    const inputEmail = await screen.findByTestId("email-test");
    fireEvent.change(inputEmail, { target: { value: 'test@test.com' } });
    expect(inputEmail.value).toBe("test@test.com");
    expect(inputEmail.value).not.toBe('');

    const selectTitle = await screen.findByTestId("title-test");
    fireEvent.change(selectTitle, { target: { value: '1' } });
    expect(selectTitle.value).toBe("1");
    fireEvent.change(selectTitle, { target: { value: '0' } });
    expect(selectTitle.value).toBe("0");

  });

  it('Testing Reset OnClick Button', async () => {
    render(<PersonalInfo />);
    const buttonReset = await screen.findByRole('button', { name: 'ล้างข้อมูล' });
    act(() => fireEvent.click(buttonReset));

    const inputIdcard = await screen.findByTestId("idcard-test")
    expect(inputIdcard.value).toBe('');

    const inputFirstName = await screen.findByTestId("firstName-test");
    expect(inputFirstName.value).toBe('');

    const inputLastName = await screen.findByTestId("lastName-test");
    expect(inputLastName.value).toBe('');

    const inputTelno = await screen.findByTestId("telno-test");
    expect(inputTelno.value).toBe('');

    const inputEmail = await screen.findByTestId("email-test");
    expect(inputEmail.value).toBe('');

  });
});
