import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResultSuccess from '../components/ola/ResultSuccess';
import ResultFail from '../components/ola/ResultFail';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

describe('Test Result Summary Success and Fail Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Testing Content Success', async () => {
    const mockState = {
      uuid: 'test-224-1111-test',
      appno: '231101000001',
      status: true,
      email: 'test@test.com',
      productSelect: {},
      product: []
    };
    useLocation.mockReturnValue({
      state: mockState,
    });

    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    const expectContent =
      'ธนาคารได้ตรวจสอบคุณสมบัติของท่านเบื้องต้นเรียบร้อยแล้ว';

    render(<ResultSuccess />);

    const contentElement = screen.getByTestId('success-text');

    expect(useLocation).toHaveBeenCalled();
    expect(useLocation().state).toEqual(mockState);

    expect(useNavigate).toHaveBeenCalled();
    expect(useNavigate()).toEqual(mockNavigate);

    expect(contentElement).toBeInTheDocument();
    expect(contentElement).toHaveTextContent(expectContent);
  });

  it('Testing Content Fail', async () => {
    const mockState = {
      uuid: 'test-224-1111-test',
      appno: '231101000001',
      status: true,
      email: 'test@test.com',
      productSelect: {},
      product: []
    };
    useLocation.mockReturnValue({
      state: mockState,
    });

    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    const expectContent =
      'ขออภัย ธนาคารออมสินไม่สามารถอนุมัติสินเชื่อให้ท่านได้ เนื่องจากไม่ผ่านเกณฑ์ของธนาคาร';

    render(<ResultFail />);

    const contentElement = screen.getByTestId('fail-text');

    expect(useLocation).toHaveBeenCalled();
    expect(useLocation().state).toEqual(mockState);

    expect(useNavigate).toHaveBeenCalled();
    expect(useNavigate()).toEqual(mockNavigate);

    expect(contentElement).toBeInTheDocument();
    expect(contentElement).toHaveTextContent(expectContent);
  });
});
