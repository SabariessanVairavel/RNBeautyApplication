import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
  } from 'react-native';

class BeautyTemplate extends Component {
    icons = [];

    constructor(props) {
      super(props);
      this.icons = [];
    }
  
    componentDidMount() {
      this._listener = this.props.scrollValue.addListener(this.setAnimationValue.bind(this));
    }
  
    setAnimationValue({ value, }) {
      this.icons.forEach((icon, i) => {
        const progress = (value - i >= 0 && value - i <= 1) ? value - i : 1;
        icon.setNativeProps({
          style: {
            color: this.iconColor(progress),
          },
        });
      });
    }
  
    //color between rgb(59,89,152) and rgb(204,204,204)
    iconColor(progress) {
      const red = 59 + (204 - 59) * progress;
      const green = 89 + (204 - 89) * progress;
      const blue = 152 + (204 - 152) * progress;
      return `rgb(${red}, ${green}, ${blue})`;
    }
  
    render() {
      return <View style={[styles.tabs, this.props.style, ]}>
        {this.props.tabs.map((tab, i) => {
          return <TouchableOpacity key={tab+i} onPress={() => this.props.goToPage(i)} style={styles.tab}>
            <Image
                style={styles.image}
                source={{
                uri: 'https://reactnative.dev/img/tiny_logo.png',
                }}
            />
          </TouchableOpacity>;
        })}
      </View>;
    }
  }
  
  const styles = StyleSheet.create({
    tab: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 10,
    },
    tabs: {
      height: 45,
      flexDirection: 'row',
      paddingTop: 5,
      borderWidth: 1,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderBottomColor: 'rgba(0,0,0,0.05)',
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
      },
  });
  
export default BeautyTemplate;