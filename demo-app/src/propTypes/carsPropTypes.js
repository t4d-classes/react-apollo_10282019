import PropTypes from 'prop-types';

export const carPropType = PropTypes.shape({
  id: PropTypes.number,
  make: PropTypes.string,
  model: PropTypes.string,
  year: PropTypes.number,
  color: PropTypes.string,
  price: PropTypes.number,
});

export const carsPropType = PropTypes.arrayOf(carPropType);