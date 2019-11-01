import React, { useState } from 'react';

export const ColorForm = ({ buttonText, onSubmitColor }) => {

  const [ color, setColor ] = useState('');

  const submitColor = () => {
    onSubmitColor(color);
  };

  return <form>
    <div>
      <label htmlFor="color-input">Color:</label>
      <input type="text" id="color-input"
        value={color} onChange={e => setColor(e.target.value)}  />
    </div>
    <button type="button" onClick={submitColor}>{buttonText}</button>
  </form>

};

ColorForm.defaultProps = {
  buttonText: 'Submit Color',
};
