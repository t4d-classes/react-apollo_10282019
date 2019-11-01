import React from 'react';

export class ColorForm extends React.Component {

  // state = {
  //   color: '',
  // };
  
  constructor(props) {
    super(props);

    this.state = {
      color: '',
    };

    this.change = this.change.bind(this);
    this.submitColor = this.submitColor.bind(this);
  }

  change(e) {
    this.setState({
      color: e.target.value
    }, () => {
      console.log(this.state);
    });
  }

  submitColor() {
    this.props.onSubmitColor(this.state.color);

    this.setState({
      color: '',
    });
  }

  // change = (e) => {
  //   this.setState({
  //     color: e.target.value
  //   }, () => {
  //     console.log(this.state);
  //   });
  // }
  
  render() {

    return <form>
      <div>
        <label htmlFor="color-input">Color:</label>
        <input type="text" id="color-input"
          value={this.state.color} onChange={this.change}  />
      </div>
      <button type="button" onClick={this.submitColor}>{this.props.buttonText}</button>
    </form>;

  }

}


ColorForm.defaultProps = {
  buttonText: 'Submit Color',
};
