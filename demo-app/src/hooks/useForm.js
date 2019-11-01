import { useState } from 'react';

export const useForm = (initialState) => {

  const [ form, setForm ] = useState(initialState);

  const change = ({ target: { type, name, value }}) => {
    setForm({
      ...form,
      [ name ]: type === 'number'
        ? (value.length === 0 ? '' : Number(value))
        : value,
    });
  };

  const resetForm = () => {
    setForm(initialState);
  };

  const setIfBlank = defaultValue => ({ target: { type, name, value }}) => {
    if (value.length > 0) {
      return;
    }

    setForm({
      ...form,
      [ name ]: type === 'number'
        ? Number(defaultValue)
        : defaultValue,
    });
  };



  return [ form, change, resetForm, setIfBlank ];

};