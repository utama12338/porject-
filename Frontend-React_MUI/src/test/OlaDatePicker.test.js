import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent  } from '@testing-library/react';
import {OlaDatePicker, range} from '../components/ola-custom/OlaDatePicker';
import dayjs from 'dayjs';
describe('Test OlaDatePicker Component', () => {
    const maxDob = dayjs("2023-11-02").subtract(20, 'year').format('YYYY-MM-DD');
    const minDate = dayjs("1890-12-31").format('YYYY-MM-DD');
    const value = dayjs("1996-04-01").format('YYYY-MM-DD');

  it('Testing Render OlaDatePicker Element', async () => {
    const { container, getByText  } = render(
    
      <OlaDatePicker
        value={value}
        placeholder={'วันเดือนปีเกิด'}
        dateFormat={'yyyy-MM-dd'}
        displayFormat={'DD MMMM YYYY'}
        clearable={true}
        maxDate={maxDob}
        minDate={minDate}
        disabled={false}
        readOnly={false}
        yearBoundary={99}
      />
    );
    expect(container.querySelector('div.react-datepicker__input-container')).toBeInTheDocument();
    expect(container.querySelector('input.MuiInputBase-input')).toBeInTheDocument();
    expect(container.querySelector('button.react-datepicker__close-icon')).toBeInTheDocument();
  });

  it('Testing Rang Month Have Data',  async () =>{
    const mockData = [2021,2022,2023];
    expect(range(2021,2023,1)).toEqual(mockData);
  });

  it('Testing Rang Month Have Null',  async () =>{
    const mockData = [];
    expect(range(2021,2023,0)).toEqual(mockData);
  });



});
