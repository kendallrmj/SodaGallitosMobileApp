import React from 'react'
import { StyleSheet, View } from 'react-native'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import { theme } from '../core/theme'

export default function StartScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Logo />
      <Header>Soda Gallitos</Header>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Bienvenido
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 395,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary
  },
})
