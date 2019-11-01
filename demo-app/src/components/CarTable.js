import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { CarViewRow } from './CarViewRow';
import { CarEditRow } from './CarEditRow';

import { carsPropType } from '../propTypes/carsPropTypes';

export const CarTable = forwardRef( ({
  cars, editCarId,
  onEditCar: editCar,
  onDeleteCar: deleteCar,
  onSaveCar: saveCar,
  onCancelCar: cancelCar,
  CarEditFormRow,
}, ref) => {

  return <table>
    <thead>
      <tr>
        <th>Id</th>
        <th>Make</th>
        <th>Model</th>
        <th>Year</th>
        <th>Color</th>
        <th>Price</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {cars.map(car =>
        editCarId === car.id
          ? <CarEditFormRow key={car.id} car={car} ref={ref}
              onSaveCar={saveCar} onCancelCar={cancelCar} />
          : <CarViewRow key={car.id} car={car}
              onEditCar={editCar} onDeleteCar={deleteCar} />)}
    </tbody>
  </table>;

});

CarTable.defaultProps = {
  cars: [],
  editCarId: -1,
  CarEditFormRow: CarEditRow,
};

CarTable.propTypes = {
  cars: carsPropType,
  editCarId: PropTypes.number,
  onEditCar: PropTypes.func.isRequired,
  onDeleteCar: PropTypes.func.isRequired,
  onSaveCar: PropTypes.func.isRequired,
  onCancelCar: PropTypes.func.isRequired,
};
