import React, { useState } from 'react';

import { UnorderedList } from './UnorderedList';

const flightStatus = (delay) => {

  if (delay > 15) {
    return 'Late';
  }
  
  if (delay < 15) {
    return 'Early';
  }

  return 'On Time';
};

export const FlightsChart = ({ flights, pageLength, onLoadMore }) => {

  const [ currentPage, setCurrentPage ] = useState(0);

  const goPrevPage = () => {
    setCurrentPage(Math.max(currentPage - 1, 0));
  };

  const goNextPage = () => {

    const nextPage = currentPage + 1;

    if ((flights.length - 1) < nextPage * pageLength) {
      onLoadMore(nextPage).then(() =>  {
        console.log('got more');
        setCurrentPage(nextPage)
      });
    } else {
      setCurrentPage(nextPage);
    }
    
  };  

  const startIndex = pageLength * currentPage;
  const endIndex = startIndex + pageLength;

  return <>
    <UnorderedList items={flights.slice(startIndex, endIndex)}>
      {(flight) => flight.origin + ' -> ' + flight.destination + ', status: ' + flightStatus(flight.delayed)}
    </UnorderedList>
    <button type="button" onClick={goPrevPage}>Prev</button>
    <button type="button" onClick={goNextPage}>Next</button>
  </>  


};