import { InputGroup, FormControl } from 'react-bootstrap';
import { useMemo } from 'react';

//  Using memoized components here helps a ton with uneccessary re-renders
export const TotalField = ({
  name,
  value,
  onChange,
  readOnly = false }) => useMemo(() => (<InputGroup>
    <InputGroup.Text>$</InputGroup.Text>
    <FormControl className="text-end" value={value} name={name} onChange={onChange} readOnly={readOnly} />
  </InputGroup>), [value, name, onChange, readOnly]);

export const InputField = ({
  name,
  value,
  onChange,
  readOnly = false }) => {
    console.log({name, value, onChange, readOnly})
    return useMemo(() => (<FormControl name={name} value={value} onChange={onChange} readOnly={readOnly} />),
      [name, onChange, value, readOnly]);
  };
