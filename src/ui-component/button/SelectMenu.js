import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

export default function BasicSelect ({
  id = 'select_id',
  label,
  value,
  onChange,
  options
}) {
  const handleChange = event => {
    onChange(event.target.value)
  }

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth size='small'>
        <InputLabel id={id + '-label'}>{label}</InputLabel>
        <Select
          labelId={id + '-label'}
          id={id}
          label={label}
          value={value}
          onChange={handleChange}
        >
          {options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
