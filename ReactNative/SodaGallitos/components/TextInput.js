import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput as Input } from 'react-native-paper'
import { theme } from '../core/theme'

export default function TextInput({ errorText, description, ...props }) {
  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        selectionColor={theme.colors.text}
        underlineColor={theme.colors.secundary}
        theme={{ colors: { primary: theme.colors.secondary}}}
        mode="outlined"

        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginVertical: 12,
  },
  input: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.secundary
  },
  description: {
    fontSize: 13,
    color: theme.colors.text,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8,
  },
})
