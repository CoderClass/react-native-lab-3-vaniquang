

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


export default class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      initialPosition: {
        longitude: 0,
        latitude: 0,
      },
      sourceImage: '',
      positionArray: []
    }
  }
  handleClickImage() {
    ImagePicker.showImagePicker({
      storageOptions: {
        skipBackup: true, path: 'images'
      }
    }, (response) => {  
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };    // You can also display the image using data:    // let source = { uri: 'data:image/jpeg;base64,' + response.data };      this  .setState({
        this.setState({
          sourceImage: source
        });
      }

    })
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({ initialPosition: position.coords });
        let pos = this.state.positionArray; 
        pos.push(position.coords);
        this.setState( { positionArray : pos});
       
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
    console.log(this.state.initialPosition);
    return (

      <MapView
        region={this.state.initialPosition}
        style={{
          flex: 1,
        }}
        onPress={
          (e) => {
            const { coordinate } = e.nativeEvent;
            this.setState({ initialPosition: coordinate });
            this.state.positionArray.push(coordinate);
          }
        }
        onLongPress={(e) => {
          this.handleClickImage();

        }}
      >
        
        {
          this.state.positionArray.map(marker => (
            <MapView.Marker
              coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
              image = { require ('./flag.png')}
              title={'Current position'}

            >
              <MapView.Callout
                style={{
                  alignItems: 'center', justifyContent: 'center',
                }}
              >

                <Lightbox navigator={this.props.navigator}
                  renderContent={() => {
                    return (
                      <Image source={this.state.sourceImage}
                        style={{
                          flex: 1
                        }}
                      />
                    )
                  }}
                >
                  <Image source={this.state.sourceImage}
                    style={{
                      width: 60, height: 60,
                      margin: 4,
                    }}
                  />
                </Lightbox>



                <Text
                  style={{
                    fontSize: 12,
                  }}
                >
                  Marker
        </Text>
              </MapView.Callout>
            </MapView.Marker>

          ))
        }

      </MapView>

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
