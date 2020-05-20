import React, {Component} from 'react'
import {View, Animated, PanResponder, Dimensions} from 'react-native'
const win = Dimensions.get('window');

export default class DraggableControl extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY(), // inits to zero
      
    };
    this.dx = 0,
    this.dy = 0,
    this.state.panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    // onPanResponderGrant: Animated.event([null, {
    //   dx: this.state.pan.x, // x,y are Animated.Value
    //   dy: this.state.pan.y,
    // }], ),
    onPanResponderMove: Animated.event([null, {
        dx: this.state.pan.x, // x,y are Animated.Value
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
        console.log("----" ,gesture);
        this.dx += gesture.dx;
        this.dy += gesture.dy;
        //this.setState({dx: gesture.dx, dy: gesture.dy})
        // Animated.spring(
        //     this.state.pan,         // Auto-multiplexed
        //     {toValue: {x: gesture.dx, y: gesture.dy},} // Back to zero
        //   ).start(()=> {
            this.state.pan.x.setOffset(this.dx);
            this.state.pan.y.setOffset(this.dy);
            this.resetAnimation();
        //  });

        // if (gesture.moveY > win.height * 1/2) {
        //     if (this.props.onDroppedDown) {
        //         this.props.onDroppedDown();
        //     }    
        // }
        // else if (gesture.moveY < win.height * 1/2)
        // if (this.props.onDroppedUp) {
        //     this.props.onDroppedUp();
        // }
    },
   });
  }

  resetAnimation() {
    Animated.timing(
      this.state.pan,         // Auto-multiplexed
      {toValue: {x: 0, y: 0}, duration: 0, delay: 0} // Back to zero
    ).start();
  }
  render() {
    return (
      <Animated.View {...this.props}
        {...this.state.panResponder.panHandlers}
        style={this.state.pan.getLayout()}>
        <View>
            {this.props.children}
        </View>
      </Animated.View>
    );
  }
 }