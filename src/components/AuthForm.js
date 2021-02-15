import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import {
  Button,
  Title,
  TextInput,
  HelperText,
  ActivityIndicator,
} from 'react-native-paper'

const AuthForm = ({ headerText, submitButtonText, errorMessage, onSubmit }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmitForm = () => {
    if (email.trim() && password.trim()) {
      setLoading(true)
      onSubmit({ email, password })
    }
  }

  useEffect(() => {
    console.log('useEffect of AuthForm runs')
    if (errorMessage) {
      setLoading(false)
    }
  }, [errorMessage])

  return (
    <>
      <Title style={styles.title}>{headerText}</Title>
      <TextInput
        style={styles.textInput}
        label="Email"
        value={email}
        keyboardType="email-address"
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
        theme={{ colors: { primary: 'black' } }}
      />
      <TextInput
        style={styles.textInput}
        secureTextEntry
        label="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
        theme={{ colors: { primary: 'black' } }}
      />
      <HelperText style={styles.error} type="error" visible={!!errorMessage}>
        {errorMessage}
      </HelperText>
      <Button
        style={styles.submitButton}
        labelStyle={styles.buttonLabel}
        mode="contained"
        uppercase={false}
        disabled={!email.trim().length || !password.trim().length}
        onPress={onSubmitForm}
      >
        {loading ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          submitButtonText
        )}
      </Button>
    </>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    marginTop: 10,
    marginBottom: 20,
  },
  textInput: {
    // marginBottom: 10
  },
  error: {
    marginTop: 5,
  },
  submitButton: {
    borderRadius: 5,
    marginVertical: 15,
    paddingVertical: 5,
  },
  buttonLabel: {
    fontSize: 18,
  },
})

export default AuthForm
