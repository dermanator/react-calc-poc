import { InputGroup, FormControl } from 'react-bootstrap';
import React from 'react';

//  Using memoized components here helps a ton with uneccessary re-renders
export const TotalField = React.memo(({
  name,
  value,
  dispatch,
  readOnly = false }) => (<InputGroup>
    <InputGroup.Text>$</InputGroup.Text>
    <FormControl 
      className="text-end" 
      value={value} 
      name={name} 
      onChange={e => dispatch({ type: "COST_UPDATE", name, value: e.target.value})} 
      readOnly={readOnly} />
  </InputGroup>));

export const InputField = React.memo(({
  itemId,
  name,
  value,
  dispatch,
  readOnly = false }) => (<FormControl
    name={name}
    value={value}
    onChange={e => dispatch({ type: "ITEM_UPDATE", itemId, name, value: e.target.value })}
    readOnly={readOnly} />)
);
