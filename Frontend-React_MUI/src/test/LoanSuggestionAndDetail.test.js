import React from 'react';
import { useLocation } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoanDetail from '../components/ola/LoanDetail';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));
 
describe('Test Loan Suggestion and Loandetail Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Testing useState useLocation and useNavigate in LoanDetail', async () => {
    const mockState = {
      product: [
        {
          productCode: 'MKTCD:1239',
          productNameTh: 'สินเชื่อโครงการธนาคารประชาชนสำหรับผู้มีบัตรสวัสดิการแห่งรัฐ',
          product_name_en: 'Welfare Th Loan',
          maxTerm: '5',
          maxAmount: 50000.0,
          interestRate: 0.75,
          priority: 1,
          documentDesc: '1',
          productDetail1: 'H1_เพื่อการลงทุนประกอบอาชีพ|H1_ดอกเบี้ยต่ำ|H1_ใช้ บยส. ค้ำประกัน',
          productDetail2:
            'H1_วงเงินกู้|D1_50,000 บาท|H1_ระยะเวลาชำระคืนเงินกู้|D1_ตั้งแต่ 3 ปี สูงสุด 5 ปี',
          productDetail3:
            'H1_อัตราดอกเบี้ยเงินกู้|D1_อัตราดอกเบี้ยคงที่ ร้อยละ 0.75 ต่อเดือน|H1_ค่าธรรมเนียม|D1_ไม่เสียค่าธรรมเนียมในการใช้บริการสินเชื่อ',
          productDetail4:
            'H1_คุณสมบัติผู้กู้|D1_เป็นผู้ที่ได้รับสิทธิ์สวัสดิการแห่งรัฐ​|D1_สัญชาติไทย มีอายุครบ 20 ปีบริบูรณ์ขึ้นไป เมื่อรวมอายุของผู้กู้กับระยะเวลาที่ชำระเงินกู้ ต้องไม่เกิน 70 ปี|D1_มีการประกอบอาชีพ|D1_มีถิ่นที่อยู่แน่นอน สามารถติดต่อได้|H1_หลักประกัน|D1_ใช้บรรษัทประกันสินเชื่ออุตสาหกรรมขนาดย่อม (บสย.) เป็นหลักประกันเงินกู้',
        }
      ],
      productSelect: {
        productCode: 'Pay Later',
        productNameTh: 'สินเชื่อใช้ก่อน จ่ายทีหลัง',
        product_name_en: 'GSB Pay Later',
        maxTerm: '10',
        maxAmount: 20000.0,
        interestRate: 1.0,
        priority: 1,
        documentDesc: '2',
        productDetail1: 'H1_ใช้ก่อน จ่ายทีหลัง',
        productDetail2: 'H1_วงเงินกู้|D1_20,000 บาท',
        productDetail3:
          'H1_อัตราดอกเบี้ยเงินกู้|D1_-|H1_ค่าธรรมเนียม|D1_ไม่เสียค่าธรรมเนียมในการใช้บริการสินเชื่อ',
        productDetail4:
          'H1_คุณสมบัติผู้กู้|D1_สัญชาติไทย มีอายุครบ 20 ปีบริบูรณ์ขึ้นไป เมื่อรวมอายุของผู้กู้กับระยะเวลาที่ชำระเงินกู้ ต้องไม่เกิน 70 ปี|H1_หลักประกัน|D1_-',
      },
      uuid: 'test-224-1111-test',
      appno: '231101000001',
      sizeDesc: 'ไม่เกิน 20,000 บาท',
    };
    useLocation.mockReturnValue({
      state: mockState,
    });

    render(<LoanDetail />);

    expect(useLocation).toHaveBeenCalled();
    expect(useLocation().state).toEqual(mockState);
  });

  it('Testing Content in LoanDetail', async() => {
    const expectTextLoanDetail = 'รายละเอียดการสมัครสินเชื่อ';
    const expectTextLoanInterate = 'อัตราดอกเบี้ยและค่าธรรมเนียม';
    const expectTextLoanProperty = 'คุณสมบัติของผู้สมัครสินเชื่อ';

    render(<LoanDetail />);
    
    const elementLoanDetail = screen.getByTestId('text-loan-details');
    const elementLoanInterate = screen.getByTestId('text-loan-interate');
    const elementLoanProperty = screen.getByTestId('text-loan-property');

    expect(elementLoanDetail).toHaveTextContent(expectTextLoanDetail);
    expect(elementLoanInterate).toHaveTextContent(expectTextLoanInterate);
    expect(elementLoanProperty).toHaveTextContent(expectTextLoanProperty);
  });
});
