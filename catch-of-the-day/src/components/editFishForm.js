import React from "react";

export default class EditFishForm extends React.Component {
  handleChange = event => {
    // update that fish
    // make a copy of current fish & only update changed targets
    const updateFish = {
        ...this.props.fish,
        [event.currentTarget.name]: event.currentTarget.value
    }
    this.props.updateFish(this.props.index, updateFish);
  };
  render() {
    return (
      <div className="fish-edit">
        <input
          type="name"
          name="name"
          onChange={this.handleChange}
          value={this.props.fish.name}
        />
        <input
          type="price"
          name="price"
          onChange={this.handleChange}
          value={this.props.fish.price}
        />
        <select
          type="status"
          name="status"
          onChange={this.handleChange}
          value={this.props.fish.status}
        >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <input
          type="desc"
          name="desc"
          onChange={this.handleChange}
          value={this.props.fish.desc}
        />
        <input
          type="image"
        //   alt={`${this.props.fish.name}`}
          name="image"
          onChange={this.handleChange}
          value={this.props.fish.image}
        />
        <button onClick={() => this.props.deleteFish(this.props.index)}>Remove Fish</button>
      </div>
    );
  }
}
