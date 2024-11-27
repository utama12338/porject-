import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { render, screen, act, fireEvent, waitFor  } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Complete from '../components/ola/Completed';
import userEvent from "@testing-library/user-event";

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

const mockState = {
  uuid: 'test-224-1111-test',
  appno: '231101000001',
};
const mockNavigate = jest.fn();

// Create a new spy on useLocation
useLocation.mockReturnValue({
  state: mockState,
});
// Provide the mockNavigate function as the implementation of useNavigate
useNavigate.mockReturnValue(mockNavigate);

describe('Test Complete Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Testing useState useLocation and useNavigate', async () => {
    render(<Complete />);

    expect(useLocation).toHaveBeenCalled();
    expect(useLocation().state).toEqual(mockState);

    expect(useNavigate).toHaveBeenCalled();
    expect(useNavigate()).toEqual(mockNavigate);
  });


  it('Testing Back to Home Page when Button Clicked', async () => {
    render(<Complete />);

    const button = await screen.findByRole('button', { name: 'กลับไปหน้าหลัก' });
    act(() => fireEvent.click(button));

    expect(window.location.pathname).toBe('/');

  });

  it('Reader Content Complete Component', async () => {
    const expectedContent1 = 'ความคิดเห็นของท่าน คือสิ่งสำคัญต่อการปรับปรุงบริการของเรา';
    const expectedContent2 = 'ธนาคารออมสินขอขอบพระคุณท่าน ที่เสียสละเวลาอันมีค่า ประเมินความพึงพอใจในการให้บริการ';
    const expectedContent3 = 'OLA - ระบบแนะนำผลิตภัณฑ์สินเชื่อธนาคารออมสิน';
    const expectedContent4 = 'เพื่อธนาคารจัก ได้นำไปปรับปรุงบริการให้ดียิ่งขึ้นต่อไป';
    const expectedContent5 = 'เพราะทุกความเห็นของท่านมีความหมาย';
    const expectedContent6 = 'OLA Online Lending Advisor by GSB';
    
    render(<Complete />);

    const contentElement1 = screen.getByTestId('text-1');
    const contentElement2 = screen.getByTestId('text-2');
    const contentElement3 = screen.getByTestId('text-3');
    const contentElement4 = screen.getByTestId('text-4');
    const contentElement5 = screen.getByTestId('text-5');
    const contentElement6 = screen.getByTestId('text-6');

    expect(contentElement1).toHaveTextContent(expectedContent1);
    expect(contentElement2).toHaveTextContent(expectedContent2);
    expect(contentElement3).toHaveTextContent(expectedContent3);
    expect(contentElement4).toHaveTextContent(expectedContent4);
    expect(contentElement5).toHaveTextContent(expectedContent5);
    expect(contentElement6).toHaveTextContent(expectedContent6);

  });

});
