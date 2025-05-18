import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function MyButtons(props) {
     const {label,type} = props
  return (
    
      <Button type={type} variant="contained" className={'myButton'}>{label}</Button>
  
  );
}
