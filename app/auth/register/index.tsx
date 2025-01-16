import { View, Text, KeyboardAvoidingView, useWindowDimensions, TextInput, Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler' 
import React, { useEffect, useState } from 'react'
import { ThemedText } from '@/presentation/theme/components/ThemedText'
import ThemeTextInput from '@/presentation/theme/components/ThemeTextInput'
import ThemedButton from '@/presentation/theme/components/ThemedButton'
import ThemedLink from '@/presentation/theme/components/ThemedLink'
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor'
import { router } from 'expo-router'
import { useAuthStore } from '@/presentation/auth/store/useAuthStore'


const RegisterScreen = () => {
  const {height} = useWindowDimensions()

  const backgroundColor = useThemeColor({}, 'background')

  const {login, register} = useAuthStore()
  
    const [isPosting, setIsPosting] = useState(false)
  
    const [form, setForm] = useState({
      fullName: '',
      email: '',
      password: ''
    })
  
    const onRegister = async() => {
      if(form.email.length === 0 || form.password.length === 0 || form.fullName.length === 0 ){
        return
      }
  
      const {email, password, fullName} = form
  
      setIsPosting(true)
      const wasSuccessful = await register(email, password, fullName)
      if(wasSuccessful){
        const loginWasSuccessful = await login(email, password)
        setIsPosting(false)
        if(loginWasSuccessful){
          router.replace('/')
          return
        } else{
          Alert.alert('Error', 'No se pudo ingresar, por favor verifique sus credenciales')
        }
      }

      Alert.alert('Error', 'Error con el Registro Verificar los Datos')
    }
  
  return (
    <KeyboardAvoidingView behavior='padding' style={{flex:1}}>
      <ScrollView style={{paddingHorizontal: 40, backgroundColor}}>
        <View style={{paddingTop: height * 0.35}}>
          <ThemedText type='title'>Crear Cuenta</ThemedText>
          <ThemedText style={{color:'grey'}}>Por Favor Crea una Cuenta Para Continuar</ThemedText>
        </View>

        {/* email and password */}
        <View style={{marginTop: 20}}>
          <ThemeTextInput placeholder='Nombre Completo' autoCapitalize='none' value={form.fullName} onChangeText={(value) => setForm({...form, fullName:value})} 
            icon='person-outline'
          />
          <ThemeTextInput placeholder='correo@correo.com' keyboardType='email-address' autoCapitalize='none' value={form.email} onChangeText={(value) => setForm({...form, email:value})}  
            icon='mail-outline'
          />
          <ThemeTextInput placeholder='password' secureTextEntry autoCapitalize='none' value={form.password} onChangeText={(value) => setForm({...form, password:value})}
            icon='lock-closed-outline'
          />
        </View>

        {/* SPACER */}
        <View style={{marginTop:10}} />

        {/* Buttons       */}
        <ThemedButton icon='arrow-forward-outline' disabled={isPosting} onPress={onRegister}>Crear Cuenta</ThemedButton>

        {/* SPACER */}
        <View style={{marginTop:50}} />

        {/* Links */}
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <ThemedText>Ya tienes Cuenta?</ThemedText>
          <ThemedLink href="/auth/login" style={{marginHorizontal: 5}}>Ingresar</ThemedLink>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen