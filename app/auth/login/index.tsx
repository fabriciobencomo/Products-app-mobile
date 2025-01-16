import { View, Text, KeyboardAvoidingView, useWindowDimensions, TextInput,ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ThemedText } from '@/presentation/theme/components/ThemedText'
import ThemeTextInput from '@/presentation/theme/components/ThemeTextInput'
import ThemedButton from '@/presentation/theme/components/ThemedButton'
import ThemedLink from '@/presentation/theme/components/ThemedLink'
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor'
import { useAuthStore } from '@/presentation/auth/store/useAuthStore'
import { router } from 'expo-router'


const LoginScreen = () => {
  const {height} = useWindowDimensions()
  const backgroundColor = useThemeColor({}, 'background')

  const {login} = useAuthStore()

  const [isPosting, setIsPosting] = useState(false)

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const onLogin = async() => {
    if(form.email.length === 0 || form.password.length === 0) {
      return
    }

    const {email, password} = form

    setIsPosting(true)
    const wasSuccessful = await login(email, password)
    setIsPosting(false)
    if(wasSuccessful){
      router.replace('/')
      return
    }


    Alert.alert('Error', 'No se pudo ingresar, por favor verifique sus credenciales')
  }

  return (
    <KeyboardAvoidingView behavior='padding' style={{flex:1}}>
      <ScrollView style={{paddingHorizontal: 40, backgroundColor}}>
        <View style={{paddingTop: height * 0.35}}>
          <ThemedText type='title'>Ingresar</ThemedText>
          <ThemedText style={{color:'grey'}}>Por Favor Ingrese para comenzar</ThemedText>
        </View>

        {/* email and password */}
        <View style={{marginTop: 20}}>
          <ThemeTextInput placeholder='correo@correo.com' keyboardType='email-address' autoCapitalize='none' value={form.email} 
            icon='mail-outline' onChangeText={(value) => setForm({...form, email:value})}
          />
          <ThemeTextInput placeholder='password' secureTextEntry autoCapitalize='none' value={form.password}
            icon='lock-closed-outline'  onChangeText={(value) => setForm({...form, password:value})}
          />
        </View>

        {/* SPACER */}
        <View style={{marginTop:10}} />

        {/* Buttons       */}
        <ThemedButton icon='arrow-forward-outline' onPress={onLogin} disabled={isPosting}>Ingesar</ThemedButton>

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