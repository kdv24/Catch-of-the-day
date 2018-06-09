import React from "react";
import { getFunName } from "../helpers";

export default class StorePicker extends React.Component {
  myInput = React.createRef();

  goToStore = event => {
    // stops form from submitting
    event.preventDefault();
    // gets text from input type
    const storeName = this.myInput.current.value;
		// changes page to /store/store-they-input
		this.props.history.push(`/store/${storeName}`);
  };

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter a store</h2>
        <input
          type="text"
          ref={this.myInput}
          required
          placeholder="Store Name"
          defaultValue={getFunName()}
        />
        <button type="submit">Visit Store -></button>
      </form>
    );
  }
}
