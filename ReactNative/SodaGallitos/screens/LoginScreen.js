import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { theme } from '../core/theme'
import { userValidator } from '../helpers/userValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { login } from "../api";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const onLoginPressed = async () => {
    const emailError = userValidator(username.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setUsername({ ...username, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    } 
    const data={
      username: username.value,
      password: password.value      
    }
    try{
      const result = await login(data)      
      if (result[0].id == -1){
        setUsername({ ...username, error: "Usuario incorrecto" })
        setPassword({ ...password, error: "Contraseña incorrecta" })
        return
      }
      await AsyncStorage.setItem('@id',result[0].id.toString())
    }
    catch (error) {
      console.log(error);
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'HomeScreen' }],
    })
  }

  return (
      <View style={styles.container}>
      <Logo />
      <Header>Bienvenido</Header>
      <TextInput
        label="Nombre de usuario"
        returnKeyType="next"
        value={username.value}
        onChangeText={(text) => setUsername({ value: text, error: '' })}
        error={!!username.error}
        errorText={username.error}
        autoCapitalize="none"
      />
      <TextInput
        label="Contraseña"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button mode="contained" onPress={onLoginPressed}>
        Iniciar Sesion
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
    backgroundColor: theme.colors.primary,
  },
})
