import '@testing-library/jest-dom/extend-expect'; // Import jest-dom for extended matchers
import Validator from '../components/ola-custom/Validator';

describe('Test Validator Component', () => {
    
    it('Testing Validate Number', async () => {
        expect(Validator.validNumber('4500')).toBe(false);
        expect(Validator.validNumber('test')).toBe(true);
    });

    it('Testing Validate Thai Identity Card', async () => {
        expect(Validator.validIdCard('1111111111119')).toBe(false);
        expect(Validator.validIdCard('001111111111119')).toBe(true);
    });

    it('Testing Validate Thai Charactor', async () => {
        expect(Validator.validCharator('ทดสอบ ระบบ')).toBe(false);
        expect(Validator.validCharator('test system')).toBe(true);
    });

    it('Testing Validate Thai Mobile No', async () => {
        expect(Validator.validMobileNo('0812008765')).toBe(false);
        expect(Validator.validMobileNo('888111')).toBe(true);
    });

    it('Testing Validate Email', async () => {
        expect(Validator.validEmail('testS@gsb.or.th')).toBe(false);
        expect(Validator.validEmail('test@')).toBe(true);
    });

});