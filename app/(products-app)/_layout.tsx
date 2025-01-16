import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import {  useAuthStore } from '@/presentation/auth/store/useAuthStore'
import { Redirect, Stack } from 'expo-router'
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor'
import LogoutButton from '@/presentation/auth/components/LogoutButton'

const CheckAuthenticationLayout = () => {

  const backgroundColor = useThemeColor({}, 'background')
  const {status, checkStatus} = useAuthStore()

  useEffect(() => {
    checkStatus()
  }, [])
  

  if(status === 'checking'){
    return <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 5
    }}>

      <ActivityIndicator></ActivityIndicator>
    </View>
  }

  if(status == 'unaunthenticated'){
    return <Redirect href='/auth/login'/>
  }

  return (
    <Stack screenOptions={{headerShadowVisible: false, headerStyle: {backgroundColor}}} >
      <Stack.Screen name='(home)/index' options={{
        title:'Products',
        headerLeft: () => <LogoutButton/>
      }}/>
    </Stack>
  )
}

export default CheckAuthenticationLayout 

