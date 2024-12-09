import * as React from 'react';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import moment from 'moment'

export default function ResponsiveDatePickers({title, value = moment(), inputProps, ...props}) {
  return (
    <DateTimePicker
    label={title}
    // openTo="day"
    // views={['year', 'month', 'day']}
    value={value}
    renderInput={(params) => <TextField {...params} {...inputProps} sx={{width: '100%'}}/>}
    {...props}
  />
  );
}
