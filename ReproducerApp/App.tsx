import React, {useRef} from 'react';
import {
  Animated,
  View,
  StyleSheet,
  PanResponder,
  ScrollView,
} from 'react-native';

const App = () => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        pan.extractOffset();
      },
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderTerminationRequest: () => true,
      onPanResponderGrant: () => {},
      onPanResponderTerminate: () => {},
    }),
  ).current;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.height300} />
      <Animated.View
        style={{
          transform: [{translateX: pan.x}, {translateY: pan.y}],
        }}
        {...panResponder.panHandlers}>
        <View style={styles.box} />
      </Animated.View>
      <View style={styles.height300} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  height300: {height: 500, backgroundColor: 'red'},
  container: {
    flexGrow: 1,
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
});

export default App;
