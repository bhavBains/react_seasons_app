import React from "react";
import ReactDOM from "react-dom";
import SeasonsDisplay from "./SeasonsDisplay";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { lat: null, error: "" };
  }

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({ lat: position.coords.latitude });
      },
      (err) => {
        this.setState({ error: err.message });
      }
    );
  }

  render() {
    if (this.state.error && !this.state.lat) {
      return <div>Error: {this.state.error}</div>;
    }

    if (!this.state.error && this.state.lat) {
      return (
        <div>
          <SeasonsDisplay lat={this.state.lat} />
        </div>
      );
    }

    if (!this.state.error && !this.state.lat) {
      return <div>Loading...</div>;
    }
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
