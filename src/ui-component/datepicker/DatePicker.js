import * as React from 'react';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment'

export default function ResponsiveDatePickers({title, value = moment(), inputProps, ...props}) {
  return (
    <DatePicker
    label={title}
    // openTo="day"
    // views={['year', 'month', 'day']}
    value={value}
    renderInput={(params) => <TextField {...params} {...inputProps} sx={{width: '100%'}}/>}
    {...props}
  />
  );
}
