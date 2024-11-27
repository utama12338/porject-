/* eslint-disable react/display-name */
import React, { useState } from 'react';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import { Box, Button, TextField, FormControl, NativeSelect } from '@mui/material';
import FeatherIcon from 'feather-icons-react';

import 'react-datepicker/dist/react-datepicker.css';
import '../../assets/css/globals.css';

import dayjs from 'dayjs';
import th from 'date-fns/locale/th';
import 'dayjs/locale/th';
dayjs.locale('th');

registerLocale('th', th);
setDefaultLocale('th');

const months = [
  'มกราคม',
  'กุมภาพันธ์',
  'มีนาคม',
  'เมษายน',
  'พฤษภาคม',
  'มิถุนายน',
  'กรกฎาคม',
  'สิงหาคม',
  'กันยายน',
  'ตุลาคม',
  'พฤศจิกายน',
  'ธันวาคม',
];

const CustomInput = ({
  value,
  onClick,
  placeholderName,
  displayFormat,
  disabled,
  readOnly,
  style,
}) => {
  let thaiDate = '';
  if (value !== '') {
    const date = dayjs(value);
    const thaiYear = date.year() + 543;
    const wrappedDisplayFormat = displayFormat
      ? displayFormat.replace(/YYYY/, thaiYear).replace(/YY/, thaiYear % 100)
      : null;
    thaiDate =
      (wrappedDisplayFormat && `${date.format(wrappedDisplayFormat)}`) ||
      `${thaiYear}${date.format('-MM-DD')}`;
  }
  return (
    <TextField
      value={thaiDate}
      onClick={onClick}
      placeholder={placeholderName}
      style={style}
      disabled={disabled}
      readOnly={readOnly}
      onChange={(value) => {}}
      variant="outlined"
      fullWidth
      size="small"
      color="success"
    />
  );
};

const CustomInputWrapper = React.forwardRef((props, ref) => (
  <div ref={ref}>
    <CustomInput {...props} />
  </div>
));

export const range = (startVal = 0, endVal = 0, increment = 0) => {
  let list = [];
  if (increment <= 0) {
    return list;
  }
  for (let index = startVal; index <= endVal; index = index + increment) {
    list = [...list, index];
  }
  return list;
};

export const OlaDatePicker = (props) => {
  const [value, setValue] = useState(props.value ? props.value : null);
  const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : null);

  const yearBoundary = props.yearBoundary ?? 99;
  const thisYear = dayjs().year();
  const minYear = props.minDate ? dayjs(props.minDate).year() : thisYear - yearBoundary;
  const maxYear = props.maxDate ? dayjs(props.maxDate).year() : thisYear + yearBoundary;
  const years = range(minYear, maxYear, 1);
  const highlightWithRanges = [
    {
      'react-datepicker__day--highlighted-today': [new Date()],
    },
  ];
  return (
    <DatePicker
      locale="th"
      withPortal
      peekNextMonth
      showMonthDropdown
      showYearDropdown
      scrollableYearDropdown
      todayButton="วันนี้"
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <Box
          sx={{
            margin: 2,
            justifyContent: 'space-between',
          }}
          display="flex"
        >
          <Button color={'secondary'} onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
            <FeatherIcon icon="arrow-left" />
          </Button>
          <FormControl sx={{ m: 1 }} variant="filled">
            <NativeSelect
              color="secondary"
              size="small"
              value={months[dayjs(date).month()]}
              onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
            >
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
          <FormControl sx={{ m: 1 }} variant="standard">
            <NativeSelect
              color="secondary"
              size="small"
              value={dayjs(date).year()}
              onChange={({ target: { value } }) => changeYear(value)}
            >
              {years.map((option) => (
                <option key={option} value={option}>
                  {option + 543}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
          <Button color={'secondary'} onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
            <FeatherIcon icon="arrow-right" />
          </Button>
        </Box>
      )}
      minDate={props.minDate ? new Date(props.minDate) : null}
      maxDate={props.maxDate ? new Date(props.maxDate) : null}
      dateFormat={props.dateFormat ? props.dateFormat : 'yyyy-MM-dd'}
      selected={selectedDate}
      isClearable={!(props.disabled || props.readOnly) && (props.clearable ?? true)}
      disabled={props.disabled}
      readOnly={props.readOnly}
      onChange={(date) => {
        setSelectedDate(date);
        const dayjsObj = dayjs(date).isValid() ? dayjs(date) : null;
        setValue(dayjsObj ? dayjsObj.format('YYYY-MM-DD') : '');
        const thaiDate = dayjsObj ? `${dayjsObj.year() + 543}${dayjsObj.format('-MM-DD')}` : '';
        props.onChange(dayjsObj ? dayjsObj.format('YYYY-MM-DD') : '', thaiDate);
      }}
      highlightDates={highlightWithRanges}
      customInput={
        <CustomInputWrapper
          placeholderName={props.placeholder}
          displayFormat={props.displayFormat}
          style={props.inputStyle}
        />
      }
      {...props.reactDatePickerProps}
    />
  );
};
