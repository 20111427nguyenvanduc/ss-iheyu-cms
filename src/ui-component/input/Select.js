import React, {useState} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
  Autocomplete
} from '@mui/material';

import {changeAlias} from '../../components/helps'
//3rd
import _ from 'lodash';

const SelectAutocomplete = styled(Autocomplete)(({theme})=>({
  // '.MuiAutocomplete-groupLabel': {
  //   fontSize: '16px'
  // },
  '& .MuiSvgIcon-root': {
    // color: theme.palette.text.primary,
    // visibility: 'visible'
  },
  minWidth: '200px'
}))

const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 10px',
  // color: theme.palette.text.dark,
  backgroundColor: theme.palette.background.paper
}));

const GroupItems = styled('ul')({
  padding: 0,
});

export default function SelectOptions({options, size, label, value, onChange, ...others}) {
  const [inputValue, setInputValue] = useState('')

  return (
    <SelectAutocomplete
      size={size}
      disableClearable
      options={options.sort((a, b) => b.group ? -b.group.localeCompare(a.group) : 0)}
      filterOptions={(opts, state)=>{
        if (!state.inputValue || !_.isEmpty(opts.filter(opt=>opt.label === state.inputValue))) {
         return opts
        }
        const regex = new RegExp(changeAlias(state.inputValue), 'gi');
        return opts.filter(opt=> regex.test(changeAlias(opt.label)) || regex.test(changeAlias(opt.value)))
      }}
      groupBy={(option) => option.group}
      value={value}
      inputValue={inputValue}
      onInputChange={(event, newInputValue, reason) => {
        if (reason === 'input') {
         setInputValue(newInputValue);
        }
      }}
      onChange={(e, option)=>{
        if (option) {
          setInputValue(option.label);
          onChange(option.value)
        } else {
          setInputValue('');
        }
      }}
      isOptionEqualToValue={(option, optionSelected)=>{
        return typeof optionSelected === 'object' ? option.value === optionSelected.value : option.value === optionSelected
      }}
      renderGroup={(params) => (
        <li key={params.key}>
          {params.group?<GroupHeader>{params.group}</GroupHeader>: null}
          <GroupItems>{params.children}</GroupItems>
        </li>
      )}
      renderOption={(props, option, { selected }) => (
        <li {...props} key={option.value}>
          {option.label}
        </li>
      )}
      renderInput={(params) => <TextField {...params} label={label}/>}
      {...others}
    />
  );
}