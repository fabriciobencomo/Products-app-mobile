import { View, Text, KeyboardAvoidingView, useWindowDimensions, TextInput } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler' 
import React, { useEffect } from 'react'
import { ThemedText } from '@/presentation/theme/components/ThemedText'
import ThemeTextInput from '@/presentation/theme/components/ThemeTextInput'
import ThemedButton from '@/presentation/theme/components/ThemedButton'
import ThemedLink from '@/presentation/theme/components/ThemedLink'


const LoginScreen = () => {
  const {height} = useWindowDimensions()
  useEffect(() => {
    console.log('estoy en login screen')
  }, [])
  
  return (
    <KeyboardAvoidingView behavior='padding' style={{flex:1}}>
      <ScrollView style={{paddingHorizontal: 40}}>
        <View style={{paddingTop: height * 0.35}}>
          <ThemedText type='title'>Ingresar</ThemedText>
          <ThemedText style={{color:'grey'}}>Por Favor Ingrese para comenzar</ThemedText>
        </View>

        {/* email and password */}
        <View style={{marginTop: 20}}>
          <ThemeTextInput placeholder='correo@correo.com' keyboardType='email-address' autoCapitalize='none' 
            icon='mail-outline'
          />
          <ThemeTextInput placeholder='password' secureTextEntry autoCapitalize='none' 
            icon='lock-closed-outline'
          />
        </View>

        {/* SPACER */}
        <View style={{marginTop:10}} />

        {/* Buttons       */}
        <ThemedButton icon='arrow-forward-outline'>Ingesar</ThemedButton>

        {/* SPACER */}
        <View style={{marginTop:50}} />

        {/* Links */}
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <ThemedText>No Tienes Cuenta?</ThemedText>
          <ThemedLink href="/auth/register" style={{marginHorizontal: 5}}>Crear Cuenta</ThemedLink>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen