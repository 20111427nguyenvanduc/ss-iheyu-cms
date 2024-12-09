import * as React from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function RadioButtonsGroup ({ value, onChange, options, label }) {
  const handleChange = event => {
    onChange(event.target.value)
  }

  return (
    <Box display='flex' flexDirection='column'>
      <Typography>{label}</Typography>
      <Box display='flex' gap={2} justifyContent='space-evenly'>
      {options.map(opt => (
        <FormControlLabel
          key={opt.value}
          value={opt.value}
          control={
            <Radio
              checked={value === opt.value}
              onChange={handleChange}
              value={opt.value}
              inputProps={{ 'aria-label': opt.value }}
            />
          }
          label={opt.title}
        />
      ))}
      </Box>
    </Box>
  )
}
