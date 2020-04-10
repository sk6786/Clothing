import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { takePicture, selectPicture } from "../helper/PhotoCaptureUpload";

class HomeItem extends React.Component {

  processClick(title, url, product, navigation) {
    switch (title) {
      case "Capture":
        return takePicture();
      case "Upload":
        return selectPicture();
    }
  }

  render() {
    const { navigation, product, horizontal, full, style, priceColor, imageStyle } = this.props;
    const imageStyles = [styles.image, full ? styles.fullImage : styles.horizontalImage, imageStyle];
    let url = "";
    switch (product.title) {
      case "Capture":
        url = "Preview";
        break;
      case "Upload":
        url = "Preview";
        break;
    }

    return (
      <Block row={horizontal} card flex style={[styles.product, styles.shadow, style]}>
        <TouchableWithoutFeedback onPress={
          () => this.processClick(product.title, url, product, navigation).then((uri) => uri !== "" ? navigation.navigate(url, { product: product, img: uri }) : null)
          //open the camera roll or upload
        }>
          <Block flex style={[styles.imageContainer, styles.shadow]}>
            <Image source={product.image} style={imageStyles} />
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Block flex space="between" style={styles.productDescription}>
            <Text size={14} style={styles.productTitle}>{product.title}</Text>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
  }
}

export default withNavigation(HomeItem);

const styles = StyleSheet.create({
  product: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 30,
    paddingTop: 10
  },
  productTitle: {
    textAlign: 'center',
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 20,
    paddingBottom: 6,
  },
  productDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  imageContainer: {
    elevation: 1
  },
  image: {
    borderRadius: 3,
    marginHorizontal: theme.SIZES.BASE / 2,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  fullImage: {
    alignSelf: 'center',
    height: 150,
    width: 150,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});
