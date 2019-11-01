import React from 'react';

export const UnorderedList = ({ items, children: raghu }) => {

  return <ul>
    {items.map((item, index) => <li key={index}>{raghu(item)}</li>)}
  </ul>;

};
