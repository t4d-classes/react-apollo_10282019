import React, { useState, useCallback, useEffect, useRef }from 'react';
import PropTypes from 'prop-types';

import { ToolHeader } from './ToolHeader';
import { CarTable } from './CarTable';
import { CarForm } from './CarForm';
// import { AltCarEditRow } from './AltCarEditRow';

import { carsPropType } from '../propTypes/carsPropTypes';

export const CarTool = ({ cars: initialCars, headerText }) => {

  const [ cars, setCars ] = useState(initialCars.concat());
  const [ editCarId, setEditCarId ] = useState(-1);
  const defaultFormControl = useRef();
  const defaultEditFormControl = useRef();

  // useEffect(() => {

  //   if (defaultFormControl.current) {
  //     defaultFormControl.current.focus();
  //   }

  // }, []);  

  useEffect(() => {

    const currentEditCarId = editCarId;

    if (currentEditCarId > 0) {
      if (defaultEditFormControl.current) {
        defaultEditFormControl.current.focus();
      }
    } else {
      if (defaultFormControl.current) {
        defaultFormControl.current.focus();
      }
    }

    console.log('editCarId effect start', currentEditCarId);

    return () => {
      console.log('editCarId effect end', currentEditCarId);
    };


  }, [editCarId]);  


  const appendCar = useCallback(car => {
    setCars(cars.concat({
      ...car,
      id: Math.max(...cars.map(c => c.id), 0) + 1,
    }));
    setEditCarId(-1);
  }, [ cars ]);

  const deleteCar = carId => {
    setCars(cars.filter(c => c.id !== carId));
    setEditCarId(-1);
  };

  const saveCar = car => {

    const carIndex = cars.findIndex(c => c.id === car.id);
    const newCars = cars.concat(); // make a copy
    newCars[carIndex] = car;
    setCars(newCars);
    setEditCarId(-1);

    // setCars(cars.map(c => c.id === car.id ? car : c));
  };

  const cancelCar = () => setEditCarId(-1);

  return <>
    <ToolHeader headerText={headerText} />
    <CarTable cars={cars} editCarId={editCarId}
      onEditCar={setEditCarId} onDeleteCar={deleteCar}
      onSaveCar={saveCar} onCancelCar={cancelCar}
      ref={defaultEditFormControl}
       />
    <CarForm onSubmitCar={appendCar}
      buttonText="Add Car"
      ref={defaultFormControl} />
  </>;

};

CarTool.propTypes = {
  headerText: PropTypes.string,
  cars: carsPropType,
};
