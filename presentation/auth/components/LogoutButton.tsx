import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor'
import { useAuthStore } from '../store/useAuthStore'
import { Ionicons } from '@expo/vector-icons'

const LogoutButton = () => {

  const primartColor = useThemeColor({}, 'primary')
  const {logout} = useAuthStore();

  return (
    <TouchableOpacity onPress={logout} style={{paddingRight: 8}}>
      <Ionicons name='log-out-outline' size={24} color={primartColor}/>
    </TouchableOpacity>
  )
}

export default LogoutButton