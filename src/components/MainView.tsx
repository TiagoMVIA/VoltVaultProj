import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';

const MainView = ({ children, title }: any) => {
  return (
    <View style={styles.background}>
      <View style={{alignItems: 'center'}}>
        <Image source={require('../assets/images/VVLogo.png')} style={styles.logo} />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        {children}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center'
  },
  background: {
    backgroundColor: '#75b05b',
    paddingTop: 80
  },
  container: {
    height: '100%',
    backgroundColor: '#fafafa',
    padding: 20,
    paddingTop: 30,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    elevation: 5
  },
  logo: {
    height: 180,
    width: 180,
    borderRadius: 50,
    position: 'absolute',
    top: -128,
    elevation: 1,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  }
})
export default MainView