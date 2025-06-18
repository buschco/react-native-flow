import React, {useRef} from 'react';
import {
  NativeModules,
  AppRegistry,
  Animated,
  View,
  StyleSheet,
  PanResponder,
  ScrollView,
} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen() {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,

      onPanResponderMove: (a, d) => {
        pan.setValue({x: d.dx, y: d.dy});
      },
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
}

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

AppRegistry.registerComponent('Financeguru', () => App);
