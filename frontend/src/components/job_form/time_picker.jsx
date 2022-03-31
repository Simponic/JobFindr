import { useState } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

export const BasicDateTimePicker = ({label, onTimeChange, initialValue}) => {

  const [value, setValue] = useState(initialValue);  

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        value={value}
        label={label}
        onChange={(newValue) => {
          setValue(newValue);
          onTimeChange(newValue);
        }}
      />
    </LocalizationProvider>
  );
}