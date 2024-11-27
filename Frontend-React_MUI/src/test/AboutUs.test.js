import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AboutUs from '../components/ola/AboutUs';
import ContactUs from '../components/ola/ContactUs';
import SystemInformation from '../components/ola/SystemInformation';

global.react = React; // this also works for other globally available libraries
describe('Test AboutUs ContactUs and SystemInformation Component', () => {
  it('Reader About Us', async () => {
    const expectedSystemName = 'OLA Online Lending Advisor by GSB';
    const expectedStep1 = '1.เลือกวงเงินที่ต้องการขอสินเชื่อ แล้วคลิกปุ่ม "สนใจ"';

    render(<AboutUs />);

    const contentElementSystemName = screen.getByTestId('text-system-name');
    const contentElementStep1 = screen.getByTestId('text-step-1');

    expect(contentElementSystemName).toBeInTheDocument();
    expect(contentElementSystemName).toHaveTextContent(expectedSystemName);

    expect(contentElementStep1).toBeInTheDocument();
    expect(contentElementStep1).toHaveTextContent(expectedStep1);
  });

  it('Reader ContactUs Us', async () => {
    const expectedGsbname = 'ธนาคารออมสินสำนักงานใหญ่';
    const expectedBranch = 'สาขา / จุดให้บริการ';

    render(<ContactUs />);

    const contentElementGsbname = screen.getByTestId('text-gsb-name');
    const contentElementBranch = screen.getByTestId('text-branch-name');

    expect(contentElementGsbname).toBeInTheDocument();
    expect(contentElementGsbname).toHaveTextContent(expectedGsbname);

    expect(contentElementBranch).toBeInTheDocument();
    expect(contentElementBranch).toHaveTextContent(expectedBranch);
  });

  it('Reader SystemInformation Us', async () => {
    const expect1 = 'หมายเหตุ';

    render(<SystemInformation />);

    const content1 = screen.getByTestId('text-test-1');

    expect(content1).toBeInTheDocument();
    expect(content1).toHaveTextContent(expect1);
  });
});
