import React, { useState } from 'react';


export const AdditionalControlsDemo = () => {

  const colorOptions = [ 'red', 'green', 'blue', 'purple', 'orange' ];

  const [ selectedColors, setSelectedColors ] = useState(['red','blue']);
  const [ featured, setFeatured ] = useState(false);
  const [ customerType, setCustomerType ] = useState('consumer');

  const change = (e) => {

    if (e.target.tagName === 'SELECT' && e.target.multiple) {

      // console.dir(e.target.options instanceof Array);

      setSelectedColors(
        Array
          .from(e.target.options)
          .filter(option => option.selected)
          .map(option => option.value),
      );
      return;
    }

    if (e.target.type === 'checkbox') {
      setFeatured(e.target.checked);
      return;
    }

    setCustomerType(e.target.value);

  };

  return <form>

    <h2>Multiple Select List Box Example</h2>
    <div>
      <label htmlFor="colors-select">Select Colors:</label>
      <select id="colors-select" onChange={change} size={5}
        multiple value={selectedColors}>
        {colorOptions.map(colorOption =>
          <option key={colorOption}>{colorOption}</option>)}
      </select>
    </div>
    <div>
      Selected Colors: {selectedColors.join(', ')}
    </div>

    <h2>Check Box</h2>
    <div>
      <label htmlFor="featured-input">Featured?</label>
      <input type="checkbox" checked={featured} onChange={change} /> 
    </div>
    <div>
      Featured: {featured ? 'Yes' : 'No'}
    </div>

    <h2>Radio Buttons</h2>
    <fieldset>
      <legend>Customer Type</legend>
      <div>
        <input type="radio" id="consumer-input" name="customerType"
          value="consumer" onChange={change} checked={customerType === 'consumer'} />
        <label htmlFor="consumer-input">Consumer</label>
      </div>
      <div>
        <input type="radio" id="business-input" name="customerType"
          value="business" onChange={change} checked={customerType === 'business'} />
        <label htmlFor="business-input">Business</label>
      </div>
      <div>
        <input type="radio" id="other-input" name="customerType"
          value="other" onChange={change} checked={customerType === 'other'} />
        <label htmlFor="other-input">Other</label>
      </div>
    </fieldset>
    <div>
      Customer Type: {customerType}
    </div>

  </form>;

};

