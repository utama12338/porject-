import axios from 'axios';
jest.mock('axios');
import api from '../services/api';
import '@testing-library/jest-dom/extend-expect'; // Import jest-dom for extended matchers

describe('Connect Backend API', () => {
  beforeEach(() => jest.clearAllMocks());

  it('get 200 Success from loan size API', async () => {
    const mockResponse = {
      data: {
        loanSize: [
          { sizeCode: 'M', sizeDesc: 'ไม่เกิน 200,000' },
          { sizeCode: 'L', sizeDesc: '200,000 ขึ้นไป' },
          { sizeCode: 'S', sizeDesc: 'ไม่เกิน 50,000' },
        ],
      },
    };
    await axios.get.mockImplementation(() => Promise.resolve(mockResponse));

    api.getLoanSize().then((response) => {
      expect(axios.get).toHaveBeenCalledTimes(1);
    });
  });

  it('get 200 Success from loan objective API', async () => {
    const mockResponse = {
      data: {
        loanObjective: [
          {
            loanObjectiveCode: 1,
            loanObjectiveDesc: 'ซื้อที่อยู่อาศัย',
          },
          {
            loanObjectiveCode: 2,
            loanObjectiveDesc: 'Re-Finance',
          },
          {
            loanObjectiveCode: 3,
            loanObjectiveDesc: 'เพื่ออุปโภคบริโภค',
          },
          {
            loanObjectiveCode: 4,
            loanObjectiveDesc: 'เพื่อชำระหนี้สินเชื่อรายย่อยประเภทอื่น',
          },
          {
            loanObjectiveCode: 5,
            loanObjectiveDesc: 'เพื่อเป็นเงินทุนหมุนเวียนในการดำเนินกิจการ',
          },
        ],
      },
    };

    axios.get.mockImplementation(() => Promise.resolve(mockResponse));

    api.getLoanObjective().then((response) => {
      expect(axios.get).toHaveBeenCalledTimes(1);
    });
  });

  it('get 200 Success from occupation API', async () => {
    const mockResponse = {
      data: {
        occupation: [
          {
            occupationCode: '0',
            occupationDesc: 'ว่างงาน',
          },
          {
            occupationCode: '1',
            occupationDesc: 'ข้าราชการและลูกจ้างในหน่วยงานของรัฐ',
          },
          {
            occupationCode: '2',
            occupationDesc: 'พนักงานและลูกจ้างในหน่วยงานรัฐวิสาหกิจ',
          },
          {
            occupationCode: '3',
            occupationDesc: 'พนักงานและลูกจ้างในบริษัท',
          },
          {
            occupationCode: '4',
            occupationDesc: 'พนักงานและลูกจ้างในสถาบันการเงิน',
          },
          {
            occupationCode: '5',
            occupationDesc: 'ผู้ประกอบธุรกิจ / เจ้าของกิจการ',
          },
          {
            occupationCode: '6',
            occupationDesc: 'ประกอบอาชีพอิสระ',
          },
          {
            occupationCode: '7',
            occupationDesc: 'ผู้รับจ้างทั่วไป / ผู้ใช้แรงงาน',
          },
          {
            occupationCode: '8',
            occupationDesc: 'เกษตรกร',
          },
          {
            occupationCode: '9',
            occupationDesc: 'ประกอบวิชาชีพเฉพาะ',
          },
        ],
      },
    };

    axios.get.mockImplementation(() => Promise.resolve(mockResponse));

    api.getOccupation().then((response) => {
      expect(axios.get).toHaveBeenCalledTimes(1);
    });
  });

  it('get 200 Success from appno API', async () => {
    const mockResponse = { data: { appNo: '231030000077' } };
    axios.get.mockImplementation(() => Promise.resolve(mockResponse));

    api.getAppNo().then((response) => {
      expect(axios.get).toHaveBeenCalledTimes(1);
    });
  });

  it('post 200 Success from hit coutner', async () => {
    const uuidTest = '989ujui-ddsds-11123';
    const appnoTest = '231026000001';
    const pageTest = 'TestPage';
    const mockResponse = 'Hit recorded at counterName : TestPage';
    axios.post.mockImplementation(() => Promise.resolve(mockResponse));

    api.postHitCounter(uuidTest, appnoTest, pageTest).then((response) => {
      expect(axios.post).toHaveBeenCalledTimes(1);
    });
  });

  it('post 200 Success from send email', async () => {
    const uuidTest = '989ujui-ddsds-11123';
    const emailTest = 'test@test.com';
    const mockResponse = 'send email succusee';
    axios.post.mockImplementation(() => Promise.resolve(mockResponse));

    api.postSendMail(uuidTest, emailTest).then((response) => {
      expect(axios.post).toHaveBeenCalledTimes(1);
    });
  });

  it('post 200 Success from loan suggestion', async () => {
    const appnoTest = '231026000001';
    const sizeCodeTest = 'S';
    const occtTest = 6;
    const incomeTest = 15000;
    const dobTest = '2506-10-20';
    const debtTest = 3000;
    const objTest = 1;
    const mockResponse = {
      data: {
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
          },
          {
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
              'H1_คุณสมบัติผู้กู้​|D1_สัญชาติไทย มีอายุครบ 20 ปีบริบูรณ์ขึ้นไป เมื่อรวมอายุของผู้กู้กับระยะเวลาที่ชำระเงินกู้ ต้องไม่เกิน 70 ปี|H1_หลักประกัน|D1_-',
          },
        ],
      },
    };
    axios.post.mockImplementation(() => Promise.resolve(mockResponse));

    api
      .postLoanSuggestion(appnoTest, sizeCodeTest, occtTest, incomeTest, dobTest, debtTest, objTest)
      .then((response) => {
        expect(axios.post).toHaveBeenCalledTimes(1);
      });
  });

  it('post 200 Success from save vote', async () => {
    const appnoTest = '231026000001';
    const scoretest = 5;
    const commentTest = 'testtest';
    const mockResponse = 'Vote success';
    axios.post.mockImplementation(() => Promise.resolve(mockResponse));

    api.postSaveScoreRate(appnoTest, scoretest, commentTest).then((response) => {
      expect(axios.post).toHaveBeenCalledTimes(1);
    });
  });

  it('post 200 Success from customer screening', async () => {
    const params = {
      appNo: '231026000001',
      idCard: '1111111111119',
      title: 'นางสาว',
      firstName: 'ทดสอบ',
      lastName: 'ทดสอบ',
      mymoPhone: '0933338888',
      productCode: 'Pay Later',
      email: 'test@test.com',
    };

    const mockResponse = {
      data: {
        checkStatus: 'N',
      },
    };

    axios.post.mockImplementation(() => Promise.resolve(mockResponse));

    api.postCustomerScreening(params).then((response) => {
      expect(axios.post).toHaveBeenCalledTimes(1);
    });
  });
});
