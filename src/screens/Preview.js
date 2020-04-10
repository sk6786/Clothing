import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Alert, ActivityIndicator, View } from 'react-native';
import { Button, Block, Text, Input, theme, Card } from 'galio-framework';
import HeaderButtons from '../components/HeaderButtons';
import materialTheme from "../constants/Theme";
import Environment from '../../config/environment';
import firebase from '../../config/firebase'
import allColors from '../helper/AllColors.js'
const { width } = Dimensions.get('screen');
var convert = require('color-convert');

export default class Preview extends React.Component {
  state = {
    imageURI: "",
    navigation: null,
    data: [],
    loading: false,
  }
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
  }
  handler(stateName, stateVal) {
    this.setState({
      [stateName]: stateVal
    });
  }

  startProcessing = async () => {
    if (this.state.loading) {
      return;
    }

    // show loading
    this.setState({ loading: true });
    this.setState({ data: [] });
    let uploadUrl = "";
    try {
      uploadUrl = await uploadImageAsync(this.state.imageURI);
    } catch (e) {
      console.log(e);
      alert('Image upload failed');
      this.setState({ loading: false });
    }

    try {
      let image = uploadUrl;
      let body = JSON.stringify({
        requests: [
          {
            image: {
              source: {
                imageUri: image
              }
            },
            features: [
              { type: "IMAGE_PROPERTIES", maxResults: 5 }
            ]
          }
        ]
      });
      let response = await fetch(
        'https://vision.googleapis.com/v1/images:annotate?key=' +
        Environment['GOOGLE_CLOUD_VISION_API_KEY'],
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: body
        }
      );
      let responseJson = await response.json();
      let color = responseJson.responses[0].imagePropertiesAnnotation.dominantColors.colors;
      this.addColorPercent(color)
      this.addColorName(color)
      let sortedColors = color.sort((a, b) => a.percent < b.percent)
      this.setState({
        data: sortedColors,
        loading: false
      });
    } catch (error) {
      console.log(error);
      this.setState({ loading: false });
    }
  }

  addColorPercent(colors) {
    var scoresSum = colors.reduce(function (sum, color) {
      return sum + color.pixelFraction;
    }, 0) / 100;

    return colors.map(function (color) {
      color.percent = color.pixelFraction / scoresSum;
      return color;
    });
  }

  addColorName(colors) {
    return colors.map(function (color) {
      var colorCombined = convert.rgb.keyword(color.color.red, color.color.green, color.color.blue)
      color.colorName = allColors[colorCombined];
      return color
    });
  }

  componentDidMount() {
    let { navigation, route } = this.props;
    this.setState({ imageURI: route.params.img });
    this.setState({ navigation: navigation })
  }

  renderColor(colorInfo) {

    return (
      <View>
        <View style={{ borderColor: "black", borderWidth: 2, backgroundColor: "rgb(" + colorInfo.color.red + "," + colorInfo.color.green + "," + colorInfo.color.blue + ")", width: 60, height: 60, borderRadius: 60 / 2, justifyContent: 'center', alignItems: 'center', margin: 5 }} >
          <Text style={{ textAlign: 'center', color: "#F5F5F5" }}>{"" + parseInt(colorInfo.percent) + "%"}</Text>
        </View>
        <Text style={{ textAlign: 'center', paddingTop: 10, color: "black", width: 60, height: 100, marginHorizontal: 5 }}>{colorInfo.colorName}</Text>
      </View>
    );
  }


  renderItems = () => {

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}>
        <HeaderButtons handler={this.handler} />
        <Block flex>
          <Card
            flex
            style={styles.card}
            imageBlockStyle={{ padding: theme.SIZES.BASE / 2 }}
            image={this.state.imageURI}
            imageStyle={styles.img}
          />
          <Button
            shadowless
            style={styles.button}
            color={materialTheme.COLORS.BUTTON_COLOR}
            onPress={this.startProcessing}>
            PROCESS
          </Button>


          {/*
            Check the status of the 'loading' variable. If true, then display
            the loading spinner. Otherwise, display the results.
          */}
          {this.state.loading ? <ActivityIndicator size="large" color="#0000ff" /> : <View style={styles.viewContainer} >{this.state.data.map(colorInfo => this.renderColor(colorInfo))}</View>}



        </Block>

      </ScrollView>
    )
  };

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderItems()}
      </Block>
    );
  }
}

async function uploadImageAsync(uri) {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const ref = firebase.storage().ref().child(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
  const snapshot = await ref.put(blob);

  blob.close();

  return await snapshot.ref.getDownloadURL();
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  img: {
    height: "100%"
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
    zIndex: 2,
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.50,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '300'
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  products: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
  },
  card: {
    backgroundColor: "white",
    height: 400,
  },
  button: {
    alignSelf: "center",
    width: 380,
    marginTop: 10,
    marginBottom: 30
  },
  viewContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
