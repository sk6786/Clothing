import React from 'react';
import { StyleSheet, Dimensions, ScrollView,Alert,ActivityIndicator} from 'react-native';
import { Button, Block, Text, Input, theme, Card  } from 'galio-framework';
import HeaderButtons from '../components/HeaderButtons';
import materialTheme from "../constants/Theme";
const { width } = Dimensions.get('screen');

export default class Preview extends React.Component {
  constructor(props){
    super(props);
    this.handler = this.handler.bind(this);
    this.state = {
      imageURI: "",
      navigation: null,
      data:"",
      loading:false,
    }
  }
  handler(stateName, stateVal) {
    this.setState({
      [stateName]: stateVal
    });
  }
  
  onProcessClick = () => {
 
  

    Alert.alert(
      'Process Image',
      'We will start processing the image',
      [
        {text: 'Ok', onPress: () =>{

            // show loading
        this.setState({loading: true});
        this.setState({data: ""});

          console.log('API call to anayisis image');
  

          //TODO: replace setTimeout method with Ajax call and reponse for call should be saved in data
          setTimeout(() => {
            // Remove loading when API call finish and show results
          this.setState({loading: false});
          this.setState({data: "Results\nMain color(s):Red,Black\nAccent color(s):While,Gray"});
 
          }, 3000);
          
        
        }  
      
        },
        {text: 'Cancel', onPress: () => console.log('Call cancel')},
      ],
      {cancelable: false},
    );

       
 
    

  }
  componentDidMount() {
    let {navigation, route} = this.props;
    this.setState({imageURI: route.params.img});
    this.setState({navigation: navigation})
  }

  renderItems = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}>
          <HeaderButtons handler={this.handler}/>
        <Block flex>
          <Card
              flex
              style={styles.card}
              imageBlockStyle={{ padding: theme.SIZES.BASE / 2 }}
              image= {this.state.imageURI}
              imageStyle={styles.img}
          />
          <Button
              shadowless
              style={styles.button}
              color={materialTheme.COLORS.BUTTON_COLOR}
              onPress={this.onProcessClick}>
              PROCESS
          </Button>
       
         
           {/*
            Check the status of the 'loading' variable. If true, then display
            the loading spinner. Otherwise, display the results.
          */}
           {this.state.loading ?<ActivityIndicator size="large" color="#0000ff" />:<Text>{this.state.data} </Text>} 
       
         
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

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  img:{
    height:"100%"
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
  card:{
    backgroundColor: "white",
    height:400,
  },
  button:{
    alignSelf:"center",
    width: 380,
    marginTop: 10,
    marginBottom:30
  }
});
