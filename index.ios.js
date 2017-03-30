

import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import Lightbox from 'react-native-lightbox';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput
} from 'react-native';
import MapView from 'react-native-maps';

import Map from './apps/map';

export default class PhotoMap extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      keyword : ''
    }

  }
  render() {

    return (
      <View style={{flex :1 }} >
        <TextInput style={{height : 50 }} />
        <Map />
      </View>


    );
  }
}



AppRegistry.registerComponent('PhotoMap', () => PhotoMap);
