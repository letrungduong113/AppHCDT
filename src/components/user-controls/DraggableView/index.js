import React, {Component} from 'react'
import {View, Animated, PanResponder, Dimensions} from 'react-native'
const win = Dimensions.get('window');

export default class DraggableView extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY(), // inits to zero
    };
    this.state.panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, {
        //dx: this.state.pan.x, // x,y are Animated.Value
        dy: this.state.pan.y,
    }]),
    // onPanResponderMove: (evt, gestureState) => {
    //     console.log("gesture move", evt);
    //     Animated.event([null, {
    //         //dx: this.state.pan.x, // x,y are Animated.Value
    //         dy: this.state.pan.y,
    //     }]);
    //     // The most recent move distance is gestureState.move{X,Y}
    //     // The accumulated gesture distance since becoming responder is
    //     // gestureState.d{x,y}
    //   },
    //this.setState({viewHeight: this.state.pan.y + 100})
    onPanResponderRelease: (evt, gesture) => {
        console.log(gesture.moveX,"----" ,gesture.moveY);
        // /console.log(gesture);
    //     yVal = 0;
    //     if (gesture.moveY > win.height * 1/2) {
    //         yVal = 0;
    //     }
    //     else if (gesture.moveY < win.height * 1/2) {
    //         yVal = -400;
    //     }
            
    //   Animated.spring(
    //     this.state.pan,         // Auto-multiplexed
    //     {toValue: {x: 0, y: yVal}} // Back to zero
    //   ).start();
        Animated.spring(
            this.state.pan,         // Auto-multiplexed
            {toValue: {x: 0, y: 0},} // Back to zero
          ).start(()=> {
            
          });

        if (gesture.moveY > win.height * 1/2) {
            if (this.props.onDroppedDown) {
                this.props.onDroppedDown();
            }    
        }
        else if (gesture.moveY < win.height * 1/2)
        if (this.props.onDroppedUp) {
            this.props.onDroppedUp();
        }
    },
   });
  }
  render() {
    return (
      <Animated.View {...this.props}
        {...this.state.panResponder.panHandlers}
        style={this.state.pan.getLayout()}>
        <View style={{height: this.props.height}}>
            {this.props.children}
        </View>
      </Animated.View>
    );
  }
 }