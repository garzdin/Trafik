import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import Initial from './initial';

StatusBar.setBarStyle('light-content');

export default class App extends Component {
  render() {
    return (
      <Initial />
    )
  }
};
