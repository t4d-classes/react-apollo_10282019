import React from 'react';


export class AltCarEditRow extends React.Component {

  state = {
    make: this.props.car.make,
    model: this.props.car.model,
    year: this.props.car.year,
    color: this.props.car.color,
    price: this.props.car.price,
  };

  change = ({ target: { type, name, value }}) => {
    this.setState({
      [ name ]: type === 'number' ? Number(value) : value,
    });
  };

  saveCar = () => {
    this.props.onSaveCar({
      ...this.state,
      id: this.props.car.id,
    });
  };

  render() {

    const { make, model, year, color, price } = this.state;

    return (
      <tr>
        <td colSpan="7">
          <form>
            <div>
              <label htmlFor="make-input">Make:</label>
              <input type="text" id="make-input" name="make"
                value={make} onChange={this.change} />
            </div>
            <div>
              <label htmlFor="model-input">Model:</label>
              <input type="text" id="model-input" name="model"
                value={model} onChange={this.change} />
            </div>
            <div>
              <label htmlFor="year-input">Year:</label>
              <input type="number" id="year-input" name="year"
                value={year} onChange={this.change} />
            </div>
            <div>
              <label htmlFor="color-input">Color:</label>
              <input type="text" id="color-input" name="color"
                value={color} onChange={this.change} />
            </div>
            <div>
              <label htmlFor="price-input">Price:</label>
              <input type="number" id="price-input" name="price"
                value={price} onChange={this.change} />
            </div>
            <button type="button" onClick={this.saveCar}>Save</button>
            <button type="button" onClick={this.props.onCancelCar}>Cancel</button>
          </form>
        </td>
      </tr>
    ); 
  }

}