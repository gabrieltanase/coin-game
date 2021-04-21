import { Component } from "react";

class SetupGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startingCoins: 0,
      requiredValue: 0,
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  handleSubmit() {
    this.props.onSubmit(this.state);
  }

  render() {
    const isBtnDisabled = !Number(this.state.startingCoins) || !Number(this.state.requiredValue);
    return (
      <div className="row justify-content-center">
        <div className="col-md-3">
          <h5 className="mb-3">Setup game values</h5>
          <div className="mb-3">
            <label htmlFor="startingCoins" className="form-label">Starting coins</label>
            <input type="number" name="startingCoins" className="form-control"
              id="startingCoins" min="0" step="1"
              value={this.state.startingCoins}
              onChange={this.handleInputChange} />
          </div>

          <div className="mb-3">
            <label htmlFor="requiredValue" className="form-label">Required value</label>
            <input type="number" name="requiredValue" className="form-control"
              id="requiredValue" min="0" step="1"
              value={this.state.requiredValue}
              onChange={this.handleInputChange} />
          </div>
          <button className="btn btn-success w-100"
            onClick={this.handleSubmit}
            disabled={isBtnDisabled}>
            Set values
          </button>
        </div>
      </div>
    )
  }
}

export default SetupGame;