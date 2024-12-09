import React, { useState, useEffect } from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import _ from 'lodash'
const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
}

export default function MultipleSelectCheckmarks ({
  id,
  label,
  options,
  value = [],
  onChange
}) {
  const [selectedValue, setSelectedValue] = useState(
    _.isArray(value) ? value : [value]
  )

  const handleChange = event => {
    const {
      target: { value }
    } = event
    setSelectedValue(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }

  useEffect(()=>{
    onChange(selectedValue)
  }, [selectedValue])

  return (
    <FormControl sx={{ width: '100%' }}>
      <InputLabel id={id + '-label' || 'multiple-checkbox-label'}>
        {label}
      </InputLabel>
      <Select
        labelId={id + '-label' || 'multiple-checkbox-label'}
        id={id || 'multiple-checkbox'}
        multiple
        value={selectedValue}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        renderValue={selected => {
          return options
            .filter(opt => selectedValue.includes(opt.value))
            .map(opt => opt.label)
            .join(', ')
        }}
        MenuProps={MenuProps}
      >
        {options.map(menu => (
          <MenuItem key={menu.value} value={menu.value}>
            <Checkbox checked={selectedValue.includes(menu.value)} />
            <ListItemText primary={menu.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
