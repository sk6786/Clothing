import {Block, Button, Text, theme, Icon} from "galio-framework";
import React from 'react';
import {takePicture,selectPicture} from "../helper/PhotoCaptureUpload";

const { height, width } = Dimensions.get('window');

import { TouchableOpacity, StyleSheet, Platform, Dimensions, View } from 'react-native';

class HeaderButtons extends React.Component {
    render() {
        return (
            <Block center row style={styles.tabs}>
                <Button shadowless style={[styles.tab, styles.divider]} onPress={ ()=>selectPicture().then((uri)=>uri!==""?this.props.handler("imageURI", uri): null)}>
                    <Block row middle>
                        <Icon name="upload" family="feather" style={{ paddingRight: 8 }} />
                        <Text size={16} style={styles.tabTitle}>Upload</Text>
                    </Block>
                </Button>
                <Button shadowless style={styles.tab} onPress={ ()=>takePicture().then((uri)=>uri!==""?this.props.handler("imageURI", uri): null)}>
                    <Block row middle>
                        <Icon size={16} name="camera" family="feather" style={{paddingRight: 8}}/>
                        <Text size={16} style={styles.tabTitle}>Capture</Text>
                    </Block>
                </Button>
            </Block>
        );
    }
}
export default HeaderButtons;

const styles = StyleSheet.create({
    button: {
        padding: 12,
        position: 'relative',
    },
    title: {
        width: '100%',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: "center"

    },
    header: {
        backgroundColor: theme.COLORS.WHITE,
    },
    divider: {
        borderRightWidth: 0.3,
        borderRightColor: theme.COLORS.MUTED,
    },
    tabs: {
        marginBottom: 24,
        marginTop: 10,
        elevation: 4

    },
    tab: {
        backgroundColor: theme.COLORS.TRANSPARENT,
        width:  width* .50,
        borderRadius: 0,
        borderWidth: 0,
        height: 24,
        elevation: 0,
    },
    tabTitle: {
        lineHeight: 19,
        fontWeight: '300'
    },
});
