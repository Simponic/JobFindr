import { useState } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

export const BasicDateTimePicker = ({label, onTimeChange}) => {
  const [value, setValue] = useState(new Date());

  const changeTime = (e) => {
    onTimeChange(e);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        value={value}
        label={label}
        onChange={(newValue) => {
          setValue(newValue);
          changeTime(newValue);
        }}
      />
    </LocalizationProvider>
  );
}