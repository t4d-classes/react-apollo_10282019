import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { ColorForm } from './ColorForm';

export const ColorTool = ({ colors: initialColors, headerText }) => {

  const [ colors, setColors ] = useState(initialColors);

  const appendColor = (color) => {
    setColors(colors.concat(color));
  };

  return <>
    <header>
      <h1>{headerText}</h1>
    </header>
    <ul>
      {colors.map(
        (color, index) => <li key={index}>{color}</li>
      )}
    </ul>
    <ColorForm buttonText="Add Color" onSubmitColor={appendColor} />
  </>;

};

ColorTool.defaultProps = {
  headerText: 'Color Tool',
};

ColorTool.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
};
