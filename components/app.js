import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import Initial from './initial';

StatusBar.setBarStyle('light-content');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({ location: position });
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.position = navigator.geolocation.watchPosition((position) => {
      this.setState({ location: position });
    }
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.position);
  }

  render() {
    return (
      <Initial location={this.state.location} />
    )
  }
};
