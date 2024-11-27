import '@testing-library/jest-dom/extend-expect'; // Import jest-dom for extended matchers
import Helper from '../components/ola-custom/Helper';

describe('Test Helper Component', () => {
    it('Testing Split Pipe', async () => {
        const mockData = ["Test1","Test2","Test3"];
        expect(Helper.splitPipe("Test1|Test2|Test3")).toEqual(mockData);
       
    });

    it('Testing Get Tiltle List', async () => {
        const mockData = [
            {
              value: '0',
              label: 'เลือกคำนำหน้าชื่อ',
            },
            {
              value: '1',
              label: 'นาย',
            },
            {
              value: '2',
              label: 'นาง',
            },
            {
              value: '3',
              label: 'นางสาว',
            },
          ];
        expect(Helper.getTilteList()).toEqual(mockData);
       
    });

    it('Testing toBuddhistAdapter', async () => {
        const mockData = "2566-10-31";
        expect(Helper.toBuddhistAdapter("2023-10-31")).toEqual(mockData);
    });

    it('Testing fromBuddhistAdapter' , async () => {
        const mockData = "2566-10-31T00:00:00+07:00";
        expect(Helper.fromBuddhistAdapter("2566-10-31")).toBe(mockData);
    });

});
