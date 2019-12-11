import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {

  state = {
    seenIndexes: [],
    values: {},
    index: ''
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndex();
  }

  async fetchValues() {
    const values = await axios.get('/api/values/current');
    this.setState({ values: values.data });
  }

  async fetchIndex() {
    const seenIndexes = await axios.get('/api/values/all');
    this.setState({
      seenIndexes: seenIndexes.data
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post('/api/values', {
      index: this.state.index
    });
    this.setState({ index: ''});
  }

  renderSeenIndexes() {
    return this.state.seenIndexes.map(({ number}) => number).join(', ');
  }

  renderValues() {
    const entries = [];

    for (let key in this.state.value) {
      entries.push(
        <div key={key}>
          For index {key} I Calculated {this.state.values[key]}
        </div>
      );
    }

    return entries;
  }

  render() {
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Enter your index</label>
          <input
            values={this.state.index}
            onChange={event => this.setState({ index: event.target.value})}
          />
          <button>Submit</button>
        </form>

        <h3>indexes I have seen: </h3>
        {this.renderSeenIndexes()}

        <h3>Calculated values: </h3>
        {this.renderValues()}

      </div>
    )
  }
}

export default Fib;
