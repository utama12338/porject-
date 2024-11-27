import React from 'react';
import {useLocation, useNavigate } from 'react-router-dom';
import RatingForm from '../components/ola-custom/RatingForm';
import api from '../services/api';
import { render, screen, act, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));
describe('Test RatingForm Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockState = {
    uuid: 'test-224-1111-test',
    appno: '231101000001',
    status: true,
    email: 'test@test.com',
    productSelect: {},
  };
  const mockNavigate = jest.fn();

  const mockSetState = jest.fn();

  // Create a new spy on useLocation
  useLocation.mockReturnValue({
    state: mockState,
  });
  // Provide the mockNavigate function as the implementation of useNavigate
  useNavigate.mockReturnValue(mockNavigate);
  // Create a new spy on useState
  jest.spyOn(React, 'useState').mockImplementationOnce((initState) => [initState, mockSetState]);

  it('Testing useState useLocation and useNavigate', async () => {
    render(<RatingForm />);

    expect(useLocation).toHaveBeenCalled();
    expect(useLocation().state).toEqual(mockState);

    expect(useNavigate).toHaveBeenCalled();
    expect(useNavigate()).toEqual(mockNavigate);
  });

  it('Testing Confirm Rating Button Clicked', async () => {
    render(<RatingForm />);

    const button = await screen.findByRole('button', { name: 'ยืนยัน' });
    act(() => fireEvent.click(button));

    const postSaveSpy = jest.spyOn(api, 'postSaveScoreRate').mockReturnValue();
    api.postSaveScoreRate('231101000001', 5, 'test');

    const postSendMailSpy = jest.spyOn(api, 'postSendMail').mockReturnValue();
    api.postSendMail('231101000001', 'test@test.com');

    expect(postSaveSpy).toHaveBeenCalled();
    expect(postSendMailSpy).toHaveBeenCalled();
  });

  it('Testing Comment TextField input data', async () => {
    render(<RatingForm />);
    const input = await screen.findByPlaceholderText("ข้อเสนอแนะเพิ่มเติม");
    await userEvent.type(input, "ทดสอบ");
    expect(input).toHaveValue("ทดสอบ");
  });

});
