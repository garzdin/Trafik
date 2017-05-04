/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import App from './components/app';

export default class Trafik extends Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('Trafik', () => Trafik);
