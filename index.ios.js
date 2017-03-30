/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import MapView from 'react-native-maps';

const region = {
  latitude: 10.8231,
  longitude: 106.6297,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}


export default class PhotoMap extends Component {

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('position', position);
        var initialPosition = JSON.stringify(position);
        this.setState({ initialPosition });
      },
      (error) => alert(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      this.setState({ lastPosition });
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <MapView
          region={region}
          style={{
            flex: 1,
          }}
        >
          <MapView.Marker
            coordinate=unspecified
            title={'Current position'}
          />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('PhotoMap', () => PhotoMap);
